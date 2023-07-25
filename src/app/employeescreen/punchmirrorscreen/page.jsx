'use client';

import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import MonthYearHeader from "../../components/MonthYearHeader";
import { useState, useEffect } from "react";

import PunchCalendar from "../../components/PunchCalendar";

export default function punchScreen() {

    
    
    let date = new Date()
      
    const [curMonth, setCurMonth] = useState(date.getMonth())
    const [curYear, setCurYear] = useState(date.getFullYear())
    const [punchList, setPunchList] = useState()


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
            <aside className="float-right bg-zinc-400">
                sidebar to the right yolo
            </aside>
            <div className="text-gray-200 ">
                

                <div>
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
                        punchList={punchList}
                        setPunchList={setPunchList}
                        curMonth={curMonth}
                        curYear={curYear}
                    /> 
                </div>

                
                
                
                

            </div>
        </>
    )

}