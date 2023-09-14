'use client'

import { AlertCircle } from "lucide-react";
import { useContext, useState } from "react";
import SubmitButton from "../../components/SubmitButton.jsx";
import { useRouter } from "next/navigation";

import cryptoUtils from "../../../utils/CryptoUtils.js"
import { callPasswordResetEnd } from "@/app/services/PasswordResetService.js";
import { AuthContext } from "@/app/contexts/AuthContext.jsx";
import { getDictionary } from "../../dictionaries.js";

export default function Page({ params: {token, lang} }) {

    const dict = getDictionary(lang)

    const {locale} = useContext(AuthContext)

    const [newPassword, setNewPassword] = useState("")
    const [newPasswordCheck, setNewPasswordCheck] = useState("")
    const [alertPasswordsDontMatch, setAlertPasswordsDontMatch] = useState(false)

    const router = useRouter()

    function callFinishPasswordResetMethod() {
        var passwordToken = token
        var passwordHash = cryptoUtils.calculateHash(newPassword)

        callPasswordResetEnd(passwordHash, passwordToken)
        router.push("/" + locale + "/main/loginscreen")
        
    }

    const handlePasswordCheckChange = (e) => {
        var passwordCheck = e.target.value
        setNewPasswordCheck(passwordCheck)
        if (passwordCheck != newPassword) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }

    }

    const handlePasswordChange = (e) => {
        var password = e.target.value
        setNewPassword(password)
        if (password != newPasswordCheck) {
            setAlertPasswordsDontMatch(true)
        } else {
            setAlertPasswordsDontMatch(false)
        }
    }

    function disableButton() {
        const shouldDisableButton = alertPasswordsDontMatch || isEmptyString(newPassword);
        console.log("shouldDisableButton")
        console.log(shouldDisableButton)
        return shouldDisableButton;
    }

    function isEmptyString (str) {
        return str === null || str === undefined || str.length === 0
    }

    return (
        <>
            <div className="p-6">

                <div>{dict.passwordresetscreen}</div>
                <div className="mt-2">
                    <span className="mr-3">{dict.addemployeescreen.password}:</span> <input type="password" className="text-zinc-800" onChange={handlePasswordChange}></input>
                </div>

                <div className="mt-2 flex">
                    <span className="mr-3">{dict.addemployeescreen.retypepassword}:</span> <input type="password" className="text-zinc-800" onChange={handlePasswordCheckChange}></input> 
                    <div title="passwords don't match!">
                        {alertPasswordsDontMatch ? <AlertCircle strokeWidth={3} className="text-red-700/75 mx-2"/> : null}
                    </div>
                </div>
                
                <SubmitButton disabled={disableButton()} onClickFunction={callFinishPasswordResetMethod} text={dict.submit} />
            </div>

        </>
    )
}