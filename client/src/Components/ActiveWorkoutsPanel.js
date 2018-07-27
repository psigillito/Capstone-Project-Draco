import React, {Component} from 'react'
import TrainingPlanCard from './TrainingPlanCard'

class ActiveWorkoutsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
           activePlan: '',
           startDate: '',
           endDate: '',
           workouts: []
        };

        this.onChange = this.onChange.bind(this);
    }

    openModalWithPlan(plan) {
        this.setState({
            activePlan: plan.name,
            startDate: plan.startDate,
            endDate: plan.endDate,
            workouts: plan.workouts.map( (workout) => workout )
        })
    }

    createNewTrainingPlan() {

    }

    createNewWorkout() {
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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
                    <button onClick={() => this.createNewTrainingPlan() } data-toggle="modal" data-target="#createNewPlan" type="button" className="btn btn-primary btn-block">Create New Training Plan</button>
                    <button onClick={() => this.createNewWorkout() } data-toggle="modal" data-target="#createNewWorkout" type="button" className="btn btn-primary btn-block">Create New Workout</button>
            </div>

        {/* EDIT TRAINING PLANS MODAL */}

            <div class="modal fade" id="trainingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit {this.state.activePlan} Plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">

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

                  <label for='workouts'><b>Workouts:</b> (this could be a dropdown or radio buttons)</label>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Workouts" 
                      name="workouts" 
                      value={this.state.workouts}
                      onChange={this.onChange}
                    />
                  </div>
  
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

        {/* CREATE NEW TRAINING PLANS MODAL */}

            <div class="modal fade" id="createNewPlan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create New Training Plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
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
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            </div>
        )
    }
}

export default ActiveWorkoutsPanel