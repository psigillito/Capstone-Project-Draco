
import React, {Component} from 'react'
import DropDown from './DropDown'

class CalendarController extends Component {
    constructor(props) {
        super(props);
        //this.handleDateChange = this.handleDateChange.bind(this);
        //this.toggleMenu = this.toggleMenu.bind(this);

    }

 
    

    render(){
        return(
        <ul className="calendar-controller">
            <li>
                <DropDown year='2016' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/> 
            </li>
            <li>
                <DropDown year='2017' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/> 
            </li>
            <li>
                <DropDown year='2018' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/> 
            </li>
        </ul>
        )
    }
}

export default CalendarController