import {weekData} from '../data/weekData'
import {selectedYear} from '../data/weekData'
import {selectedMonth} from '../data/weekData'
import {selectedDayVisible} from '../data/weekData'
import { combineReducers } from 'redux'
import { GET_ERRORS } from './types';


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

function dayVisible(state = selectedDayVisible, action){
    switch(action.type){
        case 'UPDATE_DAY_VISIBLE':
            return action.dayVisible;
        default:
            return state; 
    }
}

// authorization reducer
const initialState = {
    isAuthenticated: false,
    user: {}
}

function auth(state = initialState, action) {
    switch(action.type) {
      default: return state;
    }
}

// errors reducer
function errors(state = initialState, action) {
    switch(action.type) {
      case GET_ERRORS: return action.payload;
      default: return state;
    }
}


const rootReducer = combineReducers({days, year, month, dayVisible, auth, errors})


export default rootReducer