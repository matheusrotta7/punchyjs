import LittlePunchCircle from "./LittlePunchCircle";


export default function DateBox (props) {

    function renderPunchCircles() {
        // console.log("punchList: " + props.punchList)
        // console.log("punchlist[0]", props.punchList[0])

        var punchList = props.punchList
        
        console.log("hello")
        console.log(punchList)
        // console.log(typeof punchList[0].timestamp)
        // console.log(punchList[0].timestamp)
        var punchCircleArray = []
        
        if (notEmpty(punchList)) {
            console.log("Not empty punch list")
            var punchListForThisDay = extractThisDayPunches(punchList)
            if (notEmpty(punchListForThisDay)) {
                console.log("Not empty punch list for this day")
                for (let i = 0; i < punchList.length; i++) {
                    punchCircleArray.push(<LittlePunchCircle/>)
                }
            }
        }
        return punchCircleArray
    }

    return (
        <div className="relative bg-gray-300 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="absolute left-0 top-0 text-black/50">{props.day}</div>
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
            console.log("mega split yo " + curDayStr)
            var curDay = parseInt(curDayStr)
            if (props.day === curDay) {
                resultArray.push(curPunch)
            }
            
        }
        
        return resultArray
    }
}