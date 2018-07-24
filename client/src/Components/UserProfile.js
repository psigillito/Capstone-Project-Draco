import React, { Component } from 'react';
import store from '../store';
import axios from 'axios';
import { getProfile } from '../redux/actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import logo from '../images/profile.png';

class UserProfile extends Component {
	componentDidMount() {
		this.props.getProfile();
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
		            <p className="lead text-center"><b>Training Plans:</b> {this.props.profile.profile.plans}</p>
		            <button className="btn btn-info btn-block" type="submit">Edit Profile</button>
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
	auth: PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
	return {profile: state.profile}
};

export default connect(mapStateToProps, { getProfile })(UserProfile);