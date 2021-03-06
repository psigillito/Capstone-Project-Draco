import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/calendar');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/calendar');
    }

    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user);
  }


  render() {
    //errors object
    const { errors } = this.state;

    return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Login</h1>
            <p className="lead text-center">Sign in to your workout app account</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}   
                  placeholder="Email Address" 
                  name="email" 
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                { errors.email && (<div className="invalid-feedback">{errors.email}</div>) }
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}   
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                { errors.password && (<div className="invalid-feedback">{errors.password}</div>) }
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4"/>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
  return { auth: state.auth, errors: state.errors }
}

export default connect(mapStateToProps, { loginUser })(Login);