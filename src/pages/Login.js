import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="container mt-5">
        <div className="card card-color">
            <div className="card-header">
              <h1>Login</h1>
            </div>

              <div className="card-body">
                <form onSubmit={this.handleFormSubmit} autoComplete="off">

                  <div className="form-group">
                    <label htmlFor="login-username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      autoComplete="off"
                      onChange={this.handleChange}
                      id="login-username"
                      className="form-control"
                    />

                  </div>                

                  <div className="form-group">
                    <label htmlFor="login-password">Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      autoComplete="off"
                      onChange={this.handleChange}
                      id="login-password"
                      className="form-control"
                    />

                  </div>

                  <div className="d-flex justify-content-end">
                    <input type="submit" value="Login" autoComplete="off" className="btn btn-scondary"/>
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

export default withAuth(Login);
