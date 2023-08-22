import hostUtils from "../utils/HostUtils";

export async function getAllCompanies() {

    try{
        const response = await fetch(hostUtils.getHost() + '/company', {
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


export async function createNewCompany(companyName, isPaying, maxNumberOfEmployees) {
    try {
        const response = await fetch(hostUtils.getHost() + '/company', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "name": companyName,
                "paying": isPaying,
                "maxNumberOfEmployees": maxNumberOfEmployees
            })
            
          });
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        alert("There was an error when creating company!")
        console.log(error)
    }
}