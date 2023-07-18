export async function getAllManagers() {

    try{
        const response = await fetch('http://localhost:8080/manager', {
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

export async function createNewManager(managerName) {
    try {
        const response = await fetch('http://localhost:8080/manager', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET, POST', // Allow GET and POST methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                "name": managerName
            })
            
          });
        return await response.json();
    } catch(error) {
        //add visual alert of failure to user
        console.log(error)
    }
}