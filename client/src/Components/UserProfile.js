import React, { Component } from 'react';
import { getProfile } from '../redux/actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import logo from '../images/profile.png';
import loading from '../images/loading.gif';
import { getCurrentTrainingPlans, getCurrentWorkouts } from '../redux/actions';
import axios from 'axios';

class UserProfile extends Component {
	componentDidMount() {
		this.props.getProfile(this.props.auth.user.id);

		axios.get('/trainingPlans/', {
	        params: {
	            user: this.props.auth.user.id  
	          }
	      }).then(res => {    
	        this.props.getCurrentTrainingPlans(res);
	      }).then( res => { 
	        axios.get('/workouts/', {
	            params: {
	                user: this.props.auth.user.id
	            }
	        }).then(res => {
	            this.props.getCurrentWorkouts(res);
	        })
	

	})}

	render() {

		if(!this.props.profile.profile) {
			return(
				<div>
					<img className="mx-auto d-block" src={loading} />
				</div>
			)
		} else {
			return(
				<div>
					<h1 className="display-4 text-center">{this.props.auth.user.name} User Profile</h1>
					<div className="card about-section">
						<div className="card text-center">
							<div class="card-body">
								<img src={logo} />

							    <h5 className="card-title">Name</h5>
							    <p className="card-text">{this.props.profile.profile.name}</p>
							    
							    <h5 className="card-title">Email</h5>
							    <p className="card-text">{this.props.profile.profile.email}</p>

							    <h5 className="card-title">Username</h5>
							    <p className="card-text">{this.props.profile.profile.username}</p>

							    <h5 className="card-title">Training Plans</h5>
							    {this.props.trainingPlans.data.length !== 0 && 
									this.props.trainingPlans.data.map( (plan, index) => 
										<p key={index} className="card-text">{plan.name}</p>
									)
							    }
							    {this.props.trainingPlans.data.length === 0 && 
									<img src={loading} style={{height: 2 + 'em'}} />
							    }

							    <h5 className="card-title">Workouts</h5>
							    {this.props.workouts.data.length !== 0 && 
									this.props.workouts.data.map( (workout, index) => 
										<p key={index} className="card-text">{workout.name} - {workout.mode}</p>
									)
							    }
							    {this.props.workouts.data.length === 0 && 
									<img src={loading} style={{height: 2 + 'em'}} />
							    }

						  	</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

UserProfile.propTypes = {
	getProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	trainingPlans: PropTypes.object.isRequired,
	workouts: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentTrainingPlans: PropTypes.func.isRequired,
	getCurrentWorkouts: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
	return {profile: state.profile, trainingPlans: state.trainingPlans, workouts: state.workouts, auth: state.auth }
};

export default connect(mapStateToProps, { getProfile, getCurrentTrainingPlans, getCurrentWorkouts })(UserProfile);