import React, {Component} from 'react'
import store from '../store';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';
import AddNewExercise from './AddNewExercise';
import AddNewWorkout from './AddNewWorkout';
import axios from 'axios';

let allExercises = [];
let createdExercise = {};
let exerciseDays = [];

class DayDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
            visible: this.props.dayVisible,
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value);
    }

    render(){

        var workoutsCount = this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) && this.props.selectedWorkoutList.includes(exercise._id)).length;

        if(workoutsCount){
            return(

                <div>
                    {
                        <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title"> {this.props.day}/{this.props.month+1}/{this.props.year}</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="modal-body">
                                            <h4>Weight Training Workouts:</h4>
                                            {
                                            this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                                                                                        && this.props.selectedWorkoutList.includes(exercise._id)
                                                                                        && exercise.mode =='Weight Training')
                                            .map( (workout, index) =>
                                                    <div key={index}>

                                                        <h5>{workout.name}</h5>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Sets</th>
                                                                    <th>Reps</th>
                                                                    <th>Weight</th>
                                                                    <th>Unit</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <WorkOutDetail type="Weight Training" workout={workout}/>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                            )}
                                            <br/>
                                            <h4>Cardio Workouts:</h4>
                                            {
                                            this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                                                                                        && this.props.selectedWorkoutList.includes(exercise._id)
                                                                                        && exercise.mode =='Running')
                                            .map( (workout, index) =>
                                                    <div key={index}>

                                                        <h5>{workout.name}</h5>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Distance</th>
                                                                    <th>Unit</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <WorkOutDetail type="Running" workout={workout}/>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                            )}

                                        </div>
                                    <div className="modal-footer">
                                        <button type="button" data-toggle="modal" data-target="#addExercise" className="btn btn-secondary btn-sm">Add Exercise</button>
                                        <button type="button" data-toggle="modal" data-target="#addWorkout" className="btn btn-secondary btn-sm">Add Workout</button>
                                    </div>

                                    

                                    
                                </div>
                            </div>
                            {/* add exercise */}
                            <div class="modal" id="addExercise" tabindex="-1" role="dialog">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-body">
                                    <AddNewExercise />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* add workout */}
                            <div class="modal" id="addWorkout" tabindex="-1" role="dialog">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-body">
                                    <AddNewWorkout title={this.state.title} />
                                  </div>
                                </div>
                              </div>
                            </div>  

                        </div>


                    }
                    </div>
                )
        } else{
            return(

                <div>
                    {
                        <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title"> {this.props.day}/{this.props.month+1}/{this.props.year}</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="modal-body">                                   
                                            No Exercises Today
                                        </div>
                                    <div className="modal-footer">
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
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

export default connect(mapStateToProps)(DayDetail);
