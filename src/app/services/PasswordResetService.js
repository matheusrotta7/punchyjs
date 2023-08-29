import hostUtils from "../utils/HostUtils";

export async function callPasswordResetStart(emailAddress) {
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
                "destinyEmailAddress": emailAddress
            })
            
          });
        return await response.json();
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
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        alert("There was an error creating the manager!")
        console.log(error)
    }
}