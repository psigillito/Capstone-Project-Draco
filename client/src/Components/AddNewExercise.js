import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

let createdExercise = {};
let allExercises = [];

class AddNewExercise extends Component {
    constructor(props){
        super(props);

        this.state = {
          name:'',
          sets:'',
          mode: '',
          reps:'',
          weight:'',
          unit:'',
          duration:'',
          distance:'',
          distanceUnit:'',
          addExercise: false
        }

        this.onChange = this.onChange.bind(this);
    }

    addExercise() {
        createdExercise = {};
        if(this.state.addExercise === false) {
            this.setState({
                addExercise: true,
                exerciseName:'',
                workoutId:'',
                mode:'',
                sets:'',
                reps:'',
                weight:'',
                unit:'',
                duration:'',
                distance:'',
                distanceUnit:''
            })
        } 
    }

     onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitExercise() { 
        createdExercise['name'] = this.state.exerciseName;
        createdExercise['sets'] = this.state.sets;
        createdExercise['reps'] = this.state.reps;
        createdExercise['weight'] = this.state.weight;
        createdExercise['unit'] = this.state.unit;
        createdExercise['distanceUnit'] = this.state.distanceUnit;
        createdExercise['distance'] = this.state.distance;
        
        console.log('New Exercise: ' + createdExercise);

        axios.get('/workouts/' + this.state.workoutId)
            .then(res => {
                if(res.data.mode != this.state.mode) {
                    // DO NOT KEEP THIS ALERT
                    alert('Cannot add ' + this.state.mode + ' exercise to ' + res.data[0].mode + ' workout.');
                    window.location.reload();
                } else {
                    axios.patch('/workouts/' + this.state.workoutId, {
                        exercise: createdExercise
                    })
                        .then(res => {console.log(res); window.location.reload();})
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err)); 

    }

     saveExercise() {
        createdExercise['name'] = this.state.name;
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


    render() {

      return(
        <div>
        

          {/* add exercises to existing workout */}
                <div className="modal-body">
                <label htmlFor='name'><b>Select workout to add to:</b></label>
                <select id="inputState" name="workoutId" className="form-control" onChange={this.onChange}>
                  <option selected>Choose...</option>
                  { this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                                                          && this.props.selectedWorkoutList.includes(exercise._id))                                          
                                  .map( (workout, index) =>
                                         <option key={index} value={workout._id}>{workout.name}</option>
                                  )
                  
                         }
                  </select>
                  <br/>

               <label htmlFor='mode'><b>Mode:</b></label>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" 
                      type="radio" 
                      name="mode" 
                      id="weightTraining" 
                      value='Weight Training'
                      onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">Weight Training</label>
                  </div>

                  <div className="form-check form-check-inline">
                      <input className="form-check-input" 
                      type="radio" 
                      name="mode" 
                      id="running" 
                      value="Running"
                      onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">Running</label>
                  </div>
                </div>
                 
              {/* display new exercise form */}

              {/* Exercises - Weight training */}
            {this.state.mode === 'Weight Training' && this.state.mode != '' &&
            <div>
              <div className="modal-header">
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
                <div className="form-row">
                  <div className="col">
                    <input type="text" className="form-control" name="sets" value={this.state.sets} onChange={this.onChange} placeholder="Sets"/>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" name="reps" value={this.state.reps} onChange={this.onChange} placeholder="Reps"/>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" name="weight" value={this.state.weight} onChange={this.onChange} placeholder="Weight"/>
                  </div>
                  <div className="col">
                   <select id="inputState" name="unit" className="form-control" onChange={this.onChange}>
                      <option selected>...</option>
                      <option name="unit" value="lbs">Lbs</option>
                      <option name="unit" value="kg">Kg</option>
                   </select>
                  </div>
                </div>
              </form>
              <br />
            <div>
                
            </div>
            </div>
          }

        {/* Exercises - Running */}
          {this.state.mode === 'Running' && this.state.mode != '' && 
          <div>
          <div className="modal-header">
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
          <label htmlFor='duration'><b>Duration:</b></label>
              <form>
                <div className="form-row">
                  <div className="col">
                    <input type="text" className="form-control" name="distance" value={this.state.distance} onChange={this.onChange} placeholder="Distance"/>
                  </div>
                  <div className="col">
                   <select id="inputState" name="distanceUnit" className="form-control" onChange={this.onChange}>
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
        }       
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" data-toggle="modal" data-target="#addExercise" onClick={() => this.submitExercise() } className="btn btn-primary">Save changes</button>
                </div>
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

export default connect(mapStateToProps)(AddNewExercise);