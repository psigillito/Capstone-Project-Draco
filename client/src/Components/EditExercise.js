import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';

let createdExercise = {};

class EditExercise extends Component {
    constructor(props){
        super(props);

        this.state = {
          name:'',
          sets:'',
          reps:'',
          weight:'',
          unit:'',
          duration:'',
          distance:'',
          distanceUnit:'',
          workoutId:'',
          exerciseName:''
        }

        this.onChange = this.onChange.bind(this);
    }

    clearState() {
    	this.setState({
    	  name:'',
        sets:'',
        reps:'',
        weight:'',
        unit:'',
        duration:'',
        distance:'',
        distanceUnit:'',
        workoutId:'',
        exerciseName:''
    	})
    }


     onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitExercise() {  
      // TODO             
    }

    deleteExercise() {
      // TODO
    }

    


    render() {

      return(
        <div>
          <div className="modal-header">
            <h5 className="modal-title">Edit Exercise</h5>
          </div>
          <div class="modal-body">
          <label for='name'><b>Select workout to edit exercises:</b></label>
          <select id="inputState" 
            name="workoutId" 
            class="form-control" 
            value={this.state.workoutId ? this.state.workoutId : ''} 
            onChange={this.onChange}
          >
            <option selected>Choose...</option>
            { this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                                                    && this.props.selectedWorkoutList.includes(exercise._id))                                          
                            .map( (workout, index) =>
                                   <option key={index} value={workout._id}>{workout.name}</option>
                            )
            
            }
          </select>
          <br/>

          {/* Bring in exercises */}
          {this.state.workoutId !== '' &&
          <div> 
            <label for='name'><b>Select exercise to edit:</b></label>
              <select id="inputState" 
              name="exerciseName" 
              class="form-control"
              value={this.state.exerciseName ? this.state.exerciseName : ''} 
              onChange={this.onChange}
            >
              <option selected>Choose...</option>
                {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId)

                	.map( (workout) => workout.exercises.map( (exercise, index) => 
                		
                			<option key={index} value={exercise.name}>{exercise.name}</option>

                		))
                }
              </select>
              <br />
                 
                  
                   {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId && workout.mode === 'Weight Training')

                  	.map( (workout) => workout.exercises.filter( (exercise) => exercise.name === this.state.exerciseName)
                  		.map((exercise) =>  
                  		<div>
                  		<label for="newExercise"><b>Update Exercise:</b></label>
                  			<h6>{exercise.name}</h6>
				             
				              <form>
				                <div class="form-row">
				                  <div class="col">
				                    <input type="text" class="form-control" name="sets" value={this.state.sets} onChange={this.onChange} placeholder={exercise.sets}/>
				                  </div>
				                  <div class="col">
				                    <input type="text" class="form-control" name="reps" value={this.state.reps} onChange={this.onChange} placeholder={exercise.reps}/>
				                  </div>
				                  <div class="col">
				                    <input type="text" class="form-control" name="weight" value={this.state.weight} onChange={this.onChange} placeholder={exercise.weight}/>
				                  </div>
				                  <div class="col">
				                   <select 
                             name="unit" 
                             class="form-control"
                             value={this.state.unit ? this.state.unit : ''} 
                             onChange={this.onChange}
                           >
				                      <option selected>...</option>
				                      <option name="unit" value="lbs">Lbs</option>
				                      <option name="unit" value="kg">Kg</option>
				                   </select>
				                  </div>
				                </div>
				              </form>
                      <br />
                       <button type="button" onClick={() => this.deleteExercise() } class="btn btn-secondary" data-dismiss="modal">Delete Exercise</button>
				            </div>
                  		)

                  		)
			
                  }


                  </div>
              }



              {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId && workout.mode === 'Running')

                  	.map( (workout) => workout.exercises.filter( (exercise) => exercise.name === this.state.exerciseName)
                  		.map((exercise) =>  
                  		<div>
                  		<div class="modal-header">
				            <h5>Edit Exercise</h5>
				          </div>
				          <h6>{exercise.name}</h6>
				           
				          <label for='duration'><b>Duration:</b></label>
				              <form>
				                <div class="form-row">
				                  <div class="col">
				                    <input type="text" class="form-control" name="distance" value={this.state.distance} onChange={this.onChange} placeholder={exercise.distance}/>
				                  </div>
				                  <div class="col">
				                   <select id="inputState" name="distanceUnit" class="form-control" placeholder={exercise.distanceUnit} onChange={this.onChange}>
				                      <option selected>...</option>
				                      <option name="distanceUnit" value="mi">Mi</option>
				                      <option name="distanceUnit" value="km">Km</option>
				                   </select>
				                  </div>
				                </div>
				              </form>
				              <br />
				              <div>
				                  
				              </div>
				            </div>
                  		)

                  		)

                  }


                  </div>

                
                <div class="modal-footer">
                  <button type="button" onClick={() => this.clearState() } class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button"  onClick={() => this.submitExercise() } class="btn btn-primary">Save changes</button>
                </div>


              </div>
      )
    }
}

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

export default connect(mapStateToProps)(EditExercise);