'use client'

import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import { login } from "../../services/LoginService";

import { AuthContext } from "../../contexts/AuthContext"
import cryptoUtils from "../../utils/CryptoUtils.js"
import { callPasswordResetStart } from "@/app/services/PasswordResetService";
import { useRouter, usePathname } from "next/navigation";

export default function forgotpasswordscreen() {


    const { signIn } = useContext(AuthContext)

    const router = useRouter()


    const [email, setEmail] = useState("")

    async function handleClick() {
        callPasswordResetStart(email)
    }

    const handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            handleClick()
        }
    } 

    
        
    


    return (
        <>
            <div className="ml-3 mt-3">
                <h1>Insert your e-mail so that we can send you a password reset link</h1>
                <div className="mt-6">
                    <span>Email:</span> <input className="ml-3 text-zinc-800" type="text" onChange={e => setEmail(e.target.value)} />
                </div>
                <SubmitButton text="Send link" onClickFunction={handleClick} />
            </div>
        </>
    )
}

