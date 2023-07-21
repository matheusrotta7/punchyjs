import { Calendar, Clock, Crown, User } from "lucide-react";
import Link from "next/link";

export default function adminLayout( {children}) {

    return (

        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-56 bg-zinc-950 border-r border-zinc-800 p-6">
                            
                        <Link href="/adminscreen/addemployee" className="flex p-2 hover:bg-zinc-800">
                            <User /> <span className="ml-2">Add Employees</span>
                        </Link>
                        <Link href="/adminscreen/addmanager" className="flex p-2 hover:bg-zinc-800">
                            <Crown /> <span className="ml-2">Add Managers</span>
                        </Link>
                    </aside>
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
                <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus Rotta Alves</footer>
            </div>

        </>
    )
}