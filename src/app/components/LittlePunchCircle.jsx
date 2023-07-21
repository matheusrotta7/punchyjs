export default function LittlePunchCircle(props) {

    var timeString = props.timestamp.split(" ")[1]

    return (
        <div title={timeString}>
            <svg className="h-3 w-2 mr-1 flex-none fill-sky-100 stroke-sky-500 stroke-1">
                <circle cx="4" cy="4" r="3" />
            </svg>
        </div>
    )
}