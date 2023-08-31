'use client'

import { LogOut } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Didact_Gothic } from "next/font/google";
import { getDictionary } from "../dictionaries";

export default function LogoutButton() {

    const { logOut, locale } = useContext(AuthContext)

    const [dict, setDict] = useState()

    useEffect(() => {
        setDict(getDictionary(locale))
    })

    function callLogout() {
        console.log("Hello!")
        logOut()
    }

    return (
        <>
        {
            dict != null && dict != undefined ? 
            <button className="flex p-2 hover:bg-zinc-800" onClick={callLogout}>
                <LogOut /> <span className="ml-2">{dict.logout}</span>                    
            </button>
            :
            <></>
        
        }
        </>
    )

}