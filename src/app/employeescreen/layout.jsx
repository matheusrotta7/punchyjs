import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function employeeLayout( {children}) {

    return (

        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1">
                    <aside className="w-52 bg-zinc-950 border-r border-zinc-800 p-6">
                            
                        <Link href="/employeescreen/addpunchscreen" className="flex p-2">
                            <Clock /> <span className="ml-2">Punch in</span>
                        </Link>
                        <Link href="/employeescreen/punchmirrorscreen" className="flex p-2">
                            <Calendar /> <span className="ml-2">Punch Mirror</span>
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