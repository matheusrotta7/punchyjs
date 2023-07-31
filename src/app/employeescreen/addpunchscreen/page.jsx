'use client'

import SubmitButton from "@/app/components/SubmitButton";
import { punch } from "@/app/services/PunchService";
import dateUtils from '../../utils/DateUtils'
// import {Alert} from 'react-alert'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function addPunchScreen () {

    const { user } = useContext(AuthContext)


    const [id, setId] = useState(2)
    const [name, setName] = useState("user")

    function punchNow() {
        console.log("hello")
        var curTime = dateUtils.getCurrentTimestamp()
        
        punch(id, curTime).then(punchResponse => {
            if (punchResponse != null) {
                alert("Your punch was succesfully registered at " + punchResponse.timestamp)
            }
        })
    }

    useEffect(() => {
        if (user != null && user != undefined) {
            setId(user.id)
            setName(user.name)
        }
    }, [user])


    return (

        <>
            <div className="p-6">
                <h1>Welcome, {name}</h1>
                <h2>Register you punch now!</h2>
                <div className="ml-0">
                    <SubmitButton text="Punch" onClickFunction={punchNow} />
                </div>
            </div>
        </>
    )

}