'use client';

import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import MonthYearHeader from "../../components/MonthYearHeader";
import { useState, useEffect } from "react";

import PunchCalendar from "../../components/PunchCalendar";
import PunchCircleTimestamped from "@/app/components/PunchCircleTimestamped";

import dateUtils from "../../utils/DateUtils";
import punchUtils from "../../utils/PunchUtils";

import {getPunches} from '../../services/PunchService'


export default function punchScreen() {

    
    
    
    let date = new Date()
    
    const [curMonth, setCurMonth] = useState(date.getMonth())
    const [curYear, setCurYear] = useState(date.getFullYear())
    const [punchList, setPunchList] = useState()
    const [selectedDay, setSelectedDay] = useState(date.getDate())
    const [selectedDayPunchList, setSelectedDayPunchList] = useState([])

    useEffect(() => {
        setSelectedDayPunchList(punchUtils.extractThisDayPunches(punchList, selectedDay))
    }, [punchList, selectedDay])
    
    useEffect(() => {
        fetchPunches();
    }, [curMonth, curYear])


    function fetchPunches() {
        console.log("Inside use effect curmonth: " + curMonth);
        getPunches(2, curMonth, curYear)
            .then(punches => {
                setPunchList(punches);
            });
    }

    function goBackOneMonth() {
        var auxMonth = curMonth - 1;
        if (auxMonth === -1) {
            setCurYear(curYear-1)
            setCurMonth(11)
        } else {
            setCurMonth(auxMonth)
        }
    }
    
    function goForwardOneMonth() {
        var auxMonth = curMonth + 1;
        if (auxMonth === 12) {
            setCurYear(curYear+1)
            setCurMonth(0)
        } else {
            setCurMonth(auxMonth)
        }
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

    function calculateWorkedHours() {
        if (selectedDayPunchList === null || selectedDayPunchList === undefined) {
            return "00:00"
        }
        if (selectedDayPunchList.length === 0) {
            return "00:00"
        }
        if (selectedDayPunchList.length % 2 === 1) {
            return "Odd number of punches"
        }

        var openingPunch = true
        var prevPunch = null

        for (let i = 0; i < selectedDayPunchList.length; i++) {
            var curPunch = selectedDayPunchList[i];
            if (openingPunch) {
                prevPunch = curPunch
            }
            
        }


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
                    <div className="flex text-center justify-center mt-24 text-xl">
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
                            <span className="float-left p-3">Worked hours:</span>
                            <span className="float-right p-3">{calculateWorkedHours()}</span>
                        </div>
                        
                        
                    </div>
                </div>
            </aside>
        </>
    )

}