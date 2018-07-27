import React, {Component} from 'react'
import TrainingPlanCard from './TrainingPlanCard'

class ActiveWorkoutsPanel extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
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
                                        <div>Start Date:</div>
                                        <div>{plan.startDate}</div>
                                        <div>End Date:</div>
                                        <div>{plan.endDate}</div>
                                        <div>Workouts:</div>
                                        {plan.workouts.map( (workout) => <div>{workout}</div> )} 
                                        <button type="button" className="btn btn-secondary">edit</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="button" className="btn btn-primary btn-block">Create New Training Plan</button>
            </div>
        )
    }
}

export default ActiveWorkoutsPanel