'use client'

import {  Crown, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import PunchyLogo from "../components/PunchyLogo";
import { useState, useEffect, useContext } from "react";
import { getDictionary } from "@/app/dictionaries";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function adminLayout( {children}) {

    const [dict, setDict] = useState()

    const { locale } = useContext(AuthContext)

    useEffect(() => {
        setDict(getDictionary(locale))  
    }, [])

    return (

        <>
            {dict != undefined && dict != null ? 
                <div className="h-screen flex flex-col">
                    <div className="flex flex-1">
                        <aside className="w-56 bg-zinc-950 border-r border-zinc-800 p-6">
                            <PunchyLogo />
                            <Link href="/adminscreen/addemployee" className="flex p-2 hover:bg-zinc-800">
                                <User /> <span className="ml-2">{dict.adminlayoutscreen.addemployees}</span>
                            </Link>
                            <Link href="/adminscreen/addmanager" className="flex p-2 hover:bg-zinc-800">
                                <Crown /> <span className="ml-2">{dict.adminlayoutscreen.addmanagers}</span>
                            </Link>
                            <LogoutButton />
                        </aside>
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                    <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus R.</footer>
                </div> :
                <></>
            }
            

        </>
    )
}