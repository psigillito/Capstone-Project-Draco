import React, {Component} from 'react'
import TrainingPlanCard from './TrainingPlanCard'
import axios from 'axios';

let allExercises = [];
let createdExercise = {};
let exerciseDays = [];

class ActiveWorkoutsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
           name: '',
           startDate: '',
           endDate: '',
           addExercise: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleDayChange.bind(this);
    }

    openModalWithPlan(plan) {
        this.setState({
            title: 'Edit Training Plan',
            name: plan.name,
            startDate: plan.startDate,
            endDate: plan.endDate,
            workouts: plan.workouts.map( (workout) => workout )
        })
    }

    createNewTrainingPlan() {
        this.setState({
            title:'Create New Training Plan',
            name:'',
            startDate:'',
            endDate:'',
            workouts:''
        })
    }

    createNewWorkout() {
        this.setState({
            name:'',
            mode:'',
            duration:'',
            daysOfWeek: [],
            trainingPlan:''
        })
    }

    addExercise() {
        if(this.state.addExercise === false) {
            this.setState({
                addExercise: true,
                exerciseName:'',
                sets:'',
                reps:'',
                weight:'',
                unit:''
            })
        } 
    }

    saveExercise() {
        this.setState({ addExercise: false }) 
        createdExercise['name'] = this.state.exerciseName;
        createdExercise['sets'] = this.state.sets;
        createdExercise['reps'] = this.state.reps;
        createdExercise['weight'] = this.state.weight;
        createdExercise['unit'] = this.state.unit;
        allExercises.push(createdExercise);
        alert('Exercise saved');
        createdExercise = {};
        console.log(allExercises);
    }

    submitWorkout() {
        const newWorkout = {
            name: this.state.name,
            mode: this.state.mode,
            exercises: allExercises,
            duration: this.state.duration,
            daysOfWeek: exerciseDays,
            trainingPlan: this.state.trainingPlan,
        }
        //console.log(newWorkout);

        axios.post('/workouts', newWorkout)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        axios.patch('/trainingPlans', {
            id: this.state.trainingPlan,
            workout: newWorkout
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        window.location.reload();
    }

    submitTrainingPlan() {
        const newPlan = {
            name: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            workouts:''
        }

        axios.post('/trainingPlans', newPlan)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        window.location.reload();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDayChange(e) {
        if(exerciseDays.includes(e.target.value)) {
            alert('Day already exists. Removing Day');
            const index = exerciseDays.indexOf(e.target.value);
            exerciseDays.splice(index, 1);
        } else {
            exerciseDays.push(parseInt(e.target.value));
        }
    }
    

    render(){
        return(
            <div>
            <div>
                <h4>Active Training Plans:</h4>
                    <div id="accordion">
                        {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
                            <div key={index} className="card">  
                                <button id="#a" className="btn btn-link card-header" data-toggle="collapse" data-target= {"#collapse"+index} aria-expanded="true" aria-controls="collapseOne">
                                    {plan.name}
                                </button>

                                <div id={"collapse"+index} className="collapse" aria-labelledby="a" data-parent="#accordion">
                                    <div className="card-body">
                                        <div><b>Start Date:</b></div>
                                        <div>{plan.startDate}</div>
                                        <div><b>End Date:</b></div>
                                        <div>{plan.endDate}</div>
                                        <div><b>Workouts:</b></div>
                                        {plan.workouts.map( (workout) => <div>{workout}</div> )}
                                        <br/> 
                                        <button onClick={() => this.openModalWithPlan(plan)} data-toggle="modal" data-target="#trainingModal" type="button" className="btn btn-secondary btn-block">Edit Plan</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <br/>
                    <button onClick={() => this.createNewTrainingPlan() } data-toggle="modal" data-target="#trainingModal" type="button" className="btn btn-primary btn-block">Create New Training Plan</button>
                    <button onClick={() => this.createNewWorkout() } data-toggle="modal" data-target="#createNewWorkout" type="button" className="btn btn-primary btn-block">Create New Workout</button>
            </div>

        {/* EDIT & CREATE TRAINING PLANS MODAL */}

            <div class="modal fade" id="trainingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{this.state.title}</h5>
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
                      placeholder="Training Plan Name" 
                      name="name" 
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>

                  <label for='startDate'><b>Start Date:</b></label>
                   <div className="form-group">
                    <input
                     type="text" 
                     className="form-control form-control-lg" 
                     placeholder= "Start Date" 
                     name="startDate" 
                     value={this.state.startDate}
                     onChange={this.onChange}
                    />
                  </div>

                  <label for='endDate'><b>End Date:</b></label>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="End Date" 
                      name="endDate" 
                      value={this.state.endDate}
                      onChange={this.onChange}
                    />
                  </div>
  
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={() => this.submitTrainingPlan() } class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

         {/* CREATE NEW WORKOUT MODAL */}

            <div class="modal fade" id="createNewWorkout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
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

                  <label for='name'><b>Mode:</b></label>
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
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" 
                      type="radio" 
                      name="mode" 
                      id="swimming" 
                      value="Swimming"
                      onChange={this.onChange}
                      />
                      <label className="form-check-label" for="inlineRadio2">Swimming</label>
                  </div>
                  <div className="form-check form-check-inline">
                      <input className="form-check-input" 
                      type="radio" 
                      name="mode" 
                      id="cycling" 
                      value="Cycling"
                      onChange={this.onChange}
                      />
                      <label className="form-check-label" for="inlineRadio2">Cycling</label>
                  </div>
                  </div>

                  <label for='name'><b>Duration:</b> (fix me)</label>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Duration" 
                      name="duration" 
                      value={this.state.duration}
                      onChange={this.onChange}
                    />
                  </div>

                  
                {/* WEIGHT TRAINING LOGIC */}

                {this.state.addExercise === true &&
                  <div>
                  <label for='name'><b>New Exercise:</b></label>
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

                    {this.state.mode === 'Weight Training' && 
                    <div>
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
                    </div> }

                    </div> }

               
                  <div>
                  <br/>
                  {this.state.addExercise === false &&
                    <div>
                        <button type="button" onClick={() => this.addExercise() } class="btn btn-primary btn-block">Add New Exercise</button>
                    </div>
                    }
                    {this.state.addExercise === true && 
                    <div>
                        <button type="button" onClick={() => this.saveExercise() } class="btn btn-primary btn-block">Save Exercise</button>
                    </div>
                    }
                    <br/>
                  </div> 
                

                  {/*<label for='name'><b>Intervals:</b> (fix me)</label>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Intervals" 
                      name="intervals" 
                      value={this.state.intervals}
                      onChange={this.onChange}
                    />
                  </div> */}

                  <label for='name'><b>Days Of Week:</b> (fix me)</label>
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
                            <option name="trainingPlan" value={plan._id}>{plan.name}</option>
                        )}
                    </select>
                  </div>

                   
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={() => this.submitWorkout() } class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            </div>
        )
    }
}

export default ActiveWorkoutsPanel