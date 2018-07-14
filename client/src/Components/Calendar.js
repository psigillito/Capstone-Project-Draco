import React, {Component} from 'react'
import Day from './Day'
import Week from './Week'

const Days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];



class Calendar extends Component{

    render(){
        return (
            <div className="calendar-component">
                <table>
                    <thead>
                        <tr>{Days.map( (day, index) => <th className ="calendar-header">{day}</th> )}</tr>
                    </thead>
                    <tbody>
                        {this.props.weekArray.map( (daysOfWeek, index) => <Week days={daysOfWeek}/>)}
                    </tbody>
                </table>


            </div>
        )
    }
}

export default Calendar