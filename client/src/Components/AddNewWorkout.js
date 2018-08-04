import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import GoogleMap from './GoogleMap';
import {setAthleteId, setAthleteRoutes, setSelectedRoute, setCurrentRoute} from '../redux/actions';

let createdExercise = {};
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
          addExercise: false,
          stravaChecked: false,
          selectedPolyLine: "",
          selectedDistance: 10,
          allExercises: [],
          distanceUnit: 'mi',
          exerciseDays: [],
          createExercise: {},
          unit: 'lbs'
        }
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.handleStravaChecked = this.handleStravaChecked.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.getAthleteId = this.getAthleteId.bind(this);
        this.removeExercise = this.removeExercise.bind(this);
    }

    saveExercise() {
        createdExercise['name'] = this.state.exerciseName;
        createdExercise['sets'] = this.state.sets;
        createdExercise['reps'] = this.state.reps;
        createdExercise['weight'] = this.state.weight;
        createdExercise['unit'] = this.state.unit;
        createdExercise['distanceUnit'] = this.state.distanceUnit;
        createdExercise['distance'] = this.state.distance;
        createdExercise['stravaRoute'] = this.props.selectedRoute;

        this.state.allExercises.push(createdExercise);
        createdExercise = {};

        this.setState({
          exerciseName:'',
          sets:'',
          reps:'',
          weight:'',
          duration:'',
          distance:'',
        })
    }

    submitWorkout() {
 
        const newWorkout = {
            name: this.state.name,
            mode: this.state.mode,
            exercises: this.state.allExercises,
            daysOfWeek: this.state.exerciseDays,
            trainingPlan: this.state.trainingPlan,
        }

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

        if(e.target.type == 'radio'){
          this.setState({ allExercises: [] })
        }
        
        //if running exercise selected
        if(e.target.value == 'Running'){

          if(this.props.stravaToken.length > 1)
          {
            //get user Id and update routes state 
            this.getAthleteId()
          }
          
        }
    }

    handleDayChange(e) {
        if(this.state.exerciseDays.includes(e.target.value)) {
            const index = this.state.exerciseDays.indexOf(e.target.value);
            this.state.exerciseDays.splice(index, 1);
        } else {
            this.state.exerciseDays.push(parseInt(e.target.value));
        }
    }

    getAthleteId(){

      fetch('https://www.strava.com/api/v3/athlete?access_token='+this.props.stravaToken).then((results) => results.json())
      .then( (results) => {
        
        //set athleteId in store
        this.props.setAthleteId(results.id);
        
        fetch('https://www.strava.com/api/v3/athletes/'+results.id+'/routes?access_token='+this.props.stravaToken)
        .then((results) => results.json())
        .then( (results) => {

          //save route names and ids into store
          var athleteRoutes =[];
          for( var i=0; i < results.length; i++){
            var tempRoute = { name: results[i].name, id: results[i].id}
            athleteRoutes.push(tempRoute)
          }

          this.props.setAthleteRoutes(athleteRoutes)
        })
      })
    }

    handleStravaChecked(e){
      
      //if closing the strava options, set currentRoute state to -1 and selectedRoute to -1
      if(this.state.stravaChecked){

        this.props.setSelectedRoute(-1);
        this.props.setCurrentRoute(-1);
        this.props.setAthleteRoutes(-1);
      }else{
          //call query to get everything
          this.getAthleteId()
      }
      
      this.setState({
        stravaChecked: !this.state.stravaChecked
      })
    }

    //sets new polyline based 
    handleRouteChange(e)
    {
      var id = e.nativeEvent.target.value;
      if(id == -1){
        //remove everything 
        this.props.setSelectedRoute(-1);
        this.props.setCurrentRoute(-1);
      }else{

        if(this.state.stravaChecked){
          
          //set selectedId in state 
          this.props.setSelectedRoute(e.nativeEvent.target.value)

          //get route details
          fetch('https://www.strava.com/api/v3/routes/'+id +'?access_token='+this.props.stravaToken)
          .then((results) => results.json())
          .then( (results) => {
            this.props.setCurrentRoute(results);
            this.setState({
              distance: (this.props.currentRoute.distance * 0.00062137).toFixed(2),
            })
          })
        }
      }
    }


    removeExercise(e){
      var name = e.nativeEvent.target.value;

      this.setState({
        allExercises: this.state.allExercises.filter(e => e.name != name)
      })
    }

    render() {

      let hiddenOptions = this.state.stravaChecked ? '': 'hidden';
      const hasStravaToken = (this.props.stravaToken.length > 1);
      let useStrava;
      if(hasStravaToken){
        useStrava = <div>
                      <span>Use an Existing Strava Route <input type="checkbox" defaultChecked={this.state.stravaChecked} onClick={this.handleStravaChecked}/></span>
                      <div className={hiddenOptions}>
                        <select id="inputState" className="custom-select" onChange={this.handleRouteChange} >
                          <option value={-1}>Select a Strava Route</option>
                          {this.props.athleteRoutes != -1 &&
                            this.props.athleteRoutes.map( (route) =>
                          <option value={route.id}>{route.name}</option>
                          )}
                        </select>
                        <br/>
                        {this.props.currentRoute != -1 &&
                          <div>
                          <br/>
                            <div className="centered-section">
                              <GoogleMap selectedPolyLine={this.props.currentRoute.map.polyline}/>
                            </div>
                          </div>
                        }
                        
                      </div>
                    </div>      
      }

      return(
        <div>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Workout</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body ">

            <label for='name'><b>Workout Name:</b></label>
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

            <label for='mode'><b>Workout Type:</b></label>
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

            <label for='name'><b>Days:</b> (select which days you will do this workout)</label>
            <div className="form-group">
              {weekDays.map( (weekDay, index) => 
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value={index}/>
                  <label className="form-check-label" for="inlineCheckbox1">{weekDay}</label>
                </div>
                )
              }
            </div>

            <label for='name'><b>Training Plan: </b>(each workout must be part of a training plan)</label>
            <div className="form-group">
              <select id="inputState" name="trainingPlan" class="form-control" onChange={this.onChange}>
                  <option>...</option>
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
            <fieldset>
            <div>
              <div class="modal-header">
                <h5>Add Exercise</h5>
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
                    <input type="number" class="form-control" name="sets" value={this.state.sets} onChange={this.onChange} placeholder="Sets"/>
                  </div>
                  <div class="col">
                    <input type="number" class="form-control" name="reps" value={this.state.reps} onChange={this.onChange} placeholder="Reps"/>
                  </div>
                  <div class="col">
                    <input type="number" class="form-control" name="weight" value={this.state.weight} onChange={this.onChange} placeholder="Weight"/>
                  </div>
                  <div class="col">
                   <select id="inputState" name="unit" class="form-control" onChange={this.onChange}>
                      <option name="unit" value="lbs">Lbs</option>
                      <option name="unit" value="kg">Kg</option>
                   </select>
                  </div>
                </div>
              </form>
              <br />
            <div>
                <button type="button" onClick={() => this.saveExercise()} class="btn btn-primary btn-block">
                  Add Exercise To Workout
                </button>
            </div>
            </div>
            </fieldset>
          }

          {/* Exercises - Running */}
          {this.state.mode === 'Running' && this.state.mode != '' && 
          <div>
          <div class="modal-header">
            <h5>Add Exercises</h5>
          </div>
          {useStrava}
          <br/>
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
              <fieldset disabled={this.state.stravaChecked}>
                <form>
                  <div class="form-row">
                    <div class="col">
                      <input type="number" id="inputDistance" class="form-control" name="distance" value={this.state.distance} onChange={this.onChange} placeholder="Distance"/>
                    </div>
                    <div class="col">
                    <select id="inputState" name="distanceUnit" class="form-control" onChange={this.onChange}>
                        <option selected name="distanceUnit" value="mi">Mi</option>
                        <option name="distanceUnit" value="km">Km</option>
                    </select>
                    </div>
                  </div>
                </form>
              </fieldset>
              <br />
              <div>
                  <button type="button" onClick={() => this.saveExercise()} class="btn btn-primary btn-block">
                    Add Exercise To Workout
                  </button>
              </div>
          </div>
        }       
          {/*Display Pending Workouts*/}
          <br/>
          <div>
            <h4>Workout Summary</h4>
            <table className="table"> 
              <thead>
                <th>Exercise Name</th>
                <th>{ (this.state.mode == 'Running') ? 'Distance' : 'Weight' }</th>
                <th>Units</th>
                <th>{ (this.state.mode == 'Running') ? '' : 'Reps' }</th>
                <th>{ (this.state.mode == 'Running') ? '' : 'Sets' }</th>
                <th></th>
              </thead>
              <tbody>
                {this.state.allExercises.map( (exercise) =>
                  <tr>
                    <td>{exercise.name}</td> 
                    <td>{ (this.state.mode == 'Running') ? exercise.distance : exercise.weight }</td>
                    <td>{ (this.state.mode == 'Running') ? exercise.distanceUnit : exercise.unit }</td>
                    <td>{ (this.state.mode == 'Running') ? '' : exercise.reps }</td>
                    <td>{ (this.state.mode == 'Running') ? '' : exercise.sets }</td>
                    <td><button className="btn btn-danger" value={exercise.name} onClick={this.removeExercise}>X</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <br/>
      </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-target="#addWorkout">Close</button>
        <button type="button" onClick={() => this.submitWorkout()} data-toggle="modal" data-target="#addExercise" class="btn btn-success">Save Workout</button>
      </div>
    </div>
    )}
  }

  const mapStateToProps = function(state) {
    return {  trainingPlans: state.trainingPlans, stravaToken: state.stravaToken, athleteRoutes: state.athleteRoutes,
              currentRoute: state.currentRoute, selectedRoute: state.selectedRoute}
  }

export default connect(mapStateToProps, {setAthleteId, setAthleteRoutes, setSelectedRoute, setCurrentRoute})(AddNewWorkout);