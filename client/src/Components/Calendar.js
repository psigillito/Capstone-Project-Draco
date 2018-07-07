import React, {Component} from 'react'
import Day from './Day'
import Week from './Week'

const Days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const Months = ['January', 'Februaru', 'March', 'April', 'May',
                'June', 'July', 'August', 'September',
                'October', 'November', 'December'
                ];



/*******BREAK INTO FUNCTION*******/

//Calculating current month number of days 
//get number of days in month 
var d = new Date();

var year = "2018";
var month = d.getMonth()+1;

var startWeekDay = new Date(year + "-" + month + "-01").getDay();
var numberOfDays = new Date(year, month, 0).getDate();
var numberOfDaysThisMonth = new Date(year, month+1, 0).getDate();
//stores 6 rows of dates
var weekArray = []

//date counter 
var counter = 1;
//for each week
for(let i = 0; i < 6; i++){
   
    var aWeek = [];

    //for eachday
    for(let x = 0; x < 7; x++){
      
        //if day in previous month
        if(i == 0 && x < startWeekDay){
            aWeek[x] = 'X';
        //if day later than current
        }else if(counter > numberOfDaysThisMonth){
            aWeek[x] = 'X';
        }else{
            aWeek[x] = counter;
            counter++;
        }
    }
    weekArray.push(aWeek)
}

/**************/



class Calendar extends Component{

    render(){
        console.log(weekArray)
        return (

        <div className="calendar-component">
            <table>
                <thead>
                    <caption>{Months[month-1]}</caption>
                    <tr>{Days.map( (day, index) => <th>{day}</th> )}</tr>
                </thead>
                <tbody>
                    {weekArray.map( (daysOfWeek, index) => <Week days={daysOfWeek}/>)}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Calendar