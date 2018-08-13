import React, {Component} from 'react'
import TrainingPlanCard from './TrainingPlanCard'
import UpdateTrainingPlan from './UpdateTrainingPlan';
import AddNewWorkout from './AddNewWorkout';
import DeleteWorkout from './DeleteWorkout';
import DeleteTrainingPlan from './DeleteTrainingPlan';
import EditWorkout from './EditWorkout';
import axios from 'axios';

class ActiveWorkoutsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            title:''
        }

        this.onChange = this.onChange.bind(this);
    }

    editTrainingPlan(plan) {
        this.setState({
            title: 'Edit Training Plan',
            name: plan.name,
            startDate: plan.startDate,
            endDate: plan.endDate,
            id: plan._id
        })
    }

    createNewTrainingPlan() {
        this.setState({
            title:'Create New Training Plan',
            name: '',
            startDate: '',
            endDate: ''
        })
    }

    createNewWorkout() {
        this.setState({
            name:'',
            mode:'',
            daysOfWeek: [],
            exercises: [],
            trainingPlan:''
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        return(
            <div>
                <div>
                    <h4>Active Training Plans:</h4>
                        <div id="accordion">
                            {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
                                <div key={index} className="card">  
                                    <button id="#a" className="btn btn-link card-header wrap-text" data-toggle="collapse" data-target= {"#collapse"+index} aria-expanded="true" aria-controls="collapseOne">
                                        <span className="wrap-text">{plan.name}</span>
                                    </button>

                                    <div id={"collapse"+index} className="collapse" aria-labelledby="a" data-parent="#accordion">
                                        <div className="card-body">
                                            <div><b>Start Date:</b></div>
                                            <div>{plan.startDate.substring(0,10)}</div>
                                            <div><b>End Date:</b></div>
                                            <div>{plan.endDate.substring(0,10)}</div>
                                            <div><b>Workouts:</b></div>
                                            {this.props.workouts.data.filter( (workout) => workout.trainingPlan === plan._id ).map((workout, index) => <div key={index}>{workout.name}</div>)}
                                            <br/> 
                                            <button onClick={() => this.editTrainingPlan(plan)} data-toggle="modal" data-target="#trainingPlan" type="button" className="btn btn-secondary btn-block">Edit Plan</button>
                                            <button onClick={() => this.setState({ name: plan.name, planId: plan._id })} data-toggle="modal" data-target="#deleteTrainingPlan" type="button" className="btn btn-secondary btn-block">Delete Plan</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <br/>
                        <button 
                            onClick={() => this.createNewTrainingPlan() } 
                            type="button" 
                            data-toggle="modal" 
                            data-target="#trainingPlan" 
                            className="btn btn-primary btn-block">
                                Create New Training Plan
                        </button>
                        <button 
                            onClick={() => this.createNewWorkout() } 
                            data-toggle="modal" 
                            data-target="#addWorkout" 
                            type="button" 
                            className="btn btn-primary btn-block">
                                Create New Workout
                        </button>
                        <button 
                            onClick={() => this.createNewWorkout() } 
                            data-toggle="modal" 
                            data-target="#editWorkout" 
                            type="button" 
                            className="btn btn-primary btn-block">
                                Edit Existing Workout
                        </button>
                        <button 
                            data-toggle="modal" 
                            data-target="#deleteWorkout" 
                            type="button" 
                            className="btn btn-primary btn-block">
                                Delete Workout
                        </button>

                </div>

        {/* EDIT & CREATE TRAINING PLANS */}
        <div className="modal" id="trainingPlan" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <UpdateTrainingPlan title={this.state.title} 
                name={this.state.name} 
                startDate={this.state.startDate} 
                endDate={this.state.endDate}
                id={this.state.id} />
              </div>
            </div>
          </div>
        </div>
        

        {/* CREATE NEW WORKOUT */}
        <div className="modal " id="editWorkout" tabIndex="-1" role="dialog">
          <div className="modal-dialog  modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <EditWorkout />
              </div>
            </div>
          </div>
        </div>

        {/* EDIT WORKOUT */}
        <div className="modal " id="addWorkout" tabIndex="-1" role="dialog">
          <div className="modal-dialog  modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <AddNewWorkout title={this.state.title} />
              </div>
            </div>
          </div>
        </div>

        {/* DELETE WORKOUT */}
        <div className="modal" id="deleteWorkout" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <DeleteWorkout />
              </div>
            </div>
          </div>
        </div>

        {/* DELETE TRAINING PLAN */}
        <div className="modal" id="deleteTrainingPlan" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <DeleteTrainingPlan name={this.state.name} id={this.state.planId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ActiveWorkoutsPanel