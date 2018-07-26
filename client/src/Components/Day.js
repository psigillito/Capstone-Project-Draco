import React, {Component} from 'react'
import DayDetail from './DayDetail'
import {currentDay} from '../data/weekData'
import { connect } from 'react-redux';
import {updateSelectedDay} from '../redux/actions'
import {updateCurrentWeekDay} from '../redux/actions'
import {updateSelectedWorkoutList} from '../redux/actions'
import store from '../store';

class Day extends Component {

    constructor(props){
        super(props);
        this.handleDaySelected = this.handleDaySelected.bind(this);
        this.state = {
            presentMonth : new Date().getMonth(),
            presentYear : new Date().getFullYear()
        }     
    }

    handleDaySelected = (newValue) => (e) =>{
        this.props.updateSelectedDay( this.props.date)
        
        var newWeekDay = new Date(this.props.year, this.props.month, this.props.date).getDay();
        this.props.updateCurrentWeekDay(newWeekDay);

        
        var currentDate = new Date(this.props.year,this.props.month,this.props.date);

        store.dispatch(updateSelectedWorkoutList(currentDate));

    }


    render(){
        if(this.props.date != 'X'){            
            
                if(this.props.date == currentDay && this.state.presentYear == this.props.year && this.state.presentMonth == this.props.month){
                    return(        
                    <div>
                        <button onClick={this.handleDaySelected(true)} data-toggle="modal" data-target="#dayModal" className="dayButton currentDay">{this.props.date}</button>
                    </div>
                    )
                }
                else{
                    return(
                    <div>
                        <button onClick={this.handleDaySelected(true)} data-toggle="modal" data-target="#dayModal" className="dayButton ">{this.props.date}</button>
                    </div>
                    )
                }
            }
            else
            {
                return(
                    <span></span>
                )
            }
    }   
}

const mapStateToProps = function(state) {
    return { currentDay: state.currentDay, 
             month:state.month, 
             year:state.year,
             day: state.day,
             weekDay: state.weekDay,  
             workouts:state.workouts,
             trainingPlans:state.trainingPlans}
  }

export default connect(mapStateToProps, { updateSelectedDay, updateCurrentWeekDay, updateSelectedWorkoutList} )(Day);