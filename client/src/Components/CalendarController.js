
import React, {Component} from 'react'

class CalendarController extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            months: ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September','October',
                     'November', 'December']
        }
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    handleMonthChange = (month)=> (e) =>{
        this.props.updateDays( month, this.props.year);
        this.props.updateMonth(month);
        this.props.updateStatistics(month, this.props.year)
    }

    handleYearChange = (year) => (e) => {
        this.props.updateCurrentYear(year);
        this.props.updateDays( this.props.month, year);
        this.props.updateStatistics(this.props.month, year)
    }

    render(){
        const months = this.state.months;
        return(
                <div>
                      <ul className="triple-column">
                          <li  onClick={this.handleYearChange(2016)}>2016</li>
                          <li  onClick={this.handleYearChange(2017)}>2017</li>
                          <li  onClick={this.handleYearChange(2018)}>2018</li>
                          <li  onClick={this.handleYearChange(2019)}>2019</li>
                          <li  onClick={this.handleYearChange(2020)}>2020</li>
                          <li  onClick={this.handleYearChange(2020)}>2021</li>
                          {months.map( (item, index) => (<li key={index} onClick={this.handleMonthChange(index)}>{item}</li>)) }
                      </ul>
                </div>       
        )
    }
}

export default CalendarController