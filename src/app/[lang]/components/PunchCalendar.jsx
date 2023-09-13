'use client'

import DateBox from "../components/DateBox";
import dateUtils from "../../utils/DateUtils";
import { useState, useEffect } from "react";

import punchUtils from '../../utils/PunchUtils'

export default function PunchCalendar(props) {

    const dict = props.dict

    function pushDayOneToAppropriateWeekDay() {
        var weekDay = dateUtils.getWeekDayOfFirstDayOfMonth(props.curMonth, props.curYear)
        
        var spanArray = []

        for (let i = 0; i < weekDay; i++) {
            spanArray.push(<span key={i} className="invisible">.</span>)
        }
        return spanArray
    }
    

    function arrayOfDateBoxes() {
        
        var result = []
        const lastDay = dateUtils.getLastDayForAMonthYear(props.curMonth, props.curYear);

        for (let i = 1; i<=lastDay; i++) {

            var punchesOfThisDay = punchUtils.extractThisDayPunches(props.punchList, i)

            result.push(<DateBox
                setSelectedDayPunchList={props.setSelectedDayPunchList}
                setSelectedDay={props.setSelectedDay} 
                selectedDay={props.selectedDay}
                key={i}
                day={i}
                punchList={punchesOfThisDay}
                ></DateBox>)
        }
    
        return result;
    }

    
    

    return (
        <>
            <span className="inline-grid grid-cols-7 gap-x-4 gap-y-5">
                <span className="text-center">{dict.punchcalendar.sunday}</span>
                <span className="text-center">{dict.punchcalendar.monday}</span>
                <span className="text-center">{dict.punchcalendar.tuesday}</span>
                <span className="text-center">{dict.punchcalendar.wednesday}</span>
                <span className="text-center">{dict.punchcalendar.thursday}</span>
                <span className="text-center">{dict.punchcalendar.friday}</span>
                <span className="text-center">{dict.punchcalendar.saturday}</span>
                {pushDayOneToAppropriateWeekDay()}
                {arrayOfDateBoxes()}
            </span>
        </>
    )
}