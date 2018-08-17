import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AddNewExercise extends Component {
    constructor(props){
        super(props);

        this.state = {
          exerciseName:'',
          sets:'',
          mode: '',
          reps:'',
          weight:'',
          unit:'lbs',
          distance:'',
          distanceUnit:'mi',
          workoutId:'',
          errors: []
        }

        this.onChange = this.onChange.bind(this);
    }

     onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    clearState() {
      this.setState({
        exerciseName:'',
        sets:'',
        mode: '',
        reps:'',
        weight:'',
        unit:'lbs',
        distance:'',
        distanceUnit:'mi',
        workoutId:'',
        errors: []
      })
    }

    validateInput(){

      let errorsList = []

      if(this.refs.distance && this.refs.distance.value < 0){
        errorsList.push("Distance Cannot Be Negative");
      }

      if(this.refs.weight && this.refs.weight.value < 0){
        errorsList.push("Weight Cannot Be Negative");
      }

      if(this.refs.reps && this.refs.reps.value < 0){
        errorsList.push("Reps Cannot Be Negative");
      }

      if(this.refs.sets && this.refs.sets.value < 0){
        errorsList.push("Sets Cannot Be Negative");
      }

      var validationSummary = this.refs.validationSummary; 
      validationSummary.innerHTML = '';

      for(var i = 0; i < errorsList.length; i++){
        var message = document.createElement("div");
        message.className = "alert alert-danger";        
        var node = document.createTextNode(errorsList[i]);
        message.appendChild(node);
        validationSummary.appendChild(message);    
      }
            
      return (errorsList.length < 1);
    }

    submitExercise(e) {
      e.preventDefault();

      let errorsList = [];

      var validationSummary = this.refs.validationSummary; 
      validationSummary.innerHTML = '';

      if(this.validateInput()) {

        let createdExercise = {};

        if(this.state.mode === 'Weight Training') {
          createdExercise['name'] = this.state.exerciseName;
          createdExercise['sets'] = this.state.sets;
          createdExercise['reps'] = this.state.reps;
          createdExercise['weight'] = this.state.weight;
          createdExercise['unit'] = this.state.unit;
        } else {
          createdExercise['name'] = this.state.exerciseName;
          if(this.state.mode === 'Swimming') {
            createdExercise['distanceUnit'] = 'M';
          } else {
            createdExercise['distanceUnit'] = this.state.distanceUnit;
          } 
          createdExercise['distance'] = this.state.distance;
        }

        axios.get('/workouts/' + this.state.workoutId)
          .then(res => {
              if(res.data.mode !== this.state.mode) {
                  var message = document.createElement("div");
                  message.className = "alert alert-danger";        
                  var node = document.createTextNode('Mode must be the same as selected workout mode');
                  message.appendChild(node);
                  validationSummary.appendChild(message);
              } else {
                  axios.patch('/workouts/' + this.state.workoutId, {
                      exercise: createdExercise
                  })
                      .then(res => window.location.reload())
                      .catch(err => console.log(err));
              }
          })
          .catch(err => console.log(err));
        } 
    }

    render() {

      return(
        <div>
          <div className="modal-header">
            <h5 className="modal-title" id="newExercise">Add New Exercise</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body">
            <div ref="validationSummary"></div>

            <label htmlFor='name'><b>Select workout to add to:</b></label>
            <select id="inputState" name="workoutId" className="form-control" onChange={this.onChange}>
              <option value={''}>...</option>
              { this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                                                      && this.props.selectedWorkoutList.includes(exercise._id))                                          
                  .map( (workout, index) =>
                      <option key={index} value={workout._id}>{workout.name} - {workout.mode}</option>
                  )
              }
            </select>
            <br/>

            <label htmlFor='mode'><b>Select Mode:</b></label>
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                  type="radio" 
                  name="mode" 
                  id="weightTraining" 
                  value='Weight Training'
                  checked={this.state.mode === 'Weight Training'}
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
                  checked={this.state.mode === 'Running'}
                  onChange={this.onChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">Running</label>
              </div>

              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                  type="radio" 
                  name="mode" 
                  id="cycling" 
                  value="Cycling"
                  checked={this.state.mode === 'Cycling'}
                  onChange={this.onChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">Cycling</label>
              </div>

              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                  type="radio" 
                  name="mode" 
                  id="swimming" 
                  value="Swimming"
                  checked={this.state.mode === 'Swimming'}
                  onChange={this.onChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">Swimming</label>
              </div>

            </div>
                 
            {/* Weight training */}
            {this.state.mode === 'Weight Training' && this.state.mode !== '' && this.state.workoutId !== '' &&
              <div>
                <label for="newExercise"><b>New Exercise:</b></label>
                <form onSubmit={this.submitExercise.bind(this)}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Exercise Name" 
                      name="exerciseName" 
                      value={this.state.exerciseName}
                      onChange={this.onChange}
                      required
                    />
                  </div>
               
                  <div className="form-row">
                    <div className="col">
                      <input type="number" 
                        className="form-control"
                        ref="sets" 
                        name="sets" 
                        value={this.state.sets} 
                        onChange={this.onChange} 
                        placeholder="Sets" 
                        required
                      />
                    </div>

                    <div className="col">
                      <input type="number" 
                        className="form-control"
                        ref="reps" 
                        name="reps" 
                        value={this.state.reps} 
                        onChange={this.onChange} 
                        placeholder="Reps" 
                        required
                      />
                    </div>

                    <div className="col">
                      <input type="number" 
                        className="form-control"
                        ref="weight" 
                        name="weight" 
                        value={this.state.weight} 
                        onChange={this.onChange} 
                        placeholder="Weight"
                      />
                    </div>

                    <div className="col">
                      <select id="unit" name="unit" className="form-control" onChange={this.onChange}>
                          <option value="lbs">Lbs</option>
                          <option value="kg">Kg</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="modal-footer">
                    <button type="button" onClick={ () => this.clearState() }className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-success">Save exercise</button>
                  </div>
                </form>
              </div>
            }

            {/* Exercises - Running, Cycling */}
            {(this.state.mode === 'Running' || this.state.mode === 'Cycling') 
              && this.state.mode !== '' && this.state.workoutId !== '' &&
              <div>
                <label for="newExercise"><b>New Exercise:</b></label>
                <form onSubmit={this.submitExercise.bind(this)}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Exercise Name" 
                      name="exerciseName" 
                      value={this.state.exerciseName}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <input type="number" 
                        className="form-control"
                        ref="distance" 
                        name="distance" 
                        value={this.state.distance} 
                        onChange={this.onChange} 
                        placeholder="Distance"
                        required
                      />
                    </div>

                    <div className="col">
                      <select id="unit" name="distanceUnit" className="form-control" onChange={this.onChange}>
                          <option name="distanceUnit" value="mi">Mi</option>
                          <option name="distanceUnit" value="km">Km</option>
                      </select>
                    </div>  
                  </div>
                  <br />
                  <div className="modal-footer">
                    <button type="button" onClick={ () => this.clearState() }className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-success">Save exercise</button>
                  </div>
                </form>     
              </div>
            }

            {/* Exercise - Swimming */}
            {this.state.mode === 'Swimming' && this.state.mode !== '' && this.state.workoutId !== '' &&
              <div>
                <label for="newExercise"><b>New Exercise:</b></label>
                <form onSubmit={this.submitExercise.bind(this)}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Exercise Name" 
                      name="exerciseName" 
                      value={this.state.exerciseName}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <input type="number" 
                        className="form-control"
                        ref="distance" 
                        name="distance" 
                        value={this.state.distance} 
                        onChange={this.onChange} 
                        placeholder="Distance"
                        required
                      />
                    </div>

                    <div className="col">
                      <select id="unit" name="distanceUnit" className="form-control" onChange={this.onChange}>
                          <option name="distanceUnit" value="M">M</option>
                      </select>
                    </div>  
                  </div>
                  <br />
                  <div className="modal-footer">
                    <button type="button" onClick={ () => this.clearState() }className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-success">Save exercise</button>
                  </div>
                </form>     
              </div>
            }
          
        </div>
      </div>
      )
    }
}

const mapStateToProps = function(state) {
    return { 
             weekDay: state.weekDay, 
             workouts:state.workouts,
             selectedWorkoutList:state.selectedWorkoutList
            }
}

export default connect(mapStateToProps)(AddNewExercise);