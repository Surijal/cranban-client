//	lib/AuthProvider.js

import React from 'react';
import authService from './auth-service'; // IMPORT functions for axios requests to API
import userService from '../lib/users-service';
const { Consumer, Provider } = React.createContext();


// HOC to create Consumer
const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* <Consumer> component provides callback which receives Providers "value" object */}
          {/* (value) => { <WrappedComponent />}  */}
          {({ login, signup, user, logout, isLoggedin, isLoading, deleteUser }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                isLoading={isLoading}
                deleteUser={deleteUser}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true };

  componentDidMount() {
    authService
      .me()
      .then(user =>
        this.setState({ isLoggedin: true, user: user, isLoading: false }),
      )
      .catch(err =>
        this.setState({ isLoggedin: false, user: null, isLoading: false }),
      );
  }


  deleteUser = () => {

    const userId = this.state.user._id

    return userService.deleteUser(userId)
                .then( () => {
        this.setState({ isLoggedin: false, user: null, isLoading: false })
        
    })
    .catch( err => console.log(err))                
  }

  signup = user => {
    const { username, password, email } = user;

    authService
      .signup({ username, password, email })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  login = user => {
    const { username, password } = user;
    

    authService
      .login({ username, password })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch(err => console.log(err));
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup, deleteUser } = this;

    return (
      <Provider value={{ isLoading, isLoggedin, user, login, logout, signup, deleteUser }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };

export default AuthProvider;