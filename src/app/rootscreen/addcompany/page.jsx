'use client'

import { createNewCompany } from "@/app/services/CompanyService"
import { useState } from "react"
import SubmitButton from "@/app/components/SubmitButton"
import { AlertCircle } from "lucide-react";

import cryptoUtils from "../../utils/CryptoUtils.js"

export default function addcompany() {


    const [newCompanyName, setNewCompanyName] = useState("")
    const [newCompanyEmail, setNewCompanyEmail] = useState("")
    const [newCompanyPassword, setNewCompanyPassword] = useState("")
    const [newCompanyPasswordCheck, setNewCompanyPasswordCheck] = useState("")
    const [alertPasswordsDontMatch, setAlertPasswordsDontMatch] = useState(false)


    function callCreateNewCompany() {
        createNewCompany(newCompanyName, newCompanyEmail, cryptoUtils.calculateHash(newCompanyPassword)).then(companyResponse => {
            if (companyResponse != null) {
                alert("Company " + companyResponse.name + " was successfully created!")
            }
        })
    }

    const handlePasswordCheckChange = (e) => {
        var passwordCheck = e.target.value
        setNewCompanyPasswordCheck(passwordCheck)
        if (passwordCheck != newCompanyPassword) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }

    }

    const handlePasswordChange = (e) => {
        var password = e.target.value
        setNewCompanyPassword(password)
        if (password != newCompanyPasswordCheck) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }
    }

    function disableButton() {
        const shouldDisableButton = alertPasswordsDontMatch || isEmptyString(newCompanyName) || isEmptyString(newCompanyEmail) || isEmptyString(newCompanyPassword);
        return shouldDisableButton;
    }

    function isEmptyString (str) {
        return str === null || str === undefined || str.length === 0
    }

    return (
        <>
            <div className="p-4">
                <h1>Admin Screen</h1>
                <h2 className="mt-4">Enroll new Company: </h2>
                <div className="mt-2">
                    <span className="mr-3">Name:</span> <input type="text" className="text-zinc-800" onChange={(e) => setNewCompanyName(e.target.value)}></input>
                </div>
                <div className="mt-2">
                    <span className="mr-3">E-mail:</span> <input type="email" className="text-zinc-800" onChange={(e) => setNewCompanyEmail(e.target.value)}></input>
                </div>

                <div className="mt-2">
                    <span className="mr-3">Password:</span> <input type="password" className="text-zinc-800" onChange={handlePasswordChange}></input>
                </div>

                <div className="mt-2 flex">
                    <span className="mr-3">Retype password:</span> <input type="password" className="text-zinc-800" onChange={handlePasswordCheckChange}></input> 
                    <div title="passwords don't match!">
                        {alertPasswordsDontMatch ? <AlertCircle strokeWidth={3} className="text-red-700/75 mx-2"/> : null}
                    </div>
                </div>

                <SubmitButton disableButton={disableButton()} onClickFunction={callCreateNewCompany} text="Submit"/>
            </div>
        </>
    )

}