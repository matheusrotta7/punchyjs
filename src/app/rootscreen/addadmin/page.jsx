'use client'

import { AlertCircle, LoaderIcon } from "lucide-react";
import Dropdown from "../../components/Dropdown";
import { useState, useEffect } from "react";
import { getAllCompanies } from "../../services/CompanyService";
import { createNewAdmin } from "../../services/AdminService";
import SubmitButton from "@/app/components/SubmitButton";

import cryptoUtils from "../../utils/CryptoUtils.js"

export default function adminscreen() {

    const [companyList, setCompanyList] = useState();
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [newAdminName, setNewAdminName] = useState("")
    const [newAdminEmail, setNewAdminEmail] = useState("")
    const [newAdminPassword, setNewAdminPassword] = useState("")
    const [newAdminPasswordCheck, setNewAdminPasswordCheck] = useState("")
    const [alertPasswordsDontMatch, setAlertPasswordsDontMatch] = useState(false)

    useEffect(() => {
        fetchCompanies()
    }, [])

    function atLeastOneCompany(companyList) {
        console.log("inside at least one  company")
        return companyList != null && companyList != undefined && companyList.length > 0;
    }

    useEffect(() => {
        if (atLeastOneCompany(companyList)) {
            console.log("setting selected company")
            setSelectedCompany(companyList[0])
        }
    }, [companyList])

    const fetchCompanies = () => {
        getAllCompanies()
        .then(companys => {
        setCompanyList(companys);
        });
    }

    function callCreateNewAdmin() {
        var passwordHash = cryptoUtils.calculateHash(newAdminPassword)
        createNewAdmin(newAdminName, selectedCompany.id, newAdminEmail, passwordHash).then(adminResponse => {
            if (adminResponse != null) {
                alert("Admin " + adminResponse.name + " was successfully created!")
            }
        })
    }

    const handlePasswordCheckChange = (e) => {
        var passwordCheck = e.target.value
        setNewAdminPasswordCheck(passwordCheck)
        if (passwordCheck != newAdminPassword) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }

    }

    const handlePasswordChange = (e) => {
        var password = e.target.value
        setNewAdminPassword(password)
        if (password != newAdminPasswordCheck) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }
    }

    function disableButton() {
        const shouldDisableButton = alertPasswordsDontMatch || isEmptyString(newAdminName) || isEmptyString(newAdminEmail) || isEmptyString(newAdminPassword) || (selectedCompany === null || selectedCompany === undefined);
        console.log("shouldDisableButton")
        console.log(shouldDisableButton)
        return shouldDisableButton;
    }

    function isEmptyString (str) {
        return str === null || str === undefined || str.length === 0
    }

    return (
        <>
            <div className="p-4">

                <h1>Admin Screen</h1>
                <h2 className="mt-4">Enroll new admin: </h2>
                <div className="mt-2">
                    <span className="mr-3">Name:</span> <input type="text" className="text-zinc-800" onChange={(e) => setNewAdminName(e.target.value)}></input>
                </div>

                <div className="mt-2">
                    <span className="mr-3">E-mail:</span> <input type="email" className="text-zinc-800" onChange={(e) => setNewAdminEmail(e.target.value)}></input>
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
                
                <div className="mt-3">
                    <span className="mr-3">Company:</span> { atLeastOneCompany(companyList) && selectedCompany != null ? <Dropdown options={companyList} selectedOption={selectedCompany} setSelectedOption={setSelectedCompany} /> : <LoaderIcon/>}
                </div>
                <SubmitButton disabled={disableButton()} onClickFunction={callCreateNewAdmin} text="Submit" />

            </div>
        </>
    )
}


