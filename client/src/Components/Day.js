import React, {Component} from 'react'
import DayDetail from './DayDetail'
import {currentDay} from '../data/weekData'
import { connect } from 'react-redux';
import {updateSelectedDay} from '../redux/actions'
import {updateCurrentWeekDay} from '../redux/actions'
import {updateSelectedWorkoutList} from '../redux/actions'

class Day extends Component {

    constructor(props){
        super(props);
        this.handleDaySelected = this.handleDaySelected.bind(this);
        this.state = {
            presentMonth : new Date().getMonth(),
            presentYear : new Date().getFullYear(),
        }     
    }

    handleDaySelected = (newValue) => (e) =>{
        
        let buttonDate = new Date(this.props.year, this.props.month, this.props.date);
        this.props.updateSelectedDay( this.props.date)  
        this.props.updateCurrentWeekDay(buttonDate.getDay());
        this.props.updateSelectedWorkoutList(buttonDate);
    }


    render(){

        if(this.props.date != 'X'){
            var buttonDay =  new Date(this.props.year,this.props.month,this.props.date);
            var buttonWeekDay = buttonDay.getDay();

            //get All plans associated with this day 
            var associatedTrainingPlans = this.props.trainingPlans.data.filter( (plan) => (Date.parse(plan.startDate) <= buttonDay && Date.parse(plan.endDate) >= buttonDay))
            //get all associated workouts
            var buttonWorkouts = new Array();
            for(var i = 0; i < associatedTrainingPlans.length; i++){
                buttonWorkouts = buttonWorkouts.concat(associatedTrainingPlans[i].workouts)
            }
            //get weekdays that should be highlighted. Based on workouts that are part of activites that are active during this day.  
            var highlightDays = new Array();
            for(var i = 0; i < this.props.workouts.data.length; i++){
                if(buttonWorkouts.includes(this.props.workouts.data[i]._id)){
                    highlightDays = highlightDays.concat(this.props.workouts.data[i].daysOfWeek)
                }   
            }
        }

        if(this.props.date != 'X'){            
            
                if(this.props.date == currentDay && this.state.presentYear == this.props.year && this.state.presentMonth == this.props.month){
                    return(        
                        <div>
                            <button onClick={this.handleDaySelected(true)} data-toggle="modal" data-target="#dayModal" className="dayButton currentDay">{this.props.date}</button>
                        </div>
                    )
                }else if( highlightDays.includes(buttonWeekDay)) {
                    return(
                        <div>
                            <button onClick={this.handleDaySelected(true)} data-toggle="modal" data-target="#dayModal" className="dayButton hasWorkout">{this.props.date}</button>
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
             trainingPlans:state.trainingPlans,
             }
    }

export default connect(mapStateToProps, { updateSelectedDay, updateCurrentWeekDay, updateSelectedWorkoutList} )(Day);