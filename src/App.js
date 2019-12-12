import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import Navbar from './components/Navbar';
import ProjectsList from './pages/ProjectsList';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Basic React Authentication</h1>

        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} />
          <PrivateRoute exact path="/projects" component={ProjectsList} />
          {/* <PrivateRoute exact path="/" component={Overview} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
