'use client'

import { Calendar, Clock, PersonStanding } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import PunchyLogo from "../components/PunchyLogo";
import { getDictionary } from "../dictionaries";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import ChangeLocale from "../components/ChangeLocale";

export default function managerLayout({children, params: {lang}}) {

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
                        <Link href={"/" + locale + "/managerscreen/myemployees"} className="flex p-2 hover:bg-zinc-800">
                            <PersonStanding /> <span className="ml-2">{dict.myemployeesscreen.myemployees}</span>
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
