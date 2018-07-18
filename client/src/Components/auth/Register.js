import React, {Component} from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      username: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }

    axios.post('/users/register', newUser)
      .then(result => console.log(result.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    // errors object
    const { errors } = this.state;

    return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Register New Account</h1>
            <p className="lead text-center">Create your workout app account</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                 type="text" 
                 className="form-control form-control-lg" 
                 placeholder="Name" 
                 name="name" 
                 value={this.state.name}
                 onChange={this.onChange}
                 required
                />
              </div>
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
                  className="form-control form-control-lg" 
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username
                  })}  
                  placeholder="Username" 
                  name="username" 
                  value={this.state.username}
                  onChange={this.onChange}
                  required
                />
                { errors.username && (<div className="invalid-feedback">{errors.username}</div>) }
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

export default Register;