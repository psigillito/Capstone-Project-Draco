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
          createExercise: {},
          unit: 'lbs'
        }
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.handleStravaChecked = this.handleStravaChecked.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.getAthleteId = this.getAthleteId.bind(this);
        this.removeExercise = this.removeExercise.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    //Adds exercise to the allExercises array and clears component state elements for next exercise 
    saveExercise(e) {

      e.preventDefault();

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

    validateInput(){

      let errorsList = []

      if(this.refs.workoutName.value.length < 1){
        errorsList.push("Workout Name Required");
      }

      if(this.state.mode ==''){ 
        errorsList.push("Workout Mode Must Be Created");
      }

      if(this.state.daysOfWeek.length < 1){
        errorsList.push("Must Select At Least One Day");
      }

      if(this.state.trainingPlan == ''){
        errorsList.push("Must Select a Training Plan");
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
    
    //saves workout to database 
    submitWorkout() {

      if(this.validateInput()){

        const newWorkout = {
            name: this.state.name,
            mode: this.state.mode,
            exercises: this.state.allExercises,
            daysOfWeek: this.state.daysOfWeek,
            trainingPlan: this.state.trainingPlan,
            date: Date.now()
        }

        axios.post('/workouts', newWorkout)
            .then(res => window.location.reload())
            .catch(err => console.log(err));
      }else{
        console.log("Validation Failed")
      }
    }

    //sets available fields for running or weight training
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        if(e.target.type == 'radio'){
          this.setState({ allExercises: [] })
        }
    }

    //Updates week days for workout 
    handleDayChange(e) {
        if(this.state.daysOfWeek.includes(parseInt(e.target.value))) {
            const index = this.state.daysOfWeek.indexOf(e.target.value);
            this.state.daysOfWeek.splice(index, 1);
        } else {
            this.state.daysOfWeek.push(parseInt(e.target.value));
        }
    }

    //gets athlete id from strava then gets list of routes and saves it to redux state
    getAthleteId(){  
        
        fetch('https://www.strava.com/api/v3/athletes/'+this.props.athleteId.state+'/routes?access_token='+this.props.stravaToken)
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
    }

    //if selected to use strava
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

    //sets new polyline that is passed to google map based on selected route
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
        allExercises: this.state.allExercises.filter(e => e.name !== name)
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
                          {this.props.athleteRoutes !== -1 &&
                            this.props.athleteRoutes.map( (route, index) =>
                          <option key={index} value={route.id}>{route.name}</option>
                          )}
                        </select>
                        <br/>
                        {this.props.currentRoute !== -1 &&
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
        //MODAL
        <div>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Workout</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/*MODAL BODY*/}
          <div className="modal-body ">
          <div ref="validationSummary"></div>

            {/*FORM 1 WORKOUT NAME, TYPE, DAYS, TRAINING PLAN*/}
              <label htmlFor='name'><b>Workout Name:</b></label>
              <div className="form-group">
                <input type="text" ref="workoutName" className="form-control form-control-lg" placeholder="Workout Name" name="name"value={this.state.name} 
                      onChange={this.onChange} required/>
              </div>

              <label htmlFor='mode'><b>Workout Type:</b></label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="mode" id="weightTraining" value='Weight Training'
                          onChange={this.onChange}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Weight Training</label>
                </div>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="mode" id="running" value="Running"
                          onChange={this.onChange}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Running</label>
                </div>
              </div>

              <label htmlFor='name'><b>Days:</b> (select which days you will do this workout)</label>
              <div className="form-group">
                {weekDays.map( (weekDay, index) => 
                  <div key={index} className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="daysOfWeek" onChange={this.handleDayChange} value={index}/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">{weekDay}</label>
                  </div>
                )}
              </div>

              <label htmlFor='name'><b>Training Plan: </b>(each workout must be part of a training plan)</label>
              <div className="form-group">
                
                <select id="inputState" name="trainingPlan" className="form-control" onChange={this.onChange}>
                    <option>...</option>
                    {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
                        <option key={index} name="trainingPlan" value={plan._id}>{plan.name}</option>
                    )}
                </select>
              
              </div>
            {/*END FORM 1 WORKOUT NAME, TYPE, DAYS, TRAINING PLAN*/}
           

            {/* Exercises - Weight training */}
            {this.state.mode === 'Weight Training' && this.state.mode !== '' &&
              <div>
                <div className="modal-header">
                  <h5>Add Exercise</h5>
                </div>
                <div className="form-group">
                </div>
                <form onSubmit={(e) => this.saveExercise(e) } className="form-group">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Exercise Name" name="exerciseName"
                          value={this.state.exerciseName} onChange={this.onChange} required/>
                    <br/>
                    <div className="form-row">
                      <div className="col">
                        <input type="number" min="1" className="form-control" name="sets" value={this.state.sets} onChange={this.onChange} placeholder="Sets" required/>
                      </div>
                      <div className="col">
                        <input type="number" min="1" className="form-control" name="reps" value={this.state.reps} onChange={this.onChange} placeholder="Reps" required/>
                      </div>
                      <div className="col">
                        <input type="number" min="1" className="form-control" name="weight" value={this.state.weight} onChange={this.onChange} placeholder="Weight" required/>
                      </div>
                      <div className="col">
                        <select id="inputState" name="unit" className="form-control" onChange={this.onChange}>
                          <option name="unit" value="lbs">Lbs</option>
                          <option name="unit" value="kg">Kg</option>
                        </select>
                        <br/>
                        <div>
                          <button type="submit"  className="btn btn-primary btn-block">Add Exercise To Workout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <br/>
              </div>
            }

            {/* Exercises - Running */}
            {this.state.mode === 'Running' && this.state.mode !== '' && 
              <div>
                <div className="modal-header">
                  <h5>Add Exercises</h5>
                </div>
                {useStrava}
                <br/>
                <form action="" onSubmit={(e) => this.saveExercise(e) }>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Exercise Name" name="exerciseName" 
                          value={this.state.exerciseName} onChange={this.onChange} required/>
                  </div>
                  <label htmlFor='duration'><b>Duration:</b></label>
                  <fieldset disabled={this.state.stravaChecked}>
                      <div className="form-row">
                        <div className="col">
                          <input type="number" id="inputDistance" min="0" className="form-control" name="distance" value={this.state.distance} onChange={this.onChange} placeholder="Distance" required/>
                        </div>
                        <div className="col">
                          <select id="inputState" name="distanceUnit" className="form-control" onChange={this.onChange}>
                            <option selected name="distanceUnit" value="mi">Mi</option>
                            <option name="distanceUnit" value="km">Km</option>
                          </select>
                        </div>
                      </div>
                  </fieldset>
                  <br/>
                  <div>
                    <button type="submit"  className="btn btn-primary btn-block">Add Exercise To Workout</button>
                  </div>
                </form>
              </div>
            }       

            {/*WORKOUT SUMMARY*/}
            <br/>
            <div>
              <h4>Workout Summary</h4>
              <table className="table"> 
                <thead>
                  <tr>
                    <th>Exercise Name</th>
                    <th>{ (this.state.mode == 'Running') ? 'Distance' : 'Weight' }</th>
                    <th>Units</th>
                    <th>{ (this.state.mode == 'Running') ? '' : 'Reps' }</th>
                    <th>{ (this.state.mode == 'Running') ? '' : 'Sets' }</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.allExercises.map( (exercise, index) =>
                    <tr key={index}>
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
      
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" data-target="#addWorkout">Close</button>
            <button type="button" onClick={() => this.submitWorkout()} data-toggle="modal" data-target="#addExercise" className="btn btn-success">Save Workout</button>
          </div>
        </div>
      )
    }
  }

  const mapStateToProps = function(state) {
    return {  trainingPlans: state.trainingPlans, stravaToken: state.stravaToken, athleteRoutes: state.athleteRoutes,
              currentRoute: state.currentRoute, selectedRoute: state.selectedRoute, athleteId: state.athleteId}
  }

export default connect(mapStateToProps, {setAthleteId, setAthleteRoutes, setSelectedRoute, setCurrentRoute})(AddNewWorkout);