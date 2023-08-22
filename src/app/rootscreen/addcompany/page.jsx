'use client'

import { createNewCompany } from "@/app/services/CompanyService"
import { useState } from "react"
import SubmitButton from "@/app/components/SubmitButton"

export default function addcompany() {


    const [newCompanyName, setNewCompanyName] = useState("")
    const [isNewCompanyPaying, setIsNewCompanyPaying] = useState(true)
    const [newCompanyMaxEmployees, setNewCompanyMaxEmployees] = useState(0)


    function callCreateNewCompany() {
        createNewCompany(newCompanyName, isNewCompanyPaying, newCompanyMaxEmployees).then(companyResponse => {
            if (companyResponse != null) {
                alert("Company " + companyResponse.name + " was successfully created!")
            }
        })
    }

    const handleIsPayingChange = (e) => {
        setIsNewCompanyPaying(!isNewCompanyPaying)
    }

    return (
        <>
            <div className="p-4">
                <h1>Root Screen</h1>
                <h2 className="mt-4">Enroll new Company: </h2>
                <div className="mt-2">
                    <span className="mr-3">Name:</span> <input type="text" className="text-zinc-800" onChange={(e) => setNewCompanyName(e.target.value)}></input>
                </div>
                <div className="mt-2">
                    <span className="mr-3">Is paying?</span> <input type="checkbox" checked={isNewCompanyPaying} className="text-zinc-800" onChange={handleIsPayingChange}></input>
                </div>

                <div className="mt-2">
                    <span className="mr-3">Max number of employees:</span> <input type="number" className="text-zinc-800" onChange={(e) => setNewCompanyMaxEmployees(e.target.value)}></input>
                </div>

                

                <SubmitButton onClickFunction={callCreateNewCompany} text="Submit"/>
            </div>
        </>
    )

}