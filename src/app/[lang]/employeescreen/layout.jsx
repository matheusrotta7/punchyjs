'use client'

import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import PunchyLogo from "../components/PunchyLogo";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { getDictionary } from "../dictionaries";

import { useContext, useEffect, useState } from "react";
import ChangeLocale from "../components/ChangeLocale";

export default function employeeLayout( {children, params: {lang}}) {

    const { locale, setLocale } = useContext(AuthContext)


    const router = useRouter()
    const pathname = usePathname()

    const dict = getDictionary(lang)

    useEffect(() => {
        var newpathname = pathname.replace(/^\/\w+\//i, "/" + locale + "/")
        router.push(newpathname)
    }, [locale])

    return (

        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-52 bg-zinc-950 border-r border-zinc-800 p-6">
                        <PunchyLogo />
                        <ChangeLocale 
                            setLocale={setLocale}
                        />
                        <Link href={"/" + locale + "/employeescreen/addpunchscreen"} className="flex p-2 hover:bg-zinc-800">
                            <Clock /> <span className="ml-2">{dict.employeelayoutscreen.punchin}</span>
                        </Link>
                        <Link href={"/" + locale + "/employeescreen/punchmirrorscreen"} className="flex p-2 hover:bg-zinc-800">
                            <Calendar /> <span className="ml-2">{dict.employeelayoutscreen.punchmirror}</span>
                        </Link>
                        <LogoutButton 
                            dict={dict}
                        />

                    </aside>
                    
                    {children}
                    
                </div>
                <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus R.</footer>
            </div>

        </>
    )
}