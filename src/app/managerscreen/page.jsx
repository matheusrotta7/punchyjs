'use client'

import Dropdown from "../components/Dropdown"
import { useEffect, useState } from "react";
import { getAllEmployees } from "../services/EmployeeService";
import { LoaderIcon } from "lucide-react";

export default function managerscreen() {

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = () => {
        getAllEmployees()
        .then(employees => {
        setEmployeeList(employees);
        });
    }


    const [employeeList, setEmployeeList] = useState();
    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return(
        <>
            <div className="ml-3">
                <h1>Manager Screen</h1>

                <h2 className="mt-6">Add new employee: </h2>
             
                <div>
                    { employeeList != null  && employeeList != undefined ? <Dropdown options={employeeList} selectedOption={selectedOption} handleChange={handleChange} /> : <LoaderIcon/>}
                
                <p>Selected option: {selectedOption}</p>
                    
                </div>

            </div>
        </>
    )
}