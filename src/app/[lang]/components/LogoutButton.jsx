'use client'

import { LogOut } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext } from "react";

export default function LogoutButton(props) {

    const dict = props.dict

    const { logOut } = useContext(AuthContext)

    function callLogout() {
        console.log("Hello!")
        logOut()
    }

    return (
        <button className="flex p-2 hover:bg-zinc-800" onClick={callLogout}>
            <LogOut /> {dict != null ? <span className="ml-2">{dict.logout}</span> : <span className="ml-2">Logout</span>}                    
        </button>
    )

}