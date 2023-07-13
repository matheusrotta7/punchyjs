'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import DateBox from "../components/DateBox";
import dateUtils from "../utils/DateUtils";
import MonthYearHeader from "../components/MonthYearHeader";
import { useState } from "react";
import {getPunches} from '../services/PunchService'

export default function punchScreen() {
    
    
    const fetchPunches = () => {
        getPunches(2, curMonth, curYear)
          .then(punches => {
            updatePunchList(punches);
          });
    }
    
    const [curMonth, updateCurMonth] = useState(11)
    const [curYear, updateCurYear] = useState(2023)
    const [punchList, updatePunchList] = useState()

    
    function goBackOneMonth() {
        const auxMonth = curMonth - 1;
        if (auxMonth === -1) {
            updateCurYear(curYear-1)
            updateCurMonth(11)
        } else {
            updateCurMonth(auxMonth)
        }
        fetchPunches()
    }

    function goForwardOneMonth() {
        const auxMonth = curMonth + 1;
        if (auxMonth === 12) {
            updateCurYear(curYear+1)
            updateCurMonth(0)
        } else {
            updateCurMonth(auxMonth)
        }
        fetchPunches()
    }

    function pushDayOneToAppropriateWeekDay() {
        var weekDay = dateUtils.getWeekDayOfFirstDayOfMonth(curMonth, curYear)
        
        var spanArray = []

        for (let i = 0; i < weekDay; i++) {
            spanArray.push(<span key={i} className="invisible">.</span>)
        }
        return spanArray
    }

    function arrayOfDateBoxes() {
    
        var result = []
        const lastDay = dateUtils.getLastDayForAMonthYear(curMonth, curYear);

        for (let i = 1; i<=lastDay; i++) {
            result.push(<DateBox 
                key={i}
                day={i}
                punchList={punchList}
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
                    <span>Sunday</span>
                    <span>Monday</span>
                    <span>Tuesday</span>
                    <span>Wednesday</span>
                    <span>Thursday</span>
                    <span>Friday</span>
                    <span>Saturday</span>
                    {pushDayOneToAppropriateWeekDay()}
                    {arrayOfDateBoxes()}
                </span>

            </div>
        </>
    )

}