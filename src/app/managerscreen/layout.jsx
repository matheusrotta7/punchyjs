'use client'

import { Calendar, Clock, PersonStanding } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import PunchyLogo from "../components/PunchyLogo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { getDictionary } from "@/app/dictionaries";

export default function managerLayout({children}) {

    const [dict, setDict] = useState()

    const { locale } = useContext(AuthContext)

    useEffect(() => {
        setDict(getDictionary(locale))  
    }, [])

    return (
        <>
            {dict != null && dict != undefined ? 
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-52 bg-zinc-950 border-r border-zinc-800 p-6">
                        <PunchyLogo />
                        <Link href="/managerscreen/myemployees" className="flex p-2 hover:bg-zinc-800">
                            <PersonStanding /> <span className="ml-2">{dict.myemployeesscreen.myemployees}</span>
                        </Link>
                        <LogoutButton />
                    </aside>

                    {children}

                </div>
                <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus Rotta Alves</footer>
            </div> :
            <></>
            }
            
        </>
    )
}