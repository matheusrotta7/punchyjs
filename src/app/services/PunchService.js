import hostUtils from "../utils/HostUtils";

export async function getPunches(employeeId, month, year, punchStatus = null) {

    console.log("month")
    console.log(month)
    console.log("year")
    console.log(year)

    try{
        const response = await fetch('http://' + hostUtils.getHost() + ':8080/punchSearch', {
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

    console.log("punchStatus")
    console.log(punchStatus)

    console.log("timestamp")
    console.log(timestamp)

    try{
        const response = await fetch('http://' + hostUtils.getHost() + ':8080/punch', {
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

    console.log("punchId")
    console.log(punchId)

    try{
        const response = await fetch('http://' + hostUtils.getHost() + ':8080/punch', {
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

    console.log("punchId")
    console.log(punchId)

    try{
        const response = await fetch('http://' + hostUtils.getHost() + ':8080/punch/' + punchId, {
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