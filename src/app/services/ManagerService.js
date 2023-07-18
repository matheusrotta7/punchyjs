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