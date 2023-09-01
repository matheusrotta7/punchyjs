'use client'

import { createNewManager } from "@/app/services/ManagerService"
import { useEffect, useState, useContext } from "react"
import SubmitButton from "@/app/components/SubmitButton"
import { AlertCircle } from "lucide-react";
import { getDictionary } from "@/app/dictionaries";
import { AuthContext } from "@/app/contexts/AuthContext";
import cryptoUtils from "../../utils/CryptoUtils.js"

export default function addmanager() {


    const [newManagerName, setNewManagerName] = useState("")
    const [newManagerEmail, setNewManagerEmail] = useState("")
    const [newManagerPassword, setNewManagerPassword] = useState("")
    const [newManagerPasswordCheck, setNewManagerPasswordCheck] = useState("")
    const [alertPasswordsDontMatch, setAlertPasswordsDontMatch] = useState(false)
    const [adminId, setAdminId] = useState("")
    const [dict, setDict] = useState()

    const { locale } = useContext(AuthContext)

    useEffect(() => {
        setDict(getDictionary(locale))  
    }, [])

    const { user } = useContext(AuthContext)

    function userIsDefined(user) {
        return user != null && user != undefined;
    }

    useEffect(() => {
        if (userIsDefined(user)) {
            setAdminId(user.id)
        }
    }, [user])

    function callCreateNewManager() {
        if (userIsDefined) {
            createNewManager(newManagerName, newManagerEmail, cryptoUtils.calculateHash(newManagerPassword), adminId).then(managerResponse => {
                if (managerResponse != null) {
                    alert("Manager " + managerResponse.name + " was successfully created!")
                }
            })
        }
    }

    const handlePasswordCheckChange = (e) => {
        var passwordCheck = e.target.value
        setNewManagerPasswordCheck(passwordCheck)
        if (passwordCheck != newManagerPassword) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }

    }

    const handlePasswordChange = (e) => {
        var password = e.target.value
        setNewManagerPassword(password)
        if (password != newManagerPasswordCheck) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }
    }

    function disableButton() {
        const shouldDisableButton = alertPasswordsDontMatch || isEmptyString(newManagerName) || isEmptyString(newManagerEmail) || isEmptyString(newManagerPassword);
        return shouldDisableButton;
    }

    function isEmptyString (str) {
        return str === null || str === undefined || str.length === 0
    }

    return (
        <>
            {dict != null && dict != undefined ? 
                <div className="p-4">
                <h1>{dict.hello}, {user?.name}!</h1>
                <h2 className="mt-4">{dict.addmanagerscreen.enrollnewmanager}: </h2>
                <div className="mt-2">
                    <span className="mr-3">{dict.addemployeescreen.name}:</span> <input type="text" className="text-zinc-800" onChange={(e) => setNewManagerName(e.target.value)}></input>
                </div>
                <div className="mt-2">
                    <span className="mr-3">E-mail:</span> <input type="email" className="text-zinc-800" onChange={(e) => setNewManagerEmail(e.target.value)}></input>
                </div>

                <div className="mt-2">
                    <span className="mr-3">{dict.addemployeescreen.password}:</span> <input type="password" className="text-zinc-800" onChange={handlePasswordChange}></input>
                </div>

                <div className="mt-2 flex">
                    <span className="mr-3">{dict.addemployeescreen.retypepassword}:</span> <input type="password" className="text-zinc-800" onChange={handlePasswordCheckChange}></input> 
                    <div title="passwords don't match!">
                        {alertPasswordsDontMatch ? <AlertCircle strokeWidth={3} className="text-red-700/75 mx-2"/> : null}
                    </div>
                </div>

                <SubmitButton disableButton={disableButton()} onClickFunction={callCreateNewManager} text={dict.submit}/>
            </div>:
            <></>
            }
            
        </>
    )

}

