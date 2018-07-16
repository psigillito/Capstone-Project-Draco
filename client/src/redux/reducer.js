import {weekData} from '../data/weekData'
import {selectedYear} from '../data/weekData'
import {selectedMonth} from '../data/weekData'
import { combineReducers } from 'redux'


function days(state = weekData, action) {

    switch(action.type){
        case 'UPDATE_DAYS':
            console.log(action.newDays)
            return action.newDays; 
        default:
            return state;
    }


    return state;
}

function year(state = selectedYear, action, month, year){
    switch(action.type){
        case 'UPDATE_YEAR':
            return action.selectedYear;
        default:
            return state;
    }
}

function month(state = selectedMonth, action){
    switch(action.type){
        case 'UPDATE_MONTH':
            return action.selectedMonth;
        default:
            return state;
    }
}

const rootReducer = combineReducers({days, year, month})


export default rootReducer