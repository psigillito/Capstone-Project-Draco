import {getMonthWeeks} from '../data/weekData'
import axios from 'axios';
import { GET_ERRORS } from './types';

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

// Registration
export const registerUser = (userData, history) => dispatch => {
    axios.post('/users/register', userData)
        // redirect on success
      .then(result => history.push('/login'))
      // use dispatch for async calls
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}