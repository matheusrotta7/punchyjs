'use client';

import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import MonthYearHeader from "../../components/MonthYearHeader";
import { useState, useEffect } from "react";

import PunchCalendar from "../../components/PunchCalendar";
import PunchCircleTimestamped from "@/app/components/PunchCircleTimestamped";

import dateUtils from "../../utils/DateUtils";

export default function punchScreen() {

    
    
    let date = new Date()
      
    const [curMonth, setCurMonth] = useState(date.getMonth())
    const [curYear, setCurYear] = useState(date.getFullYear())
    const [punchList, setPunchList] = useState()
    const [selectedDay, setSelectedDay] = useState(date.getDate())
    const [selectedDayPunchList, setSelectedDayPunchList] = useState()


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

    function generatePunchCirclesTimestamped() {
        if (selectedDayPunchList === null || selectedDayPunchList === undefined) {
            return null
        } 

        return selectedDayPunchList.map((punch, i) => <PunchCircleTimestamped key={i} time={simplifyTimestamp(punch.timestamp)} />)
    }

    function simplifyTimestamp(timestamp) {
        var timeString = timestamp.split(" ")[1]
        var timeStringSplit = timeString.split(":")
        console.log(timeStringSplit)
        var result = timeStringSplit[0] + ":" + timeStringSplit[1]
        return result
    }

    

    
    return (
        
        <>
            
            <div className="text-gray-200 p-6">
                

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
                        setSelectedDayPunchList={setSelectedDayPunchList}
                        setSelectedDay={setSelectedDay}
                        punchList={punchList}
                        setPunchList={setPunchList}
                        curMonth={curMonth}
                        curYear={curYear}
                    /> 
                </div>

                
                
                
                

            </div>
            <aside className="float-right bg-zinc-950 flex-1 border-l border-zinc-800">
                <div className="flex text-center justify-center flex-col">
                    <h1>sidebar to the right (selected day)</h1>
                    <div className="flex text-center justify-center mt-20 text-xl">
                        <MonthYearHeader 
                            month={curMonth}
                            year={curYear}
                        />
                    </div>
                    <div>
                        <div className="relative bg-zinc-800 px-5 mt-5 pt-10 pb-5 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto  sm:rounded-full w-40 h-40">
                            <div className="flex flex-col">
                                <div className="text-xl">
                                    {dateUtils.dayOfWeekFor(selectedDay, curMonth, curYear)}    
                                </div>
                                <div className="text-5xl mt-2">
                                    {selectedDay}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 justify-center">
                        {generatePunchCirclesTimestamped()}
                    </div>
                    <div className="flex flex-col text-sm">
                        <div>
                            <span className="float-left p-3">Horas trabalhadas</span>
                            <span className="float-right p-3">08:35</span>
                        </div>
                        <div>
                            <span className="float-left p-3">Compensação</span>
                            <span className="float-right p-3">00:51</span>
                        </div>
                        
                    </div>
                </div>
            </aside>
        </>
    )

}