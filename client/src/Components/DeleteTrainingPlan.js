import React, {Component} from 'react';
import axios from 'axios';

class DeleteTrainingPlan extends Component {
	constructor(props) {
		super(props);
	}

	deleteTrainingPlan() {
        axios.delete('/trainingPlans/' + this.props.id)
            .then( () => window.location.reload())
            .catch(err => console.log(err));
    }

    render() {
    	return(
    		<div>
	    		<div className="alert alert-warning">
    			    Are you sure you want to delete '{this.props.name}' 
    				training plan? This will also delete all workouts associated with it.
			    </div>
			    <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
			        <button type="button"  onClick={() => this.deleteTrainingPlan() } className="btn btn-danger">Delete Plan</button>
			    </div>
		    </div>
    	)
    }
}

export default DeleteTrainingPlan;