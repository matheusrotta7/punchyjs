import { Calendar, Clock, PersonStanding } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

export default function managerLayout({children}) {

    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-52 bg-zinc-950 border-r border-zinc-800 p-6">

                        <Link href="/managerscreen/myemployees" className="flex p-2 hover:bg-zinc-800">
                            <PersonStanding /> <span className="ml-2">My employees</span>
                        </Link>
                        <LogoutButton />
                    </aside>

                    {children}

                </div>
                <footer className="bg-zinc-800 px-6 border-t border-zinc-700">Punchy: created by Matheus Rotta Alves</footer>
            </div>
        </>
    )
}
