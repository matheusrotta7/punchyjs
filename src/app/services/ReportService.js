import hostUtils from "../utils/HostUtils";

export async function getReport(employeeId, month, year) {

    console.log("month")
    console.log(month)
    console.log("year")
    console.log(year)
    console.log("employeeId")
    console.log(employeeId)

    try{
        const response = await fetch(hostUtils.getHost() + ':8080/report', {
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
                year: year
            })
          });
        return await response.arrayBuffer();
    }catch(error) {
        console.log(error)
        return null;
    }
    
}