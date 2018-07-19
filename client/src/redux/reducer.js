import {weekData} from '../data/weekData'
import {selectedYear} from '../data/weekData'
import {selectedMonth} from '../data/weekData'
import {selectedDayVisible} from '../data/weekData'
import {userName} from '../data/weekData'
import { combineReducers } from 'redux'


function days(state = weekData, action) {

    switch(action.type){
        case 'UPDATE_DAYS':
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

function dayVisible(state = selectedDayVisible, action){
    switch(action.type){
        case 'UPDATE_DAY_VISIBLE':
            return action.dayVisible;
        default:
            return state; 
    }
}


function user(state = userName, action){
    switch(action.type){
        case 'UPDATE_USER':
            return action.newUser;
        default:
            return state;
    }
}

const rootReducer = combineReducers({days, year, month, dayVisible, user})


export default rootReducer