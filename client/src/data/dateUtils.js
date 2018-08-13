function isLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function calculateNumDaysInMonth(month, year, dayOfWeek) {
    const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var numOccurances = 0;

    if (month === 2 && this.isLeapYear(year)) {
        numDaysInMonth[1] = 29;
    }

    for (var i = 1; i <= numDaysInMonth[month - 1]; i++) {
        var dateToCheck = new Date(year, month - 1, i);
        if (dateToCheck.getDay() === dayOfWeek) {
            numOccurances++;
        }
    }

    return numOccurances;
}

module.exports = {
    isLeapYear,
    calculateNumDaysInMonth
}