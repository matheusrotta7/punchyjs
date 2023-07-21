'use client'

import SubmitButton from "@/app/components/SubmitButton";
import { punch } from "@/app/services/PunchService";
import dateUtils from '../../utils/DateUtils'
// import {Alert} from 'react-alert'

import { useState } from "react";

export default function addPunchScreen () {


    const [id, setId] = useState(2)

    function punchNow() {
        //call punch function backend
        //get cur timestamp
        console.log("hello")
        var curTime = dateUtils.getCurrentTimestamp()
        
        punch(id, curTime).then(punchResponse => {
            if (punchResponse != null) {
                alert("Your punch was succesfully registered at " + punchResponse.timestamp)
            }
        })
    }


    return (

        <>
            <h1>Register you punch now!</h1>
            <SubmitButton text="Punch" onClickFunction={punchNow} />


        
        </>
    )

}