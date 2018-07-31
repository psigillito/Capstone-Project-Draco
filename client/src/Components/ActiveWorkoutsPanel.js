import React, {Component} from 'react'
import TrainingPlanCard from './TrainingPlanCard'
import UpdateTrainingPlan from './UpdateTrainingPlan';
import AddNewWorkout from './AddNewWorkout';
import axios from 'axios';

let allExercises = [];
let createdExercise = {};
let exerciseDays = [];

class ActiveWorkoutsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
           addExercise: false
        };

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
                                    <button id="#a" className="btn btn-link card-header" data-toggle="collapse" data-target= {"#collapse"+index} aria-expanded="true" aria-controls="collapseOne">
                                        {plan.name}
                                    </button>

                                    <div id={"collapse"+index} className="collapse" aria-labelledby="a" data-parent="#accordion">
                                        <div className="card-body">
                                            <div><b>Start Date:</b></div>
                                            <div>{plan.startDate}</div>
                                            <div><b>End Date:</b></div>
                                            <div>{plan.endDate}</div>
                                            <div><b>Workouts:</b></div>
                                            {this.props.workouts.data.filter( (workout) => workout.trainingPlan === plan._id ).map((workout) => <div>{workout.name}</div>)}
                                            <br/> 
                                            <button onClick={() => this.editTrainingPlan(plan)} data-toggle="modal" data-target="#trainingPlan" type="button" className="btn btn-secondary btn-block">Edit Plan</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <br/>
                        <button onClick={() => this.createNewTrainingPlan() } type="button" data-toggle="modal" data-target="#trainingPlan" className="btn btn-primary btn-block">Create New Training Plan</button>
                        <button onClick={() => this.createNewWorkout() } data-toggle="modal" data-target="#addWorkout" type="button" className="btn btn-primary btn-block">Create New Workout</button>
                </div>

        {/* EDIT & CREATE TRAINING PLANS */}

        <div class="modal" id="trainingPlan" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
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

        )
    }
}

export default ActiveWorkoutsPanel