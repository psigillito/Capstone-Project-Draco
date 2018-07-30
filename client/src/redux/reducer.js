import {weekData} from '../data/weekData'
import {selectedYear} from '../data/weekData'
import {selectedMonth} from '../data/weekData'
import {selectedDayVisible} from '../data/weekData'
import {userName} from '../data/weekData'
import {currentTrainingPlans} from '../data/weekData'
import { combineReducers } from 'redux'
import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, CLEAR_PROFILE } from './types';
import isEmpty from '../utility/isEmpty';
import {currentWorkouts} from '../data/weekData';


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

// set initial state
const initialState = {
    isAuthenticated: false,
    user: {}
}

// authorization reducer
function auth(state = initialState, action) {
    switch(action.type) {
      case SET_CURRENT_USER:
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

function workouts(state = currentWorkouts, action){
    switch(action.type){
        case "SET_WORKOUTS":
            state = action.data;
        default:
            return state;
    }
}

function weekDay(state = 0, action){
    switch(action.type){
        case "SET_CURRENT_WEEK_DAY":
            state = action.data;
        default:
            return state;
    }
}

const profileState = {
    profile: null
}

// profile reducer
function profile(state = profileState, action) {
    switch(action.type) {
        case GET_PROFILE: 
            return {
                ...state,
                profile: action.payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null
            }
        default: return state;
    }
}

function day(state=0, action) {

    switch(action.type){
        case 'SET_SELECTED_DAY':
            state = action.data
        default:
            return state;
    }
}

function selectedWorkoutList(state=[], action){
    
    switch(action.type){
        case 'SET_SELECTED_WORKOUT_LIST':
            state=action.data
        default:
            return state;
    }
}

function stravaToken(state=0, action){
    switch(action.type){
        case 'SET_STRAVA_TOKEN':
            state = action.stravaToken
        default:
            return state;
    }
}


const rootReducer = combineReducers({days, year, month, dayVisible, auth, errors, profile, trainingPlans, workouts, day, weekDay, selectedWorkoutList, stravaToken})


export default rootReducer