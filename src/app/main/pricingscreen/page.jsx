'use client'

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { getDictionary } from "@/app/dictionaries";

export default function pricingscreen () {

    const [numOfEmployees, setNumberOfEmployees] = useState(3)
    const [dict, setDict] = useState()

    const { locale } = useContext(AuthContext)

    useEffect(() => {
        setDict(getDictionary(locale))  
    }, [])

    return (
        <>
            {dict != null && dict != undefined ? 
                <div className="p-3">

                    <h1>{dict.pricingscreen.pricingsummary}</h1>
                    <h1>{dict.pricingscreen.employeecategories}</h1>
                    <h1>{dict.pricingscreen.accessdetails}</h1>
                    <h1>{dict.pricingscreen.adminactions}</h1>
                    <h2 className="mt-5">{dict.pricingscreen.testbudget}</h2>
                    <input type="range" min={3} max={1000} value={numOfEmployees} onChange={e => {setNumberOfEmployees(e.target.value)}} className="w-3/5"></input>
                    <h3>{dict.pricingscreen.numofemployees}: {numOfEmployees}</h3>
                    <h3>{dict.pricingscreen.estimatedcost}: R$ {numOfEmployees*5}</h3>
                </div>
                :
                <></>
            }
            

        </>
    )
}