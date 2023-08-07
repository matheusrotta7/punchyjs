import hostUtils from "../utils/HostUtils";

export async function getAllEmployees() {
    
    try{
        const response = await fetch(hostUtils.getHost() + ':8080/employee', {
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
        const response = await fetch(hostUtils.getHost() + ':8080/employee/manager/' + managerId, {
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
        const response = await fetch(hostUtils.getHost() + ':8080/employee', {
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
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        console.log(error)
    }
}