import hostUtils from "../utils/HostUtils";

export async function login(username, password) {
    console.log("client side or server side? (test)")
    try {
        const response = await fetch(hostUtils.getHost() + '/login', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
            
          });
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        console.log(error)
    }
}

export async function recoverUserThroughToken(token) {
    try {
        const response = await fetch(hostUtils.getHost() + '/login', {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
                'token': token
            }
            
          });
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        console.log(error)
    }
}