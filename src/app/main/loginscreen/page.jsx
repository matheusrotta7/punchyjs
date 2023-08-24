'use client'

import { useContext, useEffect, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import { login } from "../../services/LoginService";

import { AuthContext } from "../../contexts/AuthContext"
import cryptoUtils from "../../utils/CryptoUtils.js"

export default function loginscreen() {


    const { signIn } = useContext(AuthContext)


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
    }
        
    


    return (
        <>
            <div className="ml-3 mt-3">
                <h1>Login Screen</h1>
                <div className="mt-6">
                    <span>Username:</span> <input className="ml-3 text-zinc-800" type="text" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mt-3">
                    <span>Password:</span> <input className="ml-3 text-zinc-800" type="password" onKeyDown={handleKeyDown} onChange={e => setPassword(e.target.value)} />
                </div>
                <SubmitButton text="Login" onClickFunction={callLogin} />
                <div className="mt-5">
                    <span className="text-xs text-sky-600 hover:text-sky-400 hover:cursor-pointer" onClick={handleForgotPassword}>Forgot Password?</span>
                </div>
            </div>
        </>
    )
}