'use client'

import SubmitButton from "@/app/components/SubmitButton";
import { punch } from "@/app/services/PunchService";
import dateUtils from '../../utils/DateUtils'
// import {Alert} from 'react-alert'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { getDictionary } from "@/app/dictionaries";
import { LoaderIcon } from "lucide-react";

export default function addPunchScreen () {

    const { user, locale } = useContext(AuthContext)
    
    const [dict, setDict] = useState()

    useEffect(() => {
        setDict(getDictionary(locale))  
        console.log("dict")
        console.log(dict)
    }, [])


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
                    <h2>{dict.addpunchscreen.registerpunchnow}</h2>
                    <div className="ml-0">
                        <SubmitButton text={dict.addpunchscreen.punchbuttontext} onClickFunction={punchNow} />
                    </div>
                </div>
        :
            <></>
        }
            
        </>
    )

}