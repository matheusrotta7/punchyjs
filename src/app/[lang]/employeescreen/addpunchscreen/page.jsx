'use client'

import SubmitButton from "../../components/SubmitButton";
import { punch } from "@/app/services/PunchService";
import dateUtils from '../../../utils/DateUtils'
// import {Alert} from 'react-alert'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

import { getDictionary } from "../../dictionaries";

export default function addPunchScreen ({ params: { lang } }) {

    const { user } = useContext(AuthContext)
    const dict =  getDictionary(lang)


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
            {dict != null && dict != undefined ? 
                <div className="p-6">
                    <h1>{dict.welcome}, {name}!</h1>
                    <h2 className="mt-4">{dict.addpunchscreen.registerpunchnow}</h2>
                    <div className="ml-0 mt-2">
                        <SubmitButton width="w-24" text={dict.addpunchscreen.punchbuttontext} onClickFunction={punchNow} />
                    </div>
                </div>
        :
            <></>
        }
        </>
    )

}