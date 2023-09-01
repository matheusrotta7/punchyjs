'use client'

import { Check, CheckCircle, CheckCircle2, LoaderIcon, X, XCircle } from "lucide-react";
import { alterPunch, deletePunch } from "../services/PunchService";


export default function PunchAlterationRequest(props) {

    var p = props.punch 
    const dict = props.dict

    function approvePunchAlteration() {
        console.log("approve!")
        //approve a punch alteration
        //if we are approving an addition, call alter punch and change punch status from PENDING_ADDITION to APPROVED
        //if we are approving a deletion, call a delete punch method
        props.setManagerActionCounter(props.managerActionCounter + 1) //this has the important side effect of triggering a refetch of pending punches
        if (p.punchStatus === "PENDING_ADDITION") {
            alterPunch(props.employeeId, p.id, "APPROVED").then(alert("punch addition was approved sucessfully!"))
        } else if (p.punchStatus === "PENDING_DELETION") {
            deletePunch(p.id).then(alert("punch deletion was approved and so the punch was deleted"))
        }
    }

    function denyPunchAlteration() {
        console.log("deny!")
        //deny a punch alteration
        //if we are denying an addition, we should delete the punch that was created
        //if we are denying a deletion, then we should change punch status from PENDING_DELETION to NORMAL 
        props.setManagerActionCounter(props.managerActionCounter + 1) //this has the important side effect of triggering a refetch of pending punches
        if (p.punchStatus === "PENDING_ADDITION") {
            deletePunch(p.id).then(alert("punch addition was denied and so the pending punch was deleted"))
        } else if (p.punchStatus === "PENDING_DELETION") {
            alterPunch(props.employeeId, p.id, "NORMAL").then(alert("punch deletion was denied so punch status reverted back to Normal"))
        }
    }

    return (
        <div key={p.id}>
            <div className="flex">
                <li>{p.punchStatus === "PENDING_ADDITION" ? dict.myemployeesscreen.additionrequestat : dict.myemployeesscreen.deletionrequestat} {p.timestamp}</li> 
                <div className="flex mx-4">
                    <CheckCircle2 onClick={approvePunchAlteration} strokeWidth={3} className="mx-1 text-green-700/75 hover:text-green-500/75" /> <XCircle onClick={denyPunchAlteration} className="mx-1 text-red-700/75 hover:text-red-500/75" strokeWidth={3} />
                </div>
            </div>
        </div>
    )

}