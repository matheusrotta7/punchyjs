'use client'

import SubmitButton from "../components/SubmitButton";

export default function loginscreen () {


    function callLogin() {
        console.log("Hello!");

    }


    return (
        <>
            <div className="ml-3 mt-3">
                <h1>Login Screen</h1>
                <div className="mt-6">
                    <span>Username:</span> <input className="ml-3 text-zinc-800" type="text"/>
                </div>
                <div className="mt-3">
                    <span>Password:</span> <input className="ml-3 text-zinc-800" type="text"/>
                </div>
                <SubmitButton text="Login" onClickFunction={callLogin} />
            </div>
        </>
    )
}