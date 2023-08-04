export default function PunchCircleTimestamped (props) {

    var punchStatus = props.punchStatus

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

    return (
        <div 
            className={"relative bg-zinc-800  py-3 shadow-xl ring-1 ring-gray-900/5   sm:rounded-full w-12 h-12 mx-2 border-2  " + getBorderColor() + " " + getIfBorderDashed()}
            title={getExplainingTitle()}
        >
            {props.time}
        </div>
    )
}