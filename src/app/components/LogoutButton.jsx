'use client'

import { LogOut } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext } from "react";

export default function LogoutButton() {

    const { logOut } = useContext(AuthContext)

    function callLogout() {
        console.log("Hello!")
        logOut()
    }

    return (
        <button className="flex p-6" onClick={callLogout}>
            <LogOut /> <span className="ml-2">Logout</span>                    
        </button>
    )

}