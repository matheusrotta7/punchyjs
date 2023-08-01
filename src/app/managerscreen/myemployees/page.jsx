'use client'

import Dropdown from "../../components/Dropdown"
import { useContext, useEffect, useState } from "react";
import { getAllEmployees, getAllEmployeesWithManager } from "../../services/EmployeeService";
import { LoaderIcon, LogOut } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function myEmployeesScreen() {


    const { logOut, user } = useContext(AuthContext)

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = () => {
        getAllEmployeesWithManager(user.id)
        .then(employees => {
        setEmployeeList(employees);
        });
    }



    const [employeeList, setEmployeeList] = useState();
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function callLogout() {
        console.log("Hello!")
        logOut()
    }



    return(
        <>
            <div className="p-6 w-9/12">
                <main>

                    <h1>Welcome, {user.name}!</h1>

                    <h2 className="mt-6">My employees: </h2>
                
                    <div>
                        { employeeList != null  && employeeList != undefined ? <Dropdown options={employeeList} selectedOption={selectedOption} handleChange={handleChange} /> : <LoaderIcon/>}
                        <p>Selected option: {selectedOption}</p>
                        
                    </div>
                </main>


            </div>
            <aside className="float-right bg-zinc-950 flex-1 border-l border-zinc-800">
                <button className="flex p-6" onClick={callLogout}>
                    <LogOut /> <span className="ml-2">Logout</span>                    
                </button>
                
            </aside>
        </>
    )
}