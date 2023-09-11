'use client'

import { Calendar, Clock, Crown, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import PunchyLogo from "../components/PunchyLogo";
import ChangeLocale from "../components/ChangeLocale";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { getDictionary } from "../dictionaries";

export default function adminLayout( {children, params: { lang }}) {

    const { locale, setLocale } = useContext(AuthContext)

    const [localeRef, setLocaleRef] = useState("")

    const router = useRouter()
    const pathname = usePathname()

    const dict = getDictionary(lang)

    useEffect(() => {
        console.log("locale soaifjowiefjowifj")
        console.log(locale)
        setLocaleRef(locale)
        console.log("pathname")
        console.log(pathname)
        var newpathname = pathname.replace(/^\/\w+\//i, "/" + locale + "/")
        console.log("newpathname")
        console.log(newpathname)
        router.push(newpathname)
    }, [locale])

    return (

        <>
            {dict != null && dict != undefined ?
                <div className="h-screen flex flex-col">
                    <div className="flex flex-1">
                        <aside className="w-56 bg-zinc-950 border-r border-zinc-800 p-6">
                            <PunchyLogo />
                            <ChangeLocale 
                                setLocale={setLocale}
                            />
                            <Link href={"/" + locale + "/adminscreen/addemployee"} className="flex p-2 hover:bg-zinc-800">
                                    <User /> <span className="ml-2">{dict.adminlayoutscreen.addemployees}</span>
                            </Link>
                            <Link href={"/" + locale + "/adminscreen/addmanager"} className="flex p-2 hover:bg-zinc-800">
                                <Crown /> <span className="ml-2">{dict.adminlayoutscreen.addmanagers}</span>
                            </Link>
                            <LogoutButton />
                        </aside>
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                    <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus Rotta Alves</footer>
                </div> :
                <></>
            }
            

        </>
    )
}