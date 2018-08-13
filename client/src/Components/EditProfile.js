import React, {Component} from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { editUser, getProfile } from '../redux/actions';
import { Link, withRouter } from 'react-router-dom';

class EditProfile extends Component {
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
    this.props.getProfile();
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

  onSubmit(e) {
    e.preventDefault();

    const userEdit = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
    }
    // allow redirection within action
    this.props.editUser(userEdit, this.props.history);
  }

  render() {
    // errors object
    const { errors } = this.state;

    // reload page if errors still exist in state to clear
    if(Object.keys(errors).length != 0) {
      window.location.reload();
    }

    if(!this.props.profile.profile) {
      console.log('loading...');
    } else {
    return (
    <div className="edit">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Profile</h1>
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
                { errors.email && (<div className="invalid-feedback">{alert('Email already exists')}</div>) }
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
                { errors.username && (<div className="invalid-feedback">{alert('Username already exists')}</div>) }
              </div>
              <input type="submit" className="btn btn-info btn-block" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
  return(
      <div>
        <h1 className="display-4 text-center">Edit Profile</h1>
      </div>
    )
}

}

EditProfile.propTypes = {
  editUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
  return { errors: state.errors, profile: state.profile }
}

export default connect(mapStateToProps, { editUser, getProfile })(withRouter(EditProfile));