'use client'

import SubmitButton from "@/app/components/SubmitButton"
import { createNewManager } from "@/app/services/ManagerService"
import { useState } from "react"

export default function addmanager() {


    const [managerName, setManagerName] = useState("")


    function callCreateNewManager() {
        console.log("hello")
        createNewManager(managerName)
    }

    return (
        <>
            <div className="ml-3">
                <h1>Admin Screen</h1>
                <h2 className="mt-4">Enroll new Manager: </h2>
                <div className="mt-2">
                    <span className="mr-3">Name:</span> <input type="text" className="text-zinc-800" onChange={(e) => setManagerName(e.target.value)}></input>
                </div>
                <SubmitButton onClickFunction={callCreateNewManager} text="Submit"/>
            </div>
        </>
    )

}