import React, {Component} from 'react';
import NavBar from './NavBar';

class Landing extends Component {
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
                  <a href="register.html" className="btn btn-lg btn-info mr-2">Register</a>
                  <a href="login.html" className="btn btn-lg btn-light">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
	}
}

export default Landing