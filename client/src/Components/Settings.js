import React, {Component} from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { editUser, getProfile, deleteAccount, logout } from '../redux/actions';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      username: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfile(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if(nextProps.profile.profile) {
      this.setState({
        name: nextProps.profile.profile.name,
        email: nextProps.profile.profile.email,
        username: nextProps.profile.profile.username
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteClick(e) {
		this.props.deleteAccount(this.props.auth.user.id);
		this.props.logout();
	}

  onSubmit(e) {
    e.preventDefault();

    const userEdit = {
    	id: this.props.auth.user.id,
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
    }
  
    this.props.editUser(userEdit);
  }

  render() {
    // errors object
    const { errors } = this.state;

    if(!this.props.profile.profile) {
      console.log('loading...');
    } else {
		    return (
		    <div className="settings">
		      <div className="container">
		        <div className="row">
		          <div className="col-md-8 m-auto">
		            <h1 className="display-4 text-center">Settings</h1>
		            <form onSubmit={this.onSubmit}>
		              <div className="form-group">
		                <label for="name"><b>Name</b></label>
		                <input
		                 type="text" 
		                 className="form-control form-control-lg" 
		                 placeholder= {this.props.profile.profile.name} 
		                 name="name" 
		                 value={this.state.name}
		                 onChange={this.onChange}
		                 required
		                />
		              </div>
		              <div className="form-group">
		                <label for="email"><b>Email</b></label>
		                <input 
		                  type="email" 
		                  className={classnames("form-control form-control-lg", {
		                    "is-invalid": errors.email
		                  })} 
		                  placeholder={this.props.profile.profile.email} 
		                  name="email" 
		                  value={this.state.email}
		                  onChange={this.onChange}
		                  required
		                />
		                { errors.email && (<div className="invalid-feedback">{errors.email}</div>) }
		              </div>
		              <div className="form-group">
		                <label for="username"><b>Username</b></label>
		                <input 
		                  type="text" 
		                  className={classnames("form-control form-control-lg", {
		                    "is-invalid": errors.username
		                  })}  
		                  placeholder={this.props.profile.profile.username} 
		                  name="username" 
		                  value={this.state.username}
		                  onChange={this.onChange}
		                  required
		                />
		                { errors.username && (<div className="invalid-feedback">{errors.username}</div>) }
		              </div>
		              <button type="submit" className="btn btn-info btn-block"> Save Settings</button>
		              <button onClick={this.deleteClick.bind(this)} className="btn btn-danger btn-block" type="submit">Delete Account</button>
		            </form>
		          </div>
		        </div>
		      </div>
		    </div>
		    )
  }
  return(
      <div>
        <h1 className="display-4 text-center">Settings</h1>
      </div>
    )
}

}

Settings.propTypes = {
  editUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
  return { errors: state.errors, profile: state.profile, auth: state.auth }
}

export default connect(mapStateToProps, { editUser, getProfile, deleteAccount, logout })(withRouter(Settings));