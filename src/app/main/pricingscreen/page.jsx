'use client'

import { useState } from "react"

export default function pricingscreen () {

    const [numOfEmployees, setNumberOfEmployees] = useState(3)

    return (
        <>
            <div className="p-3">

                <h1>Our pricing is based on the number of employees in your company that will interact with Punchy</h1>
                <h1>That includes three categories: employees, managers and one admin</h1>
                <h1>Once a deal is closed, our tech support will enroll your company in our database and give you one admin access to your company</h1>
                <h1>The admin will then be able to enroll managers and their employees, as long as the total number doesn't exceed the plan that was hired</h1>
                <h2 className="mt-5">Test now how much it would cost per month by selecting the number of employees in your company that would interact with punchy (one admin, managers and employees):</h2>
                <input type="range" min={3} max={1000} value={numOfEmployees} onChange={e => {setNumberOfEmployees(e.target.value)}} className="w-3/5"></input>
                <h3>Number of employees: {numOfEmployees}</h3>
                <h3>Estimated cost per month: R$ {numOfEmployees*5}</h3>
            </div>

        </>
    )
}