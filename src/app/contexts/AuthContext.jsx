import { createContext, useState } from "react";

import { login } from "../services/LoginService";
import { setCookie } from "nookies";

const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    const isAuthenticated = !!user;

    async function signIn(username, password) {

        const {token, user} = await login(username, password)

        setCookie(undefined, 'punchy.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })

        setUser(user)

        redirectToPage()
    }

    function redirectToPage() {
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
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )

}