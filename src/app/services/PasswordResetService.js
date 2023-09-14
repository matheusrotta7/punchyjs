import hostUtils from "../utils/HostUtils";

export async function callPasswordResetStart(emailAddress, locale) {
    try {
        const response = await fetch(hostUtils.getHost() + '/passwordreset/start', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "destinyEmailAddress": emailAddress,
                "locale": locale
            })
            
          });

        if (!response.ok) {
            var responseJson = await response.json()
            alert(responseJson.message)
        } else {
            alert("An email has been sent to " + emailAddress + " with a password reset link")
        }
    } catch(error) {
        //add visual alert of failure to user
        alert("There was an error when trying to start password reset process")
        console.log(error)
    }
}

export async function callPasswordResetEnd(passwordHash, passwordToken) {
    try {
        const response = await fetch(hostUtils.getHost() + '/passwordreset/finish', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "passwordHash": passwordHash,
                "passwordToken": passwordToken
            })
            
        });

        if (!response.ok) {
            var responseJson = await response.json()
            alert(responseJson.message)
        } else {
            alert("Your password has been succesfully reset!")
        }
    } catch(error) {
        //add visual alert of failure to user
        alert("There was an error when trying to set new password!")
        console.log(error)
    }
}