import hostUtils from "../utils/HostUtils";


export async function getAllManagersFromAdmin(adminId) {

    try{
        const response = await fetch(hostUtils.getHost() + '/manager/admin/' + adminId, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
              }
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createNewManager(managerName, managerEmail, managerPassword, adminId) {
    try {
        const response = await fetch(hostUtils.getHost() + '/manager', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "name": managerName,
                "username": managerEmail,
                "password": managerPassword,
                "admin": {
                    "id": adminId
                }
            })
            
          });
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        alert("There was an error creating the manager!")
        console.log(error)
    }
}