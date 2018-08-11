import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class EditWorkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			workoutId:'',
			daysOfWeek:[],
			name:'',
			trainingPlan:''
		}

		this.onChange = this.onChange.bind(this);
		this.handleDayChange = this.handleDayChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleDayChange(e) {
        if(this.state.daysOfWeek.includes(parseInt(e.target.value))) {
            const index = this.state.daysOfWeek.indexOf(e.target.value);
            this.state.daysOfWeek.splice(index, 1);
        } else {
            this.state.daysOfWeek.push(parseInt(e.target.value));
        }
    }

    submitWorkout() {
    	let workout = {};
    	
    	if(this.state.name !== '') {
    		workout.name = this.state.name;
    	}
    	if(this.state.trainingPlan !== '') {
    		workout.trainingPlan = this.state.trainingPlan;
    	}
    	if(this.state.daysOfWeek !== []) {
    		workout.daysOfWeek = this.state.daysOfWeek;
    	}

    	if(workout !== {}) {
    		axios.patch('/workouts/' + this.state.workoutId, workout)
    			.then( res => window.location.reload())
    			.catch(err => console.log(err));
    	} 	
    }

	render() {
		return (
			<div>
				<div className="modal-header">
		            <h5 className="modal-title">Edit Workout</h5>
		            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		              <span aria-hidden="true">&times;</span>
		            </button>
		        </div>
		        <br />
		    	{/* select workout */}
		        <label htmlFor="workout"><b>Select Workout:</b></label>
				<select id="inputState" name="workoutId" 
		        	className="form-control" 
		            value={this.state.workoutId ? this.state.workoutId : ''} 
		            onChange={this.onChange}>
		            	<option selected>Choose...</option>
	            		{this.props.workouts.data.map( (workout, index) =>
							<option key={index} value={workout._id}>{workout.name} - {workout.mode}</option>
	            		)}
		        </select>
		        <br />

		        {this.state.workoutId !== '' && this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId)
		        	.map( (workout, index) => 
		        	<div key={index}>

		        		<div class="alert alert-primary" role="alert">
						  Note! Leave any fields you do not want changed, blank, or make no selections.
						</div>
		            
		              <label htmlFor='name'><b>Workout Name:</b></label>
		              <div className="form-group">
		                <input type="text" 
			                className="form-control form-control-lg" 
			                placeholder={workout.name} 
			                name="name" 
			                value={this.state.name} 
		                    onChange={this.onChange}
		                />
		              </div>
		              <br/>
		              <label htmlFor='name'><b>Days:</b> (select which days you will do this workout)</label>
		              <div className="form-group">
		                {weekDays.map( (weekDay, index) => 
		                  <div key={index} className="form-check form-check-inline">
		                    <input className="form-check-input" 
			                    type="checkbox" 
			                    name="daysOfWeek" 
			                    onChange={this.handleDayChange} 
			                    value={index}
		                    /> 
							<label className="form-check-label" htmlFor="inlineCheckbox1">{weekDay}</label>  
		                  </div>
		                )}
		              </div>
		              <br/>
		              <label htmlFor='name'><b>Training Plan: </b>(each workout must be part of a training plan)</label>
		              <div className="form-group"> 
		                <select id="inputState" 
			                name="trainingPlan" 
			                className="form-control" 
			                onChange={this.onChange}>
			                    <option>...</option>
			                    {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
			                        <option key={index} name="trainingPlan" value={plan._id}>{plan.name}</option>
			                    )}
		                </select>
		              </div>
		        	</div>
		    	)}

		        <br />
		        <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="submit" onClick={ () => this.submitWorkout() } className="btn btn-success">Save changes</button>
                </div>
	        </div>
		)
	}

}


const mapStateToProps = (state) => {
	return { workouts: state.workouts, trainingPlans: state.trainingPlans}
}

export default connect(mapStateToProps)(EditWorkout);