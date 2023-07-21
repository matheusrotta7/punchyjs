'use client'

import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { login } from "../services/LoginService";
import { useRouter } from "next/navigation";

export default function loginscreen () {


    const router = useRouter()


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginResponse, setLoginResponse] = useState({})

    function callLogin() {
        console.log("Hello!");
        console.log("Inside call login");
        login(username, password)
            .then(loginResponse => {
                console.log(loginResponse);
                // redirectToPage(loginResponse)
                setLoginResponse(loginResponse)
            });
        
    }

    useEffect(() => {
        redirectToPage()
    }, [loginResponse])

    function redirectToPage() {
        if (loginResponse.role === "Manager") {
            router.push("/managerscreen");
        } else if (loginResponse.role === "Employee") {
            router.push("/employeescreen/punchmirrorscreen?id=" + loginResponse.id);
        } else if (loginResponse.role === "Admin"){
            router.push("/adminscreen/addemployee");
        } else {
            console.log("Invalid role")
        }
      }


    return (
        <>
            <div className="ml-3 mt-3">
                <h1>Login Screen</h1>
                <div className="mt-6">
                    <span>Username:</span> <input className="ml-3 text-zinc-800" type="text" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="mt-3">
                    <span>Password:</span> <input className="ml-3 text-zinc-800" type="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <SubmitButton text="Login" onClickFunction={callLogin} />

            </div>
        </>
    )
}