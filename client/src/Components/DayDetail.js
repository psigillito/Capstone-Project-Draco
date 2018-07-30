import React, {Component} from 'react'
import store from '../store';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';


class DayDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
            visible: this.props.dayVisible
        }
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
                                                                    <th>Duration</th>
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
                                        <button type="button" className="btn btn-secondary btn-sm">New Exercise</button>
                                        <button type="button" className="btn btn-secondary btn-sm">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        }else{
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
