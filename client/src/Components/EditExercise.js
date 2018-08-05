import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';

class EditExercise extends Component {
    constructor(props){
        super(props);

        this.state = {
          name:'',
          sets:'',
          reps:'',
          weight:'',
          unit:'lbs',
          duration:'',
          distance:'',
          distanceUnit:'mi',
          workoutId:'',
          exerciseName:'',
          editOption:'',
          currentWorkoutDays:[]
        }

        this.onChange = this.onChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
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
        exerciseName:'',
        editOption:'',
        currentWorkoutDays:[]
    	})
    }

     handleDayChange(e) {
        if(this.state.exerciseDays.includes(e.target.value)) {
            const index = this.state.exerciseDays.indexOf(e.target.value);
            this.state.exerciseDays.splice(index, 1);
        } else {
            this.state.exerciseDays.push(parseInt(e.target.value));
        }
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
        .catch(err => console.log(err))

    }

    submitExercise() {
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

    getDay(day) {
      switch(day) {
        case 0: return 'Sunday'; break;
        case 1: return 'Monday'; break;
        case 2: return 'Tuesday'; break;
        case 3: return 'Wednesday'; break;
        case 4: return 'Thursday'; break;
        case 5: return 'Friday'; break;
        case 6: return 'Saturday'; break;
      }      
    }

    render() {

      if(this.state.editOption !== 'recurringDays')
        this.state.currentWorkoutDays = [];

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
            onChange={this.onChange}>
            <option value='' selected>...</option>
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
              onChange={this.onChange}>
              <option selected>...</option>
                {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId)
                	.map( (workout) => workout.exercises.map( (exercise, index) =>   		
                			<option key={index} value={exercise.name}>{exercise.name}</option>
                		))
                }
              </select>
              <br />

            {/* day edit options */}
              {this.state.exerciseName !== '' && this.state.workoutId !== '' &&
                <div>
                  <form>
                  <div class="form-row"> 
                    <div class="alert alert-primary" role="alert">
                      Warning! This action will update the exercise for each day of this workout.
                      Select option below to edit for specific days.
                    </div>
                    <div class="col">
                      <div class="form-check">
                        <input class="form-check-input" 
                          type="radio" 
                          name="editOption" 
                          value="recurringDays"
                          onChange={this.onChange} 
                        />
                        <label class="form-check-label" for="exampleRadios1">
                          Edit for recurring days
                        </label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="radio" 
                          name="editOption" 
                          value="singleDay"
                          onChange={this.onChange}  
                        />
                        <label class="form-check-label" for="exampleRadios1">
                          Edit for today only
                        </label>
                      </div>
                    </div>
                    {this.state.editOption !== '' && 
                    <div class="col">
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="radio" 
                          name="editOption" 
                          value="default"
                          onChange={this.onChange}  
                        />
                        <label class="form-check-label" for="exampleRadios1">
                          Default
                        </label>
                      </div>
                    </div> }
                  </div>
                  </form>
                  <br />
                </div>
              }

            {/* Select recurring days to edit exercise 
              {this.state.editOption === 'recurringDays' && this.state.editOption !== '...' &&
                <div align="center">
                  {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId)
                    .map( (workout, key) => {for(let i = 0; i < workout.daysOfWeek.length; i++) 
                      { this.state.currentWorkoutDays.push(workout.daysOfWeek[i]); }})
                    }
                    <div>
                    <label for="daySelection"><b>Select Days:</b></label>
                    </div> 
                    {this.state.currentWorkoutDays.map( (day, index) =>
                      <div class="form-check form-check-inline"> 
                        <input class="form-check-input" 
                          type="checkbox" 
                          value={day} 
                        />
                        <label class="form-check-label" for="inlineCheckbox">{this.getDay(day)}</label>
                      </div>
                    )}      
                </div>
              } */}

            {/* Update exercise for current day 
              {this.state.editOption === 'singleDay' && this.state.editOption !== '...' &&
                <div align="center">
                  <p>Editing <b>{this.state.exerciseName}</b> exercise for current date:  
                  <b> {this.props.day} / {this.props.month + 1} / {this.props.year}</b></p>
                </div>
              } */}
                 
                  
            {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId && workout.mode === 'Weight Training')
                .map( (workout) => workout.exercises.filter( (exercise) => exercise.name === this.state.exerciseName)
                .map((exercise, index) =>  
                <div key={index}>
              		<label for="newExercise"><b>Update Exercise:</b></label>
		              <form>
		                <div class="form-row">
		                  <div class="col">
		                    <input type="number" 
                          class="form-control" 
                          name="sets" 
                          value={this.state.sets ? this.state.sets : ''} 
                          onChange={this.onChange} 
                          placeholder={exercise.sets}  
                        />
		                  </div>
		                  <div class="col">
		                    <input type="number" 
                          class="form-control" 
                          name="reps" 
                          value={this.state.reps ? this.state.reps : ''} 
                          onChange={this.onChange} 
                          placeholder={exercise.reps}  
                        />
		                  </div>
		                  <div class="col">
		                    <input type="number" 
                          class="form-control" 
                          name="weight" 
                          value={this.state.weight ? this.state.weight : ''} 
                          onChange={this.onChange} 
                          placeholder={exercise.weight}
                        />
		                  </div>
		                  <div class="col">
		                   <select 
                         name="unit" 
                         class="form-control"
                         value={this.state.unit ? this.state.unit : ''} 
                         onChange={this.onChange}>
		                      <option name="unit" value="lbs">Lbs</option>
		                      <option name="unit" value="kg">Kg</option>
		                   </select>
		                  </div>
		                </div>
		              </form>
                  <br />
                   <button type="button" onClick={() => this.deleteExercise() } class="btn btn-secondary">Delete Exercise</button>
		            </div>
                ))}
              </div>
              }

              {this.props.workouts.data.filter( (workout) => workout._id === this.state.workoutId && workout.mode === 'Running')
                .map( (workout) => workout.exercises.filter( (exercise) => exercise.name === this.state.exerciseName)
                .map((exercise, index) =>  
                  <div key={index}>
                  	<label for="newExercise"><b>Update Exercise:</b></label>
  				            <form>
                        <label for='duration'><b>Duration:</b></label>
  				              <div class="form-row">
  				                <div class="col">
  				                  <input type="number" 
                              class="form-control" 
                              name="distance" 
                              value={this.state.distance ? this.state.distance : ''} 
                              onChange={this.onChange} 
                              placeholder={exercise.distance}
                            />
  				                </div>
  				                <div class="col">
  				                  <select name="distanceUnit" 
                              class="form-control" 
                              placeholder={exercise.distanceUnit} 
                              onChange={this.onChange}>
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
              )}
          </div>

          <div class="modal-footer">
            <button type="button" onClick={() => this.clearState() } class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button"  onClick={() => this.submitExercise() } class="btn  btn-success">Save changes</button>
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