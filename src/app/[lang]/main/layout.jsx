'use client'

import { Calendar, CircleDollarSign, Clock, Crown, LogIn, Monitor, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext } from "react";
import Image from 'next/image'
import PunchyLogo from "../components/PunchyLogo";


export default function mainlayout({children}) {

    const { locale } = useContext(AuthContext)
    console.log("locale")
    console.log(locale)

    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-56 bg-zinc-950 border-r border-zinc-800 p-6">
                        <PunchyLogo/>
                        <Link href={locale + "/main/loginscreen"} className="flex p-2 hover:bg-zinc-800">
                            <LogIn /> <span className="ml-2">Login</span>
                        </Link>
                        <Link href={locale + "/main/landingscreen"} className="flex p-2 hover:bg-zinc-800">
                            <Monitor /> <span className="ml-2">Landing Page</span>
                        </Link>
                        <Link href={locale + "/main/pricingscreen"} className="flex p-2 hover:bg-zinc-800">
                            <CircleDollarSign /> <span className="ml-2">Pricing</span>
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