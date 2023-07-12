class DateUtils {
    
    static getLastDayForAMonthYear(month, year) {
        var date = new Date(year, month+1, 0)
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

    static getWeekDayOfFirstDayOfMonth(month, year) {
        var date = new Date(year, month, 1)
        return date.getDay()
    }
}

export default DateUtils