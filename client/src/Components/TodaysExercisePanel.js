import React, {Component} from 'react'
import store from '../store';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';
import {currentDay} from '../data/weekData'

class TodaysExercisePanel extends Component {

    constructor(props){
        super(props);
  
    }

    render(){

        var d = new Date();
        var n = d.getDay();

        var TodayTrainingPlans = store.getState().trainingPlans.data.filter( (plan) => Date.parse(plan.startDate) <= Date.parse(d) 
                                                                                     && Date.parse(plan.endDate) >= Date.parse(d));
        var newWorkoutList = [];
        for(var i = 0; i < TodayTrainingPlans.length; i++){
                newWorkoutList = newWorkoutList.concat(TodayTrainingPlans[i].workouts)
        }



        if(this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(n)  
                                            && newWorkoutList.includes(exercise.name) ).length){
            return(
                
                <div>
                    <h2 className="display-4 mb-4"  >Today's Workouts:</h2>
                    <h4>Weight Training Workouts:</h4>
                        {
                            this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(n) 
                                                                        && newWorkoutList.includes(exercise.name)
                                                                        && exercise.mode =='Weight Training').map( (workout, index) =>
                                <div key={index}>
                                    <h5>{workout.name}</h5>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <WorkOutDetail type="Weight Training" workout={workout}/>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    <br/>
                    <h4>Cardio Workouts:</h4>
                        {
                            this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(n) 
                                                                        && newWorkoutList.includes(exercise.name)
                                                                        && exercise.mode =='Running').map( (workout, index) =>
                                <div key={index}>
                                    <h5>{workout.name}</h5>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Distance</th>
                                                <th>Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <WorkOutDetail type="Running" workout={workout}/>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                </div>
            )
        }else{
            return(
                <div>
                    <h2 className="display-4 mb-4"  >Today's Workouts:</h2>
                    No Exercises Today...Take a Rest.
                </div>
            )
        }
    }
}

//this relies so much on state it can be loaded in directly to the component 
const mapStateToProps = function(state) {
    return { day: state.day,
             weekDay: state.weekDay, 
             month:state.month, 
             year:state.year, 
             workouts:state.workouts,
             trainingPlans:state.trainingPlans,
             selectedWorkoutList:state.selectedWorkoutList

            }
  }

export default connect(mapStateToProps)(TodaysExercisePanel);