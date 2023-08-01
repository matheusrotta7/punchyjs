'use client'

import { createContext, useEffect, useState } from "react";

import { login, recoverUserThroughToken } from "../services/LoginService";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    const isAuthenticated = !!user;

    const router = useRouter()

    useEffect(() => {
        const { 'punchy.token': token } = parseCookies()
        console.log("Inside use effect in AuthContext")

        if (token) {
            console.log("token: " + token)
            recoverUserThroughToken(token).then(loginResponse => {
                console.log("loginResponse: " + loginResponse)
                setUser({
                    role: loginResponse.role,
                    id: loginResponse.id,
                    name: loginResponse.name
                })
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

        if (loginResponse === null || loginResponse === undefined) {
            alert("Wrong (username, password) pair")
            return
        }

        setCookie(undefined, 'punchy.token', loginResponse.token, {
            maxAge: 60 * 60 * 8, // 8 hours, in backend it's 9 hours
        })

        setUser({
            role: loginResponse.role,
            id: loginResponse.id,
            name: loginResponse.name
        })

        redirectToPage()

    }

    useEffect(() => {
        redirectToPage()
    }, [user])

    function redirectToPage() {

        if (user === null || user === undefined) {
            router.push("/loginscreen");
            return;
        }

        if (user.role === "Manager") {
            router.push("/managerscreen/myemployees");
        } else if (user.role === "Employee") {
            router.push("/employeescreen/punchmirrorscreen");
        } else if (user.role === "Admin") {
            router.push("/adminscreen/addemployee");
        } else {
            console.log("Invalid role")
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}