class PunchUtils {
    
    static extractThisDayPunches(punchList, day) {
        
        function notEmpty(punchList) {
            return typeof punchList != "undefined" && punchList != null && punchList.length > 0;
        }

        if (notEmpty(punchList)) {
            var resultArray = []
    
            for (let i = 0; i < punchList.length; i++) {
                const curPunch = punchList[i];
                const curDayStr = curPunch.timestamp.split(" ")[0].split("-")[2];
                var curDay = parseInt(curDayStr)
                if (day === curDay) {
                    resultArray.push(curPunch)
                }
                
            }
            
            return resultArray

        } else {
            return null
        }


    }

}

export default PunchUtils