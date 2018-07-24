import {getMonthWeeks} from '../data/weekData'
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, CLEAR_PROFILE } from './types';
import setAuthToken from '../utility/authToken';
import jwt_decode from 'jwt-decode';

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
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  }  
}