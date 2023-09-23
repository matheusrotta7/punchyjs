import { CheckCircle, CheckCircle2, X, XCircle } from "lucide-react"
import { alterPunch, deletePunch } from "@/app/services/PunchService"

export default function PunchCircleTimestamped (props) {

    var punchStatus = props.punchStatus
    var p = props.punch

    function getBorderColor() {
        if (punchStatus === null || punchStatus === 'NORMAL' || punchStatus === 'APPROVED') {
            return "border-zinc-700"
        } else if (punchStatus === 'PENDING_ADDITION') {
            return "border-green-700"
        } else if (punchStatus === 'PENDING_DELETION') {
            return "border-red-700"
        }
    }

    function getExplainingTitle() {
        if (punchStatus === null || punchStatus === 'NORMAL') {
            return ""
        } else if (punchStatus === 'PENDING_ADDITION') {
            return "Pending addition approval from manager"
        } else if (punchStatus === 'PENDING_DELETION') {
            return "Pending deletion approval from manager"
        }
    }

    function getIfBorderDashed() {
        return punchStatus === null || punchStatus === 'NORMAL' || punchStatus === 'APPROVED' ? "" : "border-dashed"
    }

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
        <>
            <div className="flex flex-col">

                <div 
                    className={"relative bg-zinc-800  py-3 shadow-xl ring-1 ring-gray-900/5   sm:rounded-full w-12 h-12 mx-2 border-2  " + getBorderColor() + " " + getIfBorderDashed()}
                    title={getExplainingTitle()}
                >
                    {props.time}
                </div>
                {props.managerScreen && (punchStatus === "PENDING_ADDITION" || punchStatus === "PENDING_DELETION") ? 
                    <div className="flex flex-row text-center my-1">
                        <span className="text-zinc-950">..</span>
                        <CheckCircle2 onClick={approvePunchAlteration} className="text-green-700/75 hover:text-green-500/75"/> 
                        <XCircle onClick={denyPunchAlteration} className="text-red-700/75 hover:text-red-500/75"/>
                    </div>
                    :
                    <></>

                }
            </div>
        </>
        
    )
}