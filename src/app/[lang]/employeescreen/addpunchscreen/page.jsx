'use client'

import SubmitButton from "@/app/components/SubmitButton";
import { punch } from "@/app/services/PunchService";
import dateUtils from '../../../utils/DateUtils'
// import {Alert} from 'react-alert'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

import { getDictionary } from "../../dictionaries";

export default async function addPunchScreen ({ params: { lang } }) {

    const { user } = useContext(AuthContext)
    const dict = await getDictionary(lang)


    const [id, setId] = useState(null)
    const [name, setName] = useState(null)

    function punchNow() {
        console.log("hello")
        var curTime = dateUtils.getCurrentTimestamp()
        
        if (id != null) {
            punch(id, curTime).then(punchResponse => {
                if (punchResponse != null) {
                    alert(dict.addpunchscreen.punchsuccess + punchResponse.timestamp)
                }
            })
        }
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
                <h1>Welcome, {name}!</h1>
                <h2>Register you punch now!</h2>
                <div className="ml-0">
                    <SubmitButton text="Punch" onClickFunction={punchNow} />
                </div>
            </div>
        </>
    )

}