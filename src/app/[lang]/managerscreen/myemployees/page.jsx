'use client'

import Dropdown from "../../components/Dropdown"
import { useContext, useEffect, useState } from "react";
import { getAllEmployeesWithManager } from "../../../services/EmployeeService";
import { Check, CheckCircle, CheckCircle2, LoaderIcon, X, XCircle } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { getPunches } from "@/app/services/PunchService";
import PunchAlterationRequest from "../../components/PunchAlterationRequest";
import { getDictionary } from "../../dictionaries";

export default function myEmployeesScreen({params: {lang}}) {

    const { user } = useContext(AuthContext)
    const dict = getDictionary(lang)

    const [employeeList, setEmployeeList] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [pendingPunches, setPendingPunches] = useState([])
    const [managerActionCounter, setManagerActionCounter] = useState(0)

    useEffect(() => {
        fetchEmployees()
    }, [user])

    useEffect(() => {
        if (atLeastOneEmployee(employeeList)) {
            setSelectedEmployee(employeeList[0])
        }
    }, [employeeList])

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
        var employeeId = selectedEmployee.id
        getPunches(employeeId, null, null, "ALL_PENDING").then(punches => {
            setPendingPunches(punches)
        })
    }, [selectedEmployee, managerActionCounter])


    function renderPendingPunches() {
        if (employeeList === null || employeeList === undefined) {
            return
        }

        var employeeId = selectedEmployee.id
        if (atLeastOnePendingPunch()) {
            console.log(pendingPunches)
            return pendingPunches.map(p => 
                <PunchAlterationRequest 
                    key={p.id} 
                    punch={p} 
                    employeeId={employeeId} 
                    managerActionCounter={managerActionCounter} 
                    setManagerActionCounter={setManagerActionCounter} 
                />
            )
        } else {
            return null
        }
    }

    function atLeastOneEmployee(employeeList) {
        return employeeList != null && employeeList != undefined && employeeList.length > 0
    }

    function atLeastOnePendingPunch() {
        return pendingPunches != null && pendingPunches != undefined && pendingPunches.length > 0
    }


    return (
        <>
            {dict != null && dict != undefined ? 
                <div className="p-6 w-9/12">
                <main>

                    <h1>{dict.welcome}, {user != null ? user.name : null}!</h1>

                    <h2 className="mt-6">{dict.myemployeesscreen.myemployees}: </h2>

                    <div>
                        { atLeastOneEmployee(employeeList) ? <Dropdown options={employeeList} selectedOption={selectedEmployee} setSelectedOption={setSelectedEmployee} /> : <LoaderIcon />}
                    </div>

                    <div className="mt-5 mb-3">
                        {atLeastOnePendingPunch() ?  
                            <div>
                                <span>{dict.myemployeesscreen.punchalterationrequests} {selectedEmployee.name} {dict.myemployeesscreen.yourattention} :</span>
                                <div>
                                    <ul className="list-disc p-3">
                                        {renderPendingPunches()}
                                    </ul>
                                </div>

                            </div>    
                            :
                            <span>{dict.myemployeesscreen.nopunchalterationrequests} {selectedEmployee.name}</span>

                        }
                    </div>


                </main>


            </div>
            :
            <></>
            }
            

        </>
    )
}