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

        return(

            <div>
                {
                    <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title"> {this.props.day}/{this.props.month}/{this.props.year}</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <div className="modal-body">                                   
                                        {this.props.workouts.data.length > 0 && 
                                        this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) && this.props.selectedWorkoutList.includes(exercise.name)  )
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
                                                            <WorkOutDetail workout={workout}/>
                                                        </tbody>
                                                    </table>
                                                </div>
                                        )}
                                    </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
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
