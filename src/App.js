import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
// import Private from './pages/Private';
import Navbar from './components/Navbar';
import ProjectsList from './pages/ProjectsList';
import ProjectDetails from './components/projects/ProjectDetails';
import UserProfile from './components/user/UserProfile';
import NavbarBot from './components/NavbarBot';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import './styles/navbot.css'
import TaskDetails from './components/tasks/TaskDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <NavbarBot />

          <Switch>
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            {/* <PrivateRoute exact path="/private" component={Private} /> */}
            <PrivateRoute exact path="/projects" component={ProjectsList} />
            <PrivateRoute exact path="/projects/:id" component={ProjectDetails} />
            <PrivateRoute exact path="/user/:id" component={UserProfile} />
            <PrivateRoute exact path="/projects/:id/tasks/:id" component={TaskDetails}/>
          </Switch>

      </div>
    );
  }
}

export default App;
