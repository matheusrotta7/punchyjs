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
            result.push(<DateBox 
                key={i}
                day={i}
                punchList={props.punchList}
                ></DateBox>)
        }
    
        return result;
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