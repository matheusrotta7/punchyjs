'use client'

import { createContext, useEffect, useState } from "react";

import { login, recoverUserThroughToken } from "../services/LoginService";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [locale, setLocale] = useState("pt")

    const isAuthenticated = !!user;

    const router = useRouter()

    const pathname = usePathname()

    function setUserWithResponse(loginResponse) {
        setUser({
            role: loginResponse.role,
            id: loginResponse.id,
            name: loginResponse.name,
            isRoot: loginResponse.root
        })
    }

    useEffect(() => {
        const { 'punchy.token': token } = parseCookies()
        console.log("Inside use effect in AuthContext")

        if (token) {
            console.log("token: " + token)
            recoverUserThroughToken(token).then(loginResponse => {
                console.log("loginResponse")
                console.log(loginResponse)
                setUserWithResponse(loginResponse)
            })
        }

    }, [])

    function logOut() {
        console.log("Inside Logout")
        destroyCookie(undefined, 'punchy.token')
        setUser(null)
        redirectToPage()
    }

    async function signIn(username, password) {

        const loginResponse = await login(username, password)

        if (loginResponse === null || loginResponse === undefined) { //todo personalize alert for specific error code from backend
            return
        }

        setCookie(undefined, 'punchy.token', loginResponse.token, {
            maxAge: 60 * 60 * 8, // 8 hours, in backend it's 9 hours
        })

        setUserWithResponse(loginResponse)

        redirectToPage()

    }

    useEffect(() => {
        redirectToPage()
    }, [user])

    function redirectToPage() {

        if (user === null || user === undefined) {
            console.log("usePathname")
            console.log(pathname)
            var stringArr = pathname.split("/")
            var firstFolder = null
            if (stringArr.length > 2) {
                firstFolder = stringArr[2]
            }
            if (firstFolder === ("passwordresetscreen")) { //don't redirect person if they are trying to reset their password
                return;
            }

            router.push(locale + "/main/landingscreen");
            return;
        }

        if (user.role === "Manager") {
            router.push(locale + "/managerscreen/myemployees");
        } else if (user.role === "Employee") {
            router.push(locale + "/employeescreen/punchmirrorscreen");
        } else if (user.role === "Admin") {
            console.log("user")
            console.log(user)
            console.log("user.isRoot")
            console.log(user.isRoot)
            if (user.isRoot) {
                router.push(locale + "/rootscreen/addcompany")
            } else {
                router.push(locale + "/adminscreen/addemployee");
            }
        } else {
            console.log("Invalid role")
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, logOut, locale, setLocale }}>
            {children}
        </AuthContext.Provider>
    )

}