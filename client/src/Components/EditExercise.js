import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';

class EditExercise extends Component {
    constructor(props){
        super(props);

        this.state = {
          sets:'',
          reps:'',
          weight:'',
          unit:'lbs',
          distance:'',
          distanceUnit:'mi',
          workoutId:'',
          exerciseName:''
        }

        this.onChange = this.onChange.bind(this);
    }

    clearState() {
    	this.setState({
        sets:'',
        reps:'',
        weight:'',
        unit:'lbs',
        distance:'',
        distanceUnit:'mi',
        workoutId:'',
        exerciseName:''
    	})
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    saveExercise() {
      let newExercise = {};

      if(this.state.distance !== '') {
        newExercise = {
          name: this.state.exerciseName,
          distance: this.state.distance,
          distanceUnit: this.state.distanceUnit
        }
      } else {
          newExercise = {
            name: this.state.exerciseName,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight,
            unit: this.state.unit,
        }
      }

      axios.patch('/workouts/' + this.state.workoutId, {
        exercise: newExercise
      })
        .then(res => {window.location.reload();})
        .catch(err => console.log(err));

    }

    submitExercise(e) {
      e.preventDefault();

      axios.patch('/workouts/exercises', {
        id: this.state.workoutId,
        name: this.state.exerciseName,
        edit: true
      })
        .then(res => this.saveExercise())
        .catch(err => console.log(err)); 
    }

    deleteExercise() {
      axios.patch('/workouts/exercises', {
        id: this.state.workoutId,
        name: this.state.exerciseName,
        edit: true
      })
        .then( () => { window.location.reload(); })
        .catch(err => console.log(err));
    }

    render() {

      return(
        <div>
          <div className="modal-header">
            <h5 className="modal-title">Edit Exercise</h5>
            <button type="button" onClick={() => this.clearState() } className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <label for='name'><b>Select workout to edit exercises:</b></label>
          <select id="inputState" 
            name="workoutId" 
            className="form-control" 
            value={this.state.workoutId ? this.state.workoutId : ''} 
            onChange={this.onChange}>
            <option value={''}>...</option>
            { this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                && this.props.selectedWorkoutList.includes(exercise._id))                                          
                .map( (workout, index) =>
                  <option key={index} value={workout._id}>{workout.name} - {workout.mode}</option>
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
              className="form-control"
              value={this.state.exerciseName ? this.state.exerciseName : ''} 
              onChange={this.onChange}>
              <option value={''}>...</option>
                {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId)
                	.map( (workout) => workout.exercises.map( (exercise, index) =>   		
                			<option key={index} value={exercise.name}>{exercise.name}</option>
                		))
                }
              </select>
              <br />

              {this.state.exerciseName !== '' && this.state.workoutId !== '' &&
                <div>
                  <div class="form-row"> 
                    <div class="alert alert-primary" role="alert">
                      Note! This action will update the exercise for each day of this workout.
                    </div>  
                  </div>
                </div>
              }      
                  
            {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId && workout.mode === 'Weight Training')
                .map( (workout) => workout.exercises.filter( (exercise) => exercise.name === this.state.exerciseName)
                .map((exercise, index) =>  
                <div key={index}>
              		<label for="newExercise"><b>Update Exercise:</b></label>
		              <form onSubmit={this.submitExercise.bind(this)}>
		                <div className="form-row">

		                  <div className="col">
		                    <input type="number" 
                          className="form-control" 
                          name="sets" 
                          value={this.state.sets ? this.state.sets : ''} 
                          onChange={this.onChange} 
                          placeholder={exercise.sets}
                          required  
                        />
                        <small id="setsHelpBlock" className="form-text text-muted">
                          Sets
                        </small>
		                  </div>

		                  <div className="col">
		                    <input type="number" 
                          className="form-control" 
                          name="reps" 
                          value={this.state.reps ? this.state.reps : ''} 
                          onChange={this.onChange} 
                          placeholder={exercise.reps}
                          required  
                        />
                        <small id="repsHelpBlock" className="form-text text-muted">
                          Reps
                        </small>
		                  </div>

		                  <div className="col">
		                    <input type="number" 
                          className="form-control" 
                          name="weight" 
                          value={this.state.weight ? this.state.weight : ''} 
                          onChange={this.onChange} 
                          placeholder={exercise.weight}
                        />
                        <small id="weightHelpBlock" className="form-text text-muted">
                          Weight
                        </small>
		                  </div>

		                  <div className="col">
		                   <select 
                         name="unit" 
                         className="form-control"
                         value={this.state.unit ? this.state.unit : ''} 
                         onChange={this.onChange}>
		                      <option name="unit" value="lbs">Lbs</option>
		                      <option name="unit" value="kg">Kg</option>
		                   </select>
                       <small id="unitHelpBlock" className="form-text text-muted">
                          Unit
                       </small>
		                  </div>

		                </div>

                    <br />
                    <button type="button" 
                      onClick={() => this.deleteExercise() } 
                      className="btn btn-danger btn-sm">Delete '{this.state.exerciseName}' Exercise
                    </button>
                    <br /><br />
                    <div className="modal-footer">
                      <button type="button" onClick={() => this.clearState() } className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                      <button type="submit" className="btn btn-success">Save changes</button>
                    </div>
		              </form>    
		            </div>
                ))}
              </div>
              }

              {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId && workout.mode === 'Running')
                .map( (workout) => workout.exercises.filter( (exercise) => exercise.name === this.state.exerciseName)
                .map((exercise, index) =>  
                  <div key={index}>
                  	<label for="newExercise"><b>Update Exercise:</b></label>
  				            <form onSubmit={this.submitExercise.bind(this)}>
  				              <div class="form-row">
  				                <div class="col">
  				                  <input type="number" 
                              class="form-control" 
                              name="distance" 
                              value={this.state.distance ? this.state.distance : ''} 
                              onChange={this.onChange} 
                              placeholder={exercise.distance}
                              required
                            />
                            <small id="distanceHelpBlock" className="form-text text-muted">
                              Distance
                            </small>
  				                </div>
  				                <div class="col">
  				                  <select name="distanceUnit" 
                              class="form-control" 
                              placeholder={exercise.distanceUnit} 
                              onChange={this.onChange}>
  				                    <option name="distanceUnit" value="mi">Mi</option>
  				                    <option name="distanceUnit" value="km">Km</option>
  				                  </select>
                            <small id="distanceUnitHelpBlock" className="form-text text-muted">
                              Unit
                            </small>
  				                </div>
  				              </div>
                        <br />
                        <button type="button" 
                         onClick={() => this.deleteExercise() } 
                         className="btn btn-danger btn-sm">Delete '{this.state.exerciseName}' Exercise
                        </button>
                        <br /><br />
                        <div className="modal-footer">
                          <button type="button" onClick={() => this.clearState() } className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button type="submit" className="btn btn-success">Save changes</button>
                        </div>
  				            </form>
  				          <div>          
  				        </div>
  				      </div>
                )
              )}
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