export async function getPunches(employeeId, month) {

    try{
        const response = await fetch('localhost:8080/punchSearch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                employeeId: employeeId,
                month: month
            })
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}