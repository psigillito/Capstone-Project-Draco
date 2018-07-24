import {weekData} from '../data/weekData'
import {selectedYear} from '../data/weekData'
import {selectedMonth} from '../data/weekData'
import {selectedDayVisible} from '../data/weekData'
import {userName} from '../data/weekData'
import {currentTrainingPlans} from '../data/weekData'
import { combineReducers } from 'redux'
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import isEmpty from '../utility/isEmpty';



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

// initial state for registration
function user(state = userName, action){
    switch(action.type){
        case 'UPDATE_USER':
            return action.newUser;
        default:
            return state;
    }
}

const initialState = {
    isAuthenticated: false,
    user: {}
}

// authorization reducer
function auth(state = initialState, action) {
    switch(action.type) {
      case 'SET_CURRENT_USER':
        return {
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        }
      default: return state;
    }
}

// errors reducer
function errors(state = {}, action) {
    switch(action.type) {
      case GET_ERRORS: return action.payload;
      default: return state;
    }
}

function trainingPlans(state = currentTrainingPlans, action){
    switch(action.type){
        case "SET_TRAINING_PLAN":
            state = action.data;
        default:
            return state;
    }
}

const rootReducer = combineReducers({days, year, month, dayVisible, auth, errors, user, trainingPlans })

export default rootReducer