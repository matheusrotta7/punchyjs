export default function PunchCircleTimestamped (props) {

    return (
        <div className="relative bg-zinc-800  py-3 shadow-xl ring-1 ring-gray-900/5   sm:rounded-full w-12 h-12 mx-2">{props.time}</div>
    )
}