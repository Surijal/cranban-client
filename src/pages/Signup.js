import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

class Signup extends Component {
  state = { 
                username: '', 
                password: '',
                email: ""
                };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup({ username, password, email }); // props.signup is Provided by withAuth() and Context API
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, email } = this.state;
    return (
      <div className="container mt-3">
        <div className="card">
          <div className="card-header">
              <h1>Sign Up</h1>
          </div>

          <div className="card-body">
              <form onSubmit={this.handleFormSubmit}  autoComplete="off">

                <div className="form-group">
                  <label htmlFor="signup-username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      autoComplete="off"
                      onChange={this.handleChange}
                      id="signup-username"
                      className="form-control"
                    />

                </div>

                <div className="form-group">
                  <label htmlFor="signup-email">email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    autoComplete="off"
                    onChange={this.handleChange}
                    id="signup-email"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    autoComplete="off"
                    onChange={this.handleChange}
                    id="signup-password"
                    className="form-control"
                  />
                </div>


                <div className="d-flex justify-content-between">
                  <div>
                    <input type="submit" value="Signup" autoComplete="off" className="btn btn-primary mt-3"/>

                  </div>

                  <div>
                    <p>Already have account?</p>
                    <Link to={'/login'}> Login</Link>

                  </div>

                </div>
              </form>


          </div>
              <div className="card-footer d-flex justify-content-end">

            <Link to={'/'}> Back</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
