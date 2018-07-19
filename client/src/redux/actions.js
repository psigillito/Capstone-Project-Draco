import {getMonthWeeks} from '../data/weekData'

export function updateCurrentYear(newYear){

    return {
        type: 'UPDATE_YEAR',
        selectedYear: newYear
    }
}

export function updateMonth(newMonth){

    return {
        type: 'UPDATE_MONTH',
        selectedMonth: newMonth
    }
}

export function updateDays(month, year){

    var newDays = getMonthWeeks(year, month);

    return {
        type: 'UPDATE_DAYS',
        newDays: newDays
    }
}

export function updateDayVisible(newVisible){

    return{
        type: 'UPDATE_DAY_VISIBLE',
        dayVisible: newVisible
    }
}

export function updateUser(newUser){
    return {
        type: 'UPDATE_USER',
        newUser: newUser
    }

}