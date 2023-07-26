import LittlePunchCircle from "./LittlePunchCircle";


export default function DateBox (props) {

    function renderPunchCircles() {

        var punchList = props.punchList
        
        var punchCircleArray = []

        if (notEmpty(punchList)) {
            var punchListForThisDay = extractThisDayPunches(punchList)
            if (notEmpty(punchListForThisDay)) {
                for (let i = 0; i < punchListForThisDay.length; i++) {
                    let curPunch = punchListForThisDay[i]
                    punchCircleArray.push(<LittlePunchCircle key={i} timestamp={curPunch.timestamp} />)
                }
            }
        }
        return punchCircleArray
    }

    return (
        <div className="relative bg-gray-300 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-12">
            <div className="absolute left-0 top-0 text-black/50 ml-1">{props.day}</div>
            <div className="absolute right-0 bottom-0 flex">
                {renderPunchCircles()}
            </div>
        </div>
    )

    function notEmpty(punchList) {
        return typeof punchList != "undefined" && punchList != null && punchList.length > 0;
    }

    function extractThisDayPunches(punchList) {

        var resultArray = []

        for (let i = 0; i < punchList.length; i++) {
            const curPunch = punchList[i];
            const curDayStr = curPunch.timestamp.split(" ")[0].split("-")[2];
            var curDay = parseInt(curDayStr)
            if (props.day === curDay) {
                resultArray.push(curPunch)
            }
            
        }
        
        return resultArray
    }
}