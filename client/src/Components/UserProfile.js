import React, { Component } from 'react';
import { getProfile } from '../redux/actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import logo from '../images/profile.png';

class UserProfile extends Component {
	componentDidMount() {
		this.props.getProfile(this.props.auth.user.id);
	}

	render() {

		if(!this.props.profile.profile) {
			console.log('loading...');
		} else {
			return(
			<div className="profile">
		      <div className="container">
		        <div className="row">
		          <div className="col-md-8 m-auto">
		            <h1 className="display-4 text-center">{this.props.profile.profile.name}'s Profile</h1>
		            <div>
		            <img src={logo} className="mx-auto d-block"/>
		            </div>
		            <p className="lead text-center"><b>Name:</b> {this.props.profile.profile.name}</p>
		            <p className="lead text-center"><b>Email:</b> {this.props.profile.profile.email}</p>
		            <p className="lead text-center"><b>Username:</b> {this.props.profile.profile.username}</p>
		            <p className="lead text-center"><b>Training Plans:</b></p>
		            <table className="table">
		            	<tbody>
			            	{this.props.trainingPlans.data.map( (plan, index) =>
								<tr key={index} className="lead text-center">{plan.name}</tr>
			            	)}
		            	</tbody>
		            </table>
		            <p className="lead text-center"><b>Workouts:</b></p>
		            <table className="table">
		            	<tbody>
			            	{this.props.workouts.data.map( (workout, index) =>
			            		<tr key={index} className="lead text-center">{workout.name} - {workout.mode}</tr>
			            	)}
		            	</tbody>
		            </table>
		          </div>
		        </div>
		      </div>
		    </div>
			)
		}
		return(
			<div>
				<h1>Profile</h1>
			</div>
		)
	}
}

UserProfile.propTypes = {
	getProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	trainingPlans: PropTypes.object.isRequired,
	workouts: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
	return {profile: state.profile, trainingPlans: state.trainingPlans, workouts: state.workouts, auth: state.auth }
};

export default connect(mapStateToProps, { getProfile })(UserProfile);