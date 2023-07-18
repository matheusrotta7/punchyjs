'use client'

import { LoaderIcon } from "lucide-react";
import Dropdown from "../components/Dropdown";
import { useState, useEffect } from "react";
import { getAllManagers } from "../services/ManagerService";

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
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className="ml-3 mt-3">

                <h1>Admin Screen</h1>
                <h2 className="mt-3">Enroll new employee: </h2>
                <div className="mt-3"></div>
                <span className="mr-3">Name:</span> <input type="text" className="text-zinc-800"></input>
                <div className="mt-3">
                    <span className="mr-3">Manager:</span> { managerList != null  && managerList != undefined ? <Dropdown options={managerList} selectedOption={selectedOption} handleChange={handleChange} /> : <LoaderIcon/>}
                </div>
                

            </div>
        </>
    )
}