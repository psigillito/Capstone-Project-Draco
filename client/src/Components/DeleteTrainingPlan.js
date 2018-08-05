import React, {Component} from 'react';
import axios from 'axios';

class DeleteTrainingPlan extends Component {
	constructor(props) {
		super(props);
	}

	deleteTrainingPlan() {
        axios.delete('/trainingPlans', {
            params: {
                id: this.props.id
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        window.location.reload();
    }

    render() {
    	return(
    		<div>
	    		<div>
			    	<h5>Are you sure you want to delete '{this.props.name}' 
				        training plan and all workouts associated with it?</h5>
			    </div>
			    <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        <button type="button"  onClick={() => this.deleteTrainingPlan() } className="btn btn-danger">Delete</button>
			    </div>
		    </div>
    	)
    }
}

export default DeleteTrainingPlan;