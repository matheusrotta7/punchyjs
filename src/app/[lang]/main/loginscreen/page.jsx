'use client'

import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import { login } from "../../../services/LoginService";

import { AuthContext } from "../../../contexts/AuthContext"
import cryptoUtils from "../../../utils/CryptoUtils.js"
import { callPasswordResetStart } from "@/app/services/PasswordResetService";
import { useRouter, usePathname } from "next/navigation";
import { getDictionary } from "../../dictionaries";

export default function loginscreen({params: {lang}}) {


    const { signIn, locale } = useContext(AuthContext)

    const router = useRouter()

    const dict = getDictionary(lang)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function callLogin() {
        var passwordHash = cryptoUtils.calculateHash(password)
        await signIn(username, passwordHash)
        
    }

    const handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            callLogin()
        }
    } 

    function handleForgotPassword() {
        console.log("Forgot Password!")
        router.push("/" + locale + "/main/forgotpasswordscreen")
    }

        
    


    return (
        <>
            {dict != null && dict != undefined ? 
                <div className="ml-3 mt-3">
                <h1>{dict.loginscreen.loginscreen}</h1>
                <div className="mt-6">
                    <span>E-mail:</span> <input className="ml-3 text-zinc-800" type="text" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mt-3">
                    <span>{dict.loginscreen.password}</span> <input className="ml-3 text-zinc-800" type="password" onKeyDown={handleKeyDown} onChange={e => setPassword(e.target.value)} />
                </div>
                <SubmitButton text="Login" onClickFunction={callLogin} />
                <div className="mt-5">
                    <span className="text-xs text-sky-600 hover:text-sky-400 hover:cursor-pointer" onClick={handleForgotPassword}>{dict.loginscreen.forgotpassword}</span>
                </div>
            </div>
            :
            <></>
            }
        </>
    )
}