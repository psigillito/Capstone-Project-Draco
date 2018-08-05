import {getMonthWeeks} from '../data/weekData'
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, CLEAR_PROFILE } from './types';
import setAuthToken from '../utility/authToken';
import jwt_decode from 'jwt-decode';
import store from '../store';

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

// Registration
export const registerUser = (userData, history) => dispatch => {
    axios.post('/users/register', userData)
      // redirect on success
      .then(result => history.push('/login'))
      // use dispatch for async calls
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

// Login and get token for user
export const loginUser = (userData) => dispatch => {
  axios.post('/users/login', userData)
    .then(result => {
      // save user token to local storage
      const {token} = result.data;
      localStorage.setItem('jwtToken', token);
      // set token to authorization header
      setAuthToken(token);
      // decode the token for user data
      const data = jwt_decode(token);
      // set the current user
      dispatch(setCurrentUser(data));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
};


export function getCurrentTrainingPlans (response) {
    return {
        type: 'SET_TRAINING_PLAN',
        data: response
    }
}

export function getCurrentWorkouts(response) {
    return {
        type: 'SET_WORKOUTS',
        data: response
    }
}

// set the currently logged in user
export const setCurrentUser = (data) => {
  return {
    type: 'SET_CURRENT_USER', 
    payload: data
  }
}

// log the user out
export const logout = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem('jwtToken');
  // remove authorizaion header
  setAuthToken(false);
  // set user to empty object
  dispatch(setCurrentUser({}));
  // redirect to login page
  window.location.href = '/login';
}

// get the current user profile
export const getProfile = () => dispatch => {
  axios.get('/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}

// edit user account
export const editUser = (userData, history) => dispatch => {
    axios.post('/profile/edit-profile', userData)
        .then(res => history.push('/profile'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data}));
}

// delete user account
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure you wish to delete your account?')) {
    axios.post('/users/delete')
      .then(res => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
  }
}

export function updateSelectedDay(response) {
    return {
        type: 'SET_SELECTED_DAY',
        data: response
    }
}

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  }  
}

export function updateCurrentWeekDay(response) {
    return {
        type: 'SET_CURRENT_WEEK_DAY',
        data: response
    }
}

export function updateSelectedWorkoutList(currentDate){

    
    var activeTrainingPlans = store.getState().trainingPlans.data.filter( (plan) => Date.parse(plan.startDate) <= Date.parse(currentDate) 
                                                                                 && Date.parse(plan.endDate) >= Date.parse(currentDate));

    var newWorkoutList = [];
    for(var i = 0; i < activeTrainingPlans.length; i++){
            newWorkoutList = newWorkoutList.concat(activeTrainingPlans[i].workouts)
    }

    return {
        type: 'SET_SELECTED_WORKOUT_LIST',
        data: newWorkoutList
    }
}

export function updateStravaToken(newToken){
    return {
        type: 'SET_STRAVA_TOKEN',
        stravaToken: newToken
    }
}

export function setAthleteId(newId){
    console.log("NEW ID IS: "+console.log(newId))
    return {
        type: 'SET_ATHLETE_ID',
        athleteId: newId
    }
}

export function setAthleteRoutes(routes){
    return{
        type: 'SET_ATHLETE_ROUTES',
        athleteRoutes: routes
    }
}


export function setSelectedRoute(routeId){

    return{
        type: 'SET_SELECTED_ROUTE',
        selectedRoute: routeId
    }

}

export function setCurrentRoute(route){

    return{
        type: 'SET_CURRENT_ROUTE',
        currentRoute: route
    }

}