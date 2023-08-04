'use client'

import Dropdown from "../../components/Dropdown"
import { useContext, useEffect, useState } from "react";
import { getAllEmployeesWithManager } from "../../services/EmployeeService";
import { LoaderIcon } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { getPunches } from "@/app/services/PunchService";

export default function myEmployeesScreen() {

    const { user } = useContext(AuthContext)

    const [employeeList, setEmployeeList] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [pendingPunches, setPendingPunches] = useState([])

    useEffect(() => {
        fetchEmployees()
    }, [user])

    const fetchEmployees = () => {
        if (user === null || user === undefined) {
            return;
        }
        getAllEmployeesWithManager(user.id)
            .then(employees => {
                setEmployeeList(employees);
            });
    }

    useEffect(() => {
        if (employeeList === null || employeeList === undefined) {
            return
        }
        var employeeId = employeeList.find(emp => (emp.name === selectedEmployee))?.id
        getPunches(employeeId, null, null, "ALL_PENDING").then(punches => {
            setPendingPunches(punches)
        })
    }, [selectedEmployee])


    const handleChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    function renderPendingPunches() {
        if (pendingPunches != null && pendingPunches != undefined) {
            console.log(pendingPunches)
            return pendingPunches.map(p => <li key={p.id}>{p.timestamp} {p.punchStatus}</li>)
        } else {
            return null
        }
    }


    return (
        <>
            <div className="p-6 w-9/12">
                <main>

                    <h1>Welcome, {user != null ? user.name : null}!</h1>

                    <h2 className="mt-6">My employees: </h2>

                    <div>
                        {employeeList != null && employeeList != undefined ? <Dropdown options={employeeList} selectedOption={selectedEmployee} handleChange={handleChange} /> : <LoaderIcon />}
                    </div>

                    <div className="mt-5">
                        <span>Punch alteration requests from {selectedEmployee} that need your attention:</span>
                    </div>

                    <div>
                        <ul>
                            {renderPendingPunches()}
                        </ul>
                    </div>

                </main>


            </div>

        </>
    )
}