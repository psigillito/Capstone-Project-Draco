import React, {Component} from 'react'
import Day from './Day'
import Week from './Week'
import DayDetail from './DayDetail'
import axios from 'axios';


const Days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];



class Calendar extends Component{
    constructor(props){
        super(props);


    }

    render(){

        return (
            <div className="calendar-component">
                <table>
                    <thead>
                        <tr>{Days.map( (day, index) => <th key={index} className ="calendar-header">{day}</th> )}</tr>
                    </thead>
                    <tbody>
                        {this.props.weekArray.map( (daysOfWeek, index) => <Week key={index} updateDayVisible ={this.props.updateDayVisible} days={daysOfWeek}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Calendar