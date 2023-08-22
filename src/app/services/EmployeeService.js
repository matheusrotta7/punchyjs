import hostUtils from "../utils/HostUtils";

export async function getAllEmployees() {
    
    try{
        const response = await fetch(hostUtils.getHost() + '/employee', {
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

export async function getAllEmployeesWithManager(managerId) {

    try{
        const response = await fetch(hostUtils.getHost() + '/employee/manager/' + managerId, {
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

export async function createNewEmployee(employeeName, managerId, email, password) {
    try {
        const response = await fetch(hostUtils.getHost() + '/employee', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "name": employeeName,
                "manager": {
                    "id": managerId
                },
                "username": email,
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