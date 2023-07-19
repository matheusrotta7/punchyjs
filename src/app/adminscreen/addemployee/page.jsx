'use client'

import { LoaderIcon } from "lucide-react";
import Dropdown from "../../components/Dropdown";
import { useState, useEffect } from "react";
import { getAllManagers } from "../../services/ManagerService";
import { createNewEmployee } from "../../services/EmployeeService";
import SubmitButton from "@/app/components/SubmitButton";

export default function adminscreen() {

    useEffect(() => {
        fetchManagers()
    }, [])

    const fetchManagers = () => {
        getAllManagers()
        .then(managers => {
        setManagerList(managers);
        });
    }


    const [managerList, setManagerList] = useState();
    const [selectedManagerName, setSelectedManagerName] = useState("")
    const [selectedManagerObj, setSelectedManagerObj] = useState(null)
    const [selectedManager, setSelectedManager] = useState("")
    const [newEmployeeName, setNewEmployeeName] = useState("")


    function callCreateNewEmployee() {
        console.log("hello!")
        console.log("selectedManagerObj" + selectedManagerObj)
        createNewEmployee(newEmployeeName, selectedManagerObj.id)
    }

    

    const handleChange = (event) => {
        console.log("Inside handleChange()")
        console.log("event.target.value: " + event.target.value)
        setSelectedManagerObj(managerList.find((manager) => manager.name === event.target.value));
        console.log("selectedManagerObj inside handle change: " + selectedManagerObj)
        setSelectedManagerName(event.target.value);
        console.log("selected manager: " + selectedManagerName)
    };

    return (
        <>
            <div className="ml-3 mt-3">

                <h1>Admin Screen</h1>
                <h2 className="mt-3">Enroll new employee: </h2>
                <div className="mt-3"></div>
                <span className="mr-3">Name:</span> <input type="text" className="text-zinc-800" onChange={(e) => setNewEmployeeName(e.target.value)}></input>
                <div className="mt-3">
                    <span className="mr-3">Manager:</span> { managerList != null  && managerList != undefined ? <Dropdown options={managerList} selectedOption={selectedManagerName} handleChange={handleChange} /> : <LoaderIcon/>}
                </div>
                <SubmitButton onClickFunction={callCreateNewEmployee} text="Submit" />

            </div>
        </>
    )
}