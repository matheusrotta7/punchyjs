import { ChevronLeft, ChevronRight } from "lucide-react";
import DateBox from "../components/DateBox";
import dateUtils from "../utils/DateUtils";





function arrayOfDateBoxes() {

    console.log("Hello")

    var result = []
    const lastDay = dateUtils.getLastDayForAMonthYear(6, 2023);
    console.log("lastDay: " + lastDay)
    for (let i = 1; i<=lastDay; i++) {
        result.push(<DateBox 
            key={i}
            day={i}
            ></DateBox>)
    }

    return result;
}

export default function punchScreenResponsive() {

    var curMonth = 0
    var curYear = 2023

    return (

        <>
            <h1 className="text-gray-200">Punch Screen Responsive</h1>
            <div className="text-gray-200 mt-6">
                <div className="flex mb-3 ">
                    <button className="rounded-full bg-blue-700/30 mr-1">
                        <ChevronLeft/>
                    </button>
                    <h2 className="">{dateUtils.getMonthName(curMonth)}  {curYear} </h2>
                    <button className="rounded-full bg-blue-700/30 ml-1">
                        <ChevronRight/>
                    </button>

                </div>
                <span className="inline-grid grid-cols-7 gap-4">
                    {arrayOfDateBoxes()}
                </span>

            </div>
        </>
    )

}