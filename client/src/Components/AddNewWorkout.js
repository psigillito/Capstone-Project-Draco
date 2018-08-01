import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AddNewExercise from './AddNewExercise';

let allExercises = [];
let exerciseDays = [];
let createdExercise = {};

class AddNewWorkout extends Component {
    constructor(props){
        super(props);

        this.state = {
          name: '',
          exerciseName:'',
          mode: '',
          exercises: [],
          daysOfWeek: [], 
          trainingPlan: '',
          addExercise: false
        }

        this.onChange = this.onChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    saveExercise() {
        createdExercise['name'] = this.state.exerciseName;
        createdExercise['sets'] = this.state.sets;
        createdExercise['reps'] = this.state.reps;
        createdExercise['weight'] = this.state.weight;
        createdExercise['unit'] = this.state.unit;
        createdExercise['distanceUnit'] = this.state.distanceUnit;
        createdExercise['distance'] = this.state.distance;
        allExercises.push(createdExercise);
        createdExercise = {};
        console.log(allExercises);

        this.setState({
          exerciseName:'',
          sets:'',
          reps:'',
          weight:'',
          unit:'',
          duration:'',
          distance:'',
          distanceUnit:''
        })
    }

    submitWorkout() {
        const newWorkout = {
            name: this.state.name,
            mode: this.state.mode,
            exercises: allExercises,
            daysOfWeek: exerciseDays,
            trainingPlan: this.state.trainingPlan,
        }
        console.log(newWorkout);

        axios.post('/workouts', newWorkout)
            .then(res => {
                 axios.patch('/trainingPlans', {
                    id: this.state.trainingPlan,
                    workoutId: res.data._id
                },
                this.setState({
                  workoutId: res.data._id
                }))
                    .then(res => {console.log(res); 
                      window.location.reload();
                    })
                    .catch(err => console.log(err));
                })
            .catch(err => console.log(err));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDayChange(e) {
        if(exerciseDays.includes(e.target.value)) {
            const index = exerciseDays.indexOf(e.target.value);
            exerciseDays.splice(index, 1);
        } else {
            exerciseDays.push(parseInt(e.target.value));
        }
    }

    render() {
      return(
        <div>
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create New Workout</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">

            <label for='name'><b>Name:</b></label>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control form-control-lg"
                placeholder="Workout Name" 
                name="name" 
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <label for='mode'><b>Mode:</b></label>
            <div className="form-group">
              <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" 
                  name="mode" 
                  id="weightTraining" 
                  value='Weight Training'
                  onChange={this.onChange}
                  />
                  <label className="form-check-label" for="inlineRadio1">Weight Training</label>
              </div>

              <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" 
                  name="mode" 
                  id="running" 
                  value="Running"
                  onChange={this.onChange}
                  />
                  <label className="form-check-label" for="inlineRadio2">Running</label>
              </div>
            </div>

            <label for='name'><b>Days Of Week:</b></label>
            <div className="form-group">
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='0'/>
                <label className="form-check-label" for="inlineCheckbox1">Sunday</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='1'/>
                <label className="form-check-label" for="inlineCheckbox2">Monday</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='2'/>
                <label className="form-check-label" for="inlineCheckbox1">Tuesday</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='3'/>
                <label className="form-check-label" for="inlineCheckbox2">Wednesday</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='4'/>
                <label className="form-check-label" for="inlineCheckbox1">Thursday</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='5'/>
                <label className="form-check-label" for="inlineCheckbox2">Friday</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value='6'/>
                <label className="form-check-label" for="inlineCheckbox1">Saturday</label>
              </div>   
            </div>

            <label for='name'><b>Training Plan:</b></label>
            <div className="form-group">
              <select id="inputState" name="trainingPlan" class="form-control" onChange={this.onChange}>
                  <option selected>Choose...</option>
                  {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
                      <option key={index} name="trainingPlan" value={plan._id}>{plan.name}</option>
                  )}
              </select>
            </div>

          {/* Add exercise mode alert */}
          {this.state.mode === '' && 
            <div>
              <div class="alert alert-primary" role="alert">
                You must select a workout mode to add exercises!
              </div>
            </div>
          }

           
            {/* Exercises - Weight training */}
            {this.state.mode === 'Weight Training' && this.state.mode != '' &&
            <div>
              <div class="modal-header">
                <h5>Add Exercises</h5>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control form-control-lg"
                  placeholder="Exercise Name" 
                  name="exerciseName" 
                  value={this.state.exerciseName}
                  onChange={this.onChange}
                />
              </div>
              <form>
                <div class="form-row">
                  <div class="col">
                    <input type="text" class="form-control" name="sets" value={this.state.sets} onChange={this.onChange} placeholder="Sets"/>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" name="reps" value={this.state.reps} onChange={this.onChange} placeholder="Reps"/>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" name="weight" value={this.state.weight} onChange={this.onChange} placeholder="Weight"/>
                  </div>
                  <div class="col">
                   <select id="inputState" name="unit" class="form-control" onChange={this.onChange}>
                      <option selected>...</option>
                      <option name="unit" value="lbs">Lbs</option>
                      <option name="unit" value="kg">Kg</option>
                   </select>
                  </div>
                </div>
              </form>
              <br />
            <div>
                <button type="button" onClick={() => this.saveExercise()} class="btn btn-primary btn-block">
                  Save Current Exercise To Workout
                </button>
            </div>
            </div>
          }

        {/* Exercises - Running */}
          {this.state.mode === 'Running' && this.state.mode != '' && 
          <div>
          <div class="modal-header">
            <h5>Add Exercises</h5>
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control form-control-lg"
              placeholder="Exercise Name" 
              name="exerciseName" 
              value={this.state.exerciseName}
              onChange={this.onChange}
            />
            </div>
          <label for='duration'><b>Duration:</b></label>
              <form>
                <div class="form-row">
                  <div class="col">
                    <input type="text" class="form-control" name="distance" value={this.state.distance} onChange={this.onChange} placeholder="Distance"/>
                  </div>
                  <div class="col">
                   <select id="inputState" name="distanceUnit" class="form-control" onChange={this.onChange}>
                      <option selected>...</option>
                      <option name="distanceUnit" value="mi">Mi</option>
                      <option name="distanceUnit" value="km">Km</option>
                   </select>
                  </div>
                </div>
              </form>
              <br />
              <div>
                  <button type="button" onClick={() => this.saveExercise()} class="btn btn-primary btn-block">
                    Save Current Exercise To Workout
                  </button>
              </div>
          </div>
        }       

      </div>

          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" data-target="#addWorkout">
                Close
              </button>
              <button type="button" onClick={() => this.submitWorkout()} data-toggle="modal" data-target="#addExercise" class="btn btn-primary">
                Save changes
              </button>
          </div>

          

          

      </div>

      )
    }
}

const mapStateToProps = function(state) {
    return {  trainingPlans:state.trainingPlans }
  }

export default connect(mapStateToProps)(AddNewWorkout);