'use client'

import { createContext, useEffect, useState } from "react";

import { login } from "../services/LoginService";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    const isAuthenticated = !!user;

    const router = useRouter()

    useEffect(() => {
        const { 'punchy.token': token } = parseCookies()

        if (token) {

        }
    }, [])

    async function signIn(username, password) {

        const loginResponse = await login(username, password)

        if (loginResponse === null || loginResponse === undefined) {
            alert("Wrong (username, password) pair")
            return
        }

        setCookie(undefined, 'punchy.token', loginResponse.token, {
            maxAge: 60 * 60 * 8, // 8 hour
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
            return
        }

        if (user.role === "Manager") {
            router.push("/managerscreen");
        } else if (user.role === "Employee") {
            router.push("/employeescreen/punchmirrorscreen");
        } else if (user.role === "Admin") {
            router.push("/adminscreen/addemployee");
        } else {
            console.log("Invalid role")
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
            {children}
        </AuthContext.Provider>
    )

}