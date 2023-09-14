'use client'

import {  useState } from "react";
import SubmitButton from "../../components/SubmitButton";

import { callPasswordResetStart } from "@/app/services/PasswordResetService";
import { getDictionary } from "../../dictionaries";

export default function forgotpasswordscreen({params: { lang }}) {


    const dict = getDictionary(lang)

    const [email, setEmail] = useState("")

    async function handleClick() {
        callPasswordResetStart(email, lang)
    }

    const handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            handleClick()
        }
    } 

    return (
        <>
            <div className="ml-3 mt-3">
                <h1>{dict.forgotpasswordscreen.insertemail}</h1>
                <div className="mt-6">
                    <span>E-mail:</span> <input className="ml-3 text-zinc-800" type="text" onChange={e => setEmail(e.target.value)} />
                </div>
                <SubmitButton text={dict.forgotpasswordscreen.sendlink} onClickFunction={handleClick} />
            </div>
        </>
    )
}

