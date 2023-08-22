import hostUtils from "../utils/HostUtils";

export async function login(username, password) {

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

        var responseJson = await response.json()

        if (!response.ok) {
            alert(responseJson.message)
            throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);

        }

        return responseJson;
    } catch(error) {
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