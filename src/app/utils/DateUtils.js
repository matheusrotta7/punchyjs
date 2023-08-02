class DateUtils {

    static getLastDayForAMonthYear(month, year) {
        var date = new Date(year, month + 1, 0)
        return date.getDate()
    }

    static getMonthName(monthNumber) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        if (monthNumber >= 0 && monthNumber <= 11) {
            return months[monthNumber];
        } else {
            return "Invalid month number. Please provide a number between 0 and 11.";
        }
    }

    static dayOfWeekFor(day, month, year) {
        console.log("Hello, day, month, year: " + day + " " + month + " " + year)
        const weekDays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        var date = new Date(year, month, day)
        return weekDays[date.getDay()]
    }

    static getWeekDayOfFirstDayOfMonth(month, year) {
        var date = new Date(year, month, 1)
        return date.getDay()
    }

    static generateStringFromNumber(num, numberOfDigits) {
        return num.toLocaleString(undefined, { minimumIntegerDigits: numberOfDigits })
    }

    static getCurrentTimestamp() {


        var date = new Date();

        var dateString = date.getFullYear()
            + '-' + DateUtils.generateStringFromNumber(date.getMonth() + 1, 2)
            + '-' + DateUtils.generateStringFromNumber(date.getDate(), 2)
            + ' ' + DateUtils.generateStringFromNumber(date.getHours(), 2)
            + ':' + DateUtils.generateStringFromNumber(date.getMinutes(), 2)
            + ':' + DateUtils.generateStringFromNumber(date.getSeconds(), 2)

        console.log("datestring: " + dateString)

        return dateString
    }

    

    static calculateOffsetTime(curPunch, prevPunch) {

        var curDate = new Date(curPunch.timestamp)
        curDate.setSeconds(0)

        var prevDate = new Date(prevPunch.timestamp)
        prevDate.setSeconds(0)

        var offsetTime = curDate - prevDate;
        return offsetTime
    }

    static calculateWorkedHours(selectedDayPunchList) {

        if (selectedDayPunchList === null || selectedDayPunchList === undefined) {
            return "00:00"
        }
        if (selectedDayPunchList.length === 0) {
            return "00:00"
        }
        if (selectedDayPunchList.length % 2 === 1) {
            return "Odd number of punches"
        }

        var openingPunch = true
        var prevPunch = null

        var offsetTimeSum = 0

        for (let i = 0; i < selectedDayPunchList.length; i++) {
            var curPunch = selectedDayPunchList[i];
            if (openingPunch) {
                prevPunch = curPunch
                openingPunch = false
            } else {
                var offsetTime = DateUtils.calculateOffsetTime(curPunch, prevPunch)
                offsetTimeSum += offsetTime
                openingPunch = true
            }

        }

        var dateResult = new Date(offsetTimeSum)

        const workedHoursStr = dateResult.toUTCString().split(" ")[4];

        return workedHoursStr.substring(0, workedHoursStr.length-3)


    }



}

export default DateUtils
