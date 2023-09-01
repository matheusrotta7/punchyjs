'use client'

import { AlertCircle, LoaderIcon } from "lucide-react";
import Dropdown from "../../components/Dropdown";
import {  getAllManagersFromAdmin } from "../../services/ManagerService";
import { createNewEmployee } from "../../services/EmployeeService";
import SubmitButton from "@/app/components/SubmitButton";
import { useState, useEffect, useContext } from "react";
import { getDictionary } from "@/app/dictionaries";
import { AuthContext } from "@/app/contexts/AuthContext";


import cryptoUtils from "../../utils/CryptoUtils.js"

export default function adminscreen() {

    const [managerList, setManagerList] = useState();
    const [selectedManager, setSelectedManager] = useState(null)
    const [newEmployeeName, setNewEmployeeName] = useState("")
    const [newEmployeeEmail, setNewEmployeeEmail] = useState("")
    const [newEmployeePassword, setNewEmployeePassword] = useState("")
    const [newEmployeePasswordCheck, setNewEmployeePasswordCheck] = useState("")
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

    useEffect(() => {
        fetchManagers()
    }, [adminId])

    function atLeastOneManager(managerList) {
        return managerList != null && managerList != undefined && managerList.length > 0;
    }

    useEffect(() => {
        if (atLeastOneManager(managerList)) {
            setSelectedManager(managerList[0])
        }
    }, [managerList])

    const fetchManagers = () => {
        getAllManagersFromAdmin(adminId)
        .then(managers => {
        setManagerList(managers);
        });
    }

    function callCreateNewEmployee() {
        var passwordHash = cryptoUtils.calculateHash(newEmployeePassword)
        createNewEmployee(newEmployeeName, selectedManager.id, newEmployeeEmail, passwordHash).then(employeeResponse => {
            if (employeeResponse != null) {
                alert("Employee " + employeeResponse.name + " was successfully created!")
            }
        })
    }

    const handlePasswordCheckChange = (e) => {
        var passwordCheck = e.target.value
        setNewEmployeePasswordCheck(passwordCheck)
        if (passwordCheck != newEmployeePassword) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }

    }

    const handlePasswordChange = (e) => {
        var password = e.target.value
        setNewEmployeePassword(password)
        if (password != newEmployeePasswordCheck) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }
    }

    function disableButton() {
        const shouldDisableButton = alertPasswordsDontMatch || isEmptyString(newEmployeeName) || isEmptyString(newEmployeeEmail) || isEmptyString(newEmployeePassword) || (selectedManager === null || selectedManager === undefined);
        console.log("shouldDisableButton")
        console.log(shouldDisableButton)
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
                    <h2 className="mt-4">{dict.addemployeescreen.enrollnewemployee}: </h2>
                    <div className="mt-2">
                        <span className="mr-3">{dict.addemployeescreen.name}:</span> <input type="text" className="text-zinc-800" onChange={(e) => setNewEmployeeName(e.target.value)}></input>
                    </div>

                    <div className="mt-2">
                        <span className="mr-3">E-mail:</span> <input type="email" className="text-zinc-800" onChange={(e) => setNewEmployeeEmail(e.target.value)}></input>
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
                    
                    <div className="mt-3">
                        <span className="mr-3">{dict.addemployeescreen.manager}:</span> { atLeastOneManager(managerList) && selectedManager != null ? <Dropdown options={managerList} selectedOption={selectedManager} setSelectedOption={setSelectedManager} /> : <LoaderIcon/>}
                    </div>
                    <SubmitButton disabled={disableButton()} onClickFunction={callCreateNewEmployee} text={dict.submit} />

                </div> :
                <></>
            }
            
        </>
    )
}


