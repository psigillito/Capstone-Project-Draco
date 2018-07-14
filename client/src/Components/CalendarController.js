
import React, {Component} from 'react'


class CalendarController extends Component {
    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    
    handleDateChange = (param)=> (e) =>{
        this.props.updateCurrentYear(param);
        this.props.updateDays( this.props.month, param)
    }

    render(){
        return(
        <ul className="calendar-controller">
            <li>
                <button onClick={this.handleDateChange(2016)} > 2016 </button>
            </li>
            <li>
                <button onClick={this.handleDateChange(2017)}> 2017 </button>
            </li>
            <li>
                <button onClick={this.handleDateChange(2018)} > 2018 </button>
            </li>
        </ul>
        )
    }
}

export default CalendarController