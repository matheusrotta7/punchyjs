'use client'

import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { login } from "../services/LoginService";
import Router from "next/router";

export default function loginscreen () {



    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function callLogin() {
        console.log("Hello!");
        console.log("Inside call login");
        login(username, password)
            .then(loginResponse => {
                console.log(loginResponse);
                redirectToPage(loginResponse)
            });
        
    }

    function redirectToPage(loginResponse) {
        if (loginResponse.role === "Manager") {
            Router.push("/managerscreen");
        } else if (loginResponse.role === "Employee") {
            Router.push("/punchscreen");
        } else if (loginResponse.role === "Admin"){
            Router.push("/adminscreen/addemployee");
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