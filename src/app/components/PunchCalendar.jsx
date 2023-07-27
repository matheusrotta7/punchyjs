'use client'

import DateBox from "../components/DateBox";
import dateUtils from "../utils/DateUtils";
import { useState, useEffect } from "react";
import {getPunches} from '../services/PunchService'

export default function PunchCalendar(props) {

    
    
    
    useEffect(() => {
        fetchPunches();
    }, [props.curMonth, props.curYear])


    function fetchPunches() {
        console.log("Inside use effect curmonth: " + props.curMonth);
        getPunches(2, props.curMonth, props.curYear)
            .then(punches => {
                console.log(punches);
                props.setPunchList(punches);
            });
    }


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

            var punchesOfThisDay = extractThisDayPunches(props.punchList, i)

            result.push(<DateBox
                setSelectedDayPunchList={props.setSelectedDayPunchList}
                setSelectedDay={props.setSelectedDay} 
                key={i}
                day={i}
                punchList={punchesOfThisDay}
                ></DateBox>)
        }
    
        return result;
    }

    function notEmpty(punchList) {
        return typeof punchList != "undefined" && punchList != null && punchList.length > 0;
    }

    function extractThisDayPunches(punchList, day) {
        

        if (notEmpty(punchList)) {
            var resultArray = []
    
            for (let i = 0; i < punchList.length; i++) {
                const curPunch = punchList[i];
                const curDayStr = curPunch.timestamp.split(" ")[0].split("-")[2];
                var curDay = parseInt(curDayStr)
                if (day === curDay) {
                    resultArray.push(curPunch)
                }
                
            }
            
            return resultArray

        } else {
            return null
        }


    }

    return (
        <>
            <span className="inline-grid grid-cols-7 gap-4">
                <span className="text-center">Sunday</span>
                <span className="text-center">Monday</span>
                <span className="text-center">Tuesday</span>
                <span className="text-center">Wednesday</span>
                <span className="text-center">Thursday</span>
                <span className="text-center">Friday</span>
                <span className="text-center">Saturday</span>
                {pushDayOneToAppropriateWeekDay()}
                {arrayOfDateBoxes()}
            </span>
        </>
    )
}