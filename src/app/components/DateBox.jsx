import LittlePunchCircle from "./LittlePunchCircle";


export default function DateBox (props) {

    function renderPunchCircles() {

        var punchList = props.punchList
        
        var punchCircleArray = []

        if (notEmpty(punchList)) {
            for (let i = 0; i < punchList.length; i++) {
                let curPunch = punchList[i]
                punchCircleArray.push(<LittlePunchCircle key={i} timestamp={curPunch.timestamp} />)
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

    return (
        <div className="relative bg-gray-300 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-12" onClick={onDateBoxClick}>
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