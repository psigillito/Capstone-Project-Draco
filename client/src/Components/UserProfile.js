import React, { Component } from 'react';
import store from '../store';
import axios from 'axios';
import { getProfile } from '../redux/actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class UserProfile extends Component {
	componentDidMount() {
		this.props.getProfile();
	}

	render() {

		if(!this.props.profile.profile) {
			console.log('loading...');
		} else {
			return(
				<div>
			<div>
				<h1>Profile</h1>
				<p>Name: { this.props.profile.profile.name } </p>
				<p>Email: { this.props.profile.profile.email } </p>
				<p>Username: { this.props.profile.profile.username } </p>
				<p>Training Plans: { this.props.profile.profile.plans } </p>
			</div>
			<div>
			<button type="button" className="btn btn-primary">Edit Profile</button>
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
	auth: PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
	return {profile: state.profile}
};

export default connect(mapStateToProps, { getProfile })(UserProfile);