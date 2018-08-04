import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/calendar');
    }
  }

	render() {
		return (
		<div className="landing">
          <div className="landing-inner">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Workout App
                  </h1>
                  <p className="lead">Plan Your Workouts</p>
                  <hr />
                  <Link to="/register" className="btn btn-lg btn-info mr-2">Register</Link>
                  <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
	}
}

const mapStateToProps = function(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Landing);