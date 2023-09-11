'use client'

import { useState } from "react"
import { getDictionary } from "../../dictionaries"

export default function pricingscreen ({params: {lang}}) {

    const [numOfEmployees, setNumberOfEmployees] = useState(3)

    const dict = getDictionary(lang)

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