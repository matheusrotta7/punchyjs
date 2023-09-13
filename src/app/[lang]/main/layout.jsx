'use client'

import { Calendar, CircleDollarSign, Clock, Crown, LogIn, Monitor, User } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import PunchyLogo from "../components/PunchyLogo";
import { usePathname, useRouter } from "next/navigation";
import ChangeLocale from "../components/ChangeLocale";
import { getDictionary } from "../dictionaries";



export default function mainlayout({children, params: { lang }}) {

    const { locale, setLocale } = useContext(AuthContext)

    const [localeRef, setLocaleRef] = useState("")

    const router = useRouter()
    const pathname = usePathname()

    const dict = getDictionary(lang)

    useEffect(() => {
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
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-56 bg-zinc-950 border-r border-zinc-800 p-6">
                        <PunchyLogo/>
                        <ChangeLocale 
                            setLocale={setLocale}

                        />
                        <Link href={"/" + localeRef + "/main/loginscreen"} className="flex p-2 hover:bg-zinc-800">
                            <LogIn /> <span className="ml-2">Login</span>
                        </Link>
                        <Link href={"/" + localeRef + "/main/landingscreen"} className="flex p-2 hover:bg-zinc-800">
                            <Monitor /> <span className="ml-2">{dict.mainlayoutscreen.aboutpunchy}</span>
                        </Link>
                        <Link href={"/" + localeRef + "/main/pricingscreen"} className="flex p-2 hover:bg-zinc-800">
                            <CircleDollarSign /> <span className="ml-2">{dict.mainlayoutscreen.pricing}</span>
                        </Link>
                    </aside>
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
                <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus R.</footer>
            </div>
        </>
    )
}

