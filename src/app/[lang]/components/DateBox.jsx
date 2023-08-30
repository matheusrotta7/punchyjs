import LittlePunchCircle from "./LittlePunchCircle";


export default function DateBox (props) {

    function renderPunchCircles() {

        var punchList = props.punchList
        
        var punchCircleArray = []

        if (notEmpty(punchList)) {
            for (let i = 0; i < punchList.length; i++) {
                let curPunch = punchList[i]
                punchCircleArray.push(<LittlePunchCircle key={i} timestamp={curPunch.timestamp} punchStatus={curPunch.punchStatus} />)
            }
        }
        return punchCircleArray
    }

    function onDateBoxClick() {
        // console.log("Hello! You clicked on the datebox")
        // console.log(props)
        props.setSelectedDay(props.day)
        props.setSelectedDayPunchList(props.punchList)
    }

    function getBorderCssIfSelectedDay() {
        if (props.selectedDay === props.day) {
            // return "border-2  border-sky-500 bg-zinc-400"
            return "bg-zinc-300"
        } else {
            return "bg-zinc-500"
        }
    }

    return (
        <div className={"relative  px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-12 " + getBorderCssIfSelectedDay()} onClick={onDateBoxClick}>
            <div className="absolute left-0 top-0 text-black/50 ml-1">{props.day}</div>
            <div className="absolute right-0 bottom-0 flex">
                {renderPunchCircles()}
            </div>
        </div>
    )

    function notEmpty(punchList) {
        return typeof punchList != "undefined" && punchList != null && punchList.length > 0;
    }

    
}