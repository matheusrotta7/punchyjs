
export default function LittlePunchCircle(props) {

    var timeString = props.timestamp.split(" ")[1]
    var punchStatus = props.punchStatus

    function getStrokeColor() {
        if (punchStatus === null || punchStatus === 'NORMAL' || punchStatus === 'APPROVED') {
            return "stroke-sky-500"
        } else if (punchStatus === 'PENDING_ADDITION') {
            return "stroke-green-500"
        } else if (punchStatus === 'PENDING_DELETION') {
            return "stroke-red-500"
        }
    }

    return (
        <div title={timeString}>
            <svg className={"h-3 w-2 mr-1 flex-none fill-sky-100  stroke-2 " + getStrokeColor()}>
                <circle cx="4" cy="4" r="3" />
            </svg>
        </div>
    )
}