
import React, {Component} from 'react'


const placeHolderYears = [2016, 2017, 2018, 2019, 2020, 2021];

class CalendarController extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            months: ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September','October',
                     'November', 'December']
        }
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleResetDate = this.handleResetDate.bind(this);
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

    handleResetDate = () => (e) =>
    {
      var dt = new Date();
      var currentMonth = dt.getMonth();
      var currentYear = dt.getFullYear();
      this.props.updateCurrentYear(currentYear);
      this.props.updateMonth(currentMonth);
      this.props.updateStatistics(currentMonth, currentYear)
    }

    render(){
        var dt = new Date();
        var currentMonth = dt.getMonth();
        var currentYear = dt.getFullYear();
        const months = this.state.months;
        return(
                <div>
                      <ul className="triple-column">
                          {
                            placeHolderYears.map( (item, index) => 
                              {
                                if(item == this.props.year){
                                  return <li  className="selected-calendar-controller" onClick= {this.handleYearChange(item)}>{item}</li>                   
                                }else{
                                  return <li  onClick= {this.handleYearChange(item)}>{item}</li>   
                                }
                              
                              })
                          }
                          {
                            months.map( (item, index) => 
                            {
                              if(index == this.props.month){
                                return <li className="selected-calendar-controller" key={index} onClick={this.handleMonthChange(index)}>{item}</li>
                              }else{
                                return <li key={index} onClick={this.handleMonthChange(index)}>{item}</li>
                              }
                            }) 
                          }
                      </ul>
                      <ul>
                        <li onClick={this.handleResetDate()}>Reset Date</li>
                      </ul>
                </div>       
        )
    }
}

export default CalendarController