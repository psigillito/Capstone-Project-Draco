import {getMonthWeeks} from '../data/weekData'

export function updateCurrentYear(newYear){

    return {
        type: 'UPDATE_YEAR',
        selectedYear: newYear
    }
}

export function updateDays(month, year){

    console.log("MONTH:"+month+","+"Year:"+year);
    var newDays = getMonthWeeks(year, month);

    return {
        type: 'UPDATE_DAYS',
        newDays: newDays
    }

}

