import hostUtils from "../utils/HostUtils";

export async function getPunches(employeeId, month, year, punchStatus = null) {

    try{
        const response = await fetch(hostUtils.getHost() + '/punchSearch', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
              },
            body: JSON.stringify({
                employeeId: employeeId,
                month: month,
                year: year,
                punchStatus: punchStatus
            })
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function punch(employeeId, timestamp, punchStatus) {

    try{
        const response = await fetch(hostUtils.getHost() + '/punch', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
              },
            body: JSON.stringify({
                "employee": {
                    "id": employeeId
                },
                "timestamp": timestamp,
                "punchStatus": punchStatus
            })
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function alterPunch(employeeId, punchId, punchStatus) {

    try{
        const response = await fetch(hostUtils.getHost() + '/punch', {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
              },
            body: JSON.stringify({
                "employee": {
                    "id": employeeId
                },
                "id": punchId,
                "punchStatus": punchStatus
            })
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function deletePunch(punchId) {

    try{
        const response = await fetch(hostUtils.getHost() + '/punch/' + punchId, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
              },
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}