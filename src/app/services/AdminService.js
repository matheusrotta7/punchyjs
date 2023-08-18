import hostUtils from "../utils/HostUtils";





export async function createNewAdmin(adminName, companyId, email, password) {
    try {
        const response = await fetch(hostUtils.getHost() + '/admin', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "name": adminName,
                "company": {
                    "id": companyId
                },
                "username": email,
                "password": password,
                "root": false
            })
            
          });
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        console.log(error)
    }
}