'use client';

import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import MonthYearHeader from "../../components/MonthYearHeader";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import PunchCalendar from "../../components/PunchCalendar";

export default function punchScreen() {

    
    
    const searchParams = useSearchParams()
 
    const employeeId = searchParams.get('id')
      
    const [curMonth, setCurMonth] = useState(2)
    const [curYear, setCurYear] = useState(2023)
    const [punchList, setPunchList] = useState()
    // const [employeeId, setEmployeeId] = useState(0)
    
      
      
    

    function goBackOneMonth() {
        var auxMonth = curMonth - 1;
        if (auxMonth === -1) {
            setCurYear(curYear-1)
            setCurMonth(11)
        } else {
            setCurMonth(auxMonth)
        }
        setPunchList(null)
    }
    
    function goForwardOneMonth() {
        var auxMonth = curMonth + 1;
        if (auxMonth === 12) {
            setCurYear(curYear+1)
            setCurMonth(0)
        } else {
            setCurMonth(auxMonth)
        }
        setPunchList(null)
    }

    

    
    return (
        
        <>
            <div className="text-gray-200 ">
                <div className="flex mb-3 ">
                    <button className="rounded-full bg-sky-800 hover:bg-sky-500 mr-1"
                            onClick={goBackOneMonth}
                            >
                        <ChevronLeft/>
                    </button>
                    <MonthYearHeader 
                        month={curMonth}
                        year={curYear}
                    />
                    <button className="rounded-full bg-sky-800 hover:bg-sky-500 ml-1"
                            onClick={goForwardOneMonth}
                            >
                        <ChevronRight/>
                    </button>

                </div>
                <PunchCalendar
                    employeeId={employeeId}
                    punchList={punchList}
                    setPunchList={setPunchList}
                    curMonth={curMonth}
                    curYear={curYear}
                /> 
                
                
                

            </div>
        </>
    )

}