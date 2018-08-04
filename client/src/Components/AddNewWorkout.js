import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AddNewExercise from './AddNewExercise';
import GoogleMap from './GoogleMap';
import {setAthleteId} from '../redux/actions';
import {setAthleteRoutes} from '../redux/actions';
import {setSelectedRoute} from '../redux/actions';
import {setCurrentRoute} from '../redux/actions';


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
          addExercise: false,
          stravaChecked: false,
          selectedPolyLine: "o~}nG~{ioVci@mTLw@?@}@]Js@_EgBLw@gErWt@X{F}BER[OZN}CzRXLmEeB_F}B~E|BeKno@oDuAuCvQAxFQbGvPI]zFDtZ^i@_@h@?bGxRS?m@?l@rDEh@ZRFtB?@`^pA@xJAzO??yA?xAU?N}\\MaAIEO@Pwj@?uGIaBBuHc@CiNEgBeB}CcCkDcB{Ak@lCsPdBcLnWjKpB}KjEhBjA`@kAa@?c@rEuX\\N",
          selectedDistance: 10,
          selectedRouteId: 0,
        }
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.handleStravaChecked = this.handleStravaChecked.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.getAthleteId = this.getAthleteId.bind(this);
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
        if(exerciseDays.includes(e.target.value)) {
            const index = exerciseDays.indexOf(e.target.value);
            exerciseDays.splice(index, 1);
        } else {
            exerciseDays.push(parseInt(e.target.value));
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
      this.setState({
        stravaChecked: !this.state.stravaChecked
      })
    }
    //sets new polyline based 
    handleRouteChange(e)
    {
      var id = e.nativeEvent.target.value;

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

    render() {

      let hiddenOptions = this.state.stravaChecked ? '': 'hidden';
      const hasStravaToken = (this.props.stravaToken.length > 1);
      let useStrava;
      if(hasStravaToken){
        useStrava = <div>
                      <input type="checkbox" defaultChecked={this.state.stravaChecked} onClick={this.handleStravaChecked}/> Use Strava Route 
                      <div className={hiddenOptions}>
                        <select id="inputState" className={hiddenOptions} class="form-control" onChange={this.handleRouteChange} >
                          <option value={-1}>Select a Route</option>
                          {this.props.athleteRoutes.map( (route) =>
                          <option value={route.id}>{route.name}</option>
                          )}
                        </select>
                        {this.props.currentRoute != -1 &&
                          <GoogleMap selectedPolyLine={this.props.currentRoute.map.polyline}/>
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
          {useStrava}
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
                      <input type="text" id="inputDistance" class="form-control" name="distance" value={this.state.distance} onChange={this.onChange} placeholder="Distance"/>
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
    return {  trainingPlans: state.trainingPlans, stravaToken: state.stravaToken, athleteRoutes: state.athleteRoutes,
              currentRoute: state.currentRoute}
  }

export default connect(mapStateToProps, {setAthleteId, setAthleteRoutes, setSelectedRoute, setCurrentRoute})(AddNewWorkout);