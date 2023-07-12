'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import DateBox from "../components/DateBox";
import dateUtils from "../utils/DateUtils";
import MonthYearHeader from "../components/MonthYearHeader";
import { useState } from "react";










export default function punchScreenResponsive() {
    
    
    // var curMonth = 0
    // var curYear = 2023
    
    const [curMonth, updateCurMonth] = useState(0)
    const [curYear, updateCurYear] = useState(2023)
    
    function goBackOneMonth() {
        console.log(curMonth)
        console.log(curYear)
        const auxMonth = curMonth - 1;
        if (auxMonth === -1) {
            updateCurYear(curYear-1)
            updateCurMonth(11)
        } else {
            updateCurMonth(auxMonth)
        }
    }

    function goForwardOneMonth() {
        console.log(curMonth)
        console.log(curYear)
        const auxMonth = curMonth + 1;
        if (auxMonth === 12) {
            updateCurYear(curYear+1)
            updateCurMonth(0)
        } else {
            updateCurMonth(auxMonth)
        }
    }
    
    function arrayOfDateBoxes() {
    
        console.log("Hello")
    
        var result = []
        const lastDay = dateUtils.getLastDayForAMonthYear(curMonth, curYear);
        console.log("lastDay: " + lastDay)
        for (let i = 1; i<=lastDay; i++) {
            result.push(<DateBox 
                key={i}
                day={i}
                ></DateBox>)
        }
    
        return result;
    }
    
    return (
        
        <>
            <h1 className="text-gray-200">Punch Screen Responsive</h1>
            <div className="text-gray-200 mt-6">
                <div className="flex mb-3 ">
                    <button className="rounded-full bg-blue-700/30 mr-1"
                            onClick={goBackOneMonth}
                            >
                        <ChevronLeft/>
                    </button>
                    <MonthYearHeader 
                        month={curMonth}
                        year={curYear}
                        />
                    <button className="rounded-full bg-blue-700/30 ml-1"
                            onClick={goForwardOneMonth}
                            >
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