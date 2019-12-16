import React, { Component } from 'react';
import { withAuth } from './../lib/AuthProvider';
import { Link } from 'react-router-dom';

import AddProject from './projects/AddProject';


class NavbarBot extends Component {
    render() {
        const { user, isLoggedin } = this.props;

    
        return (
            <div >
                { isLoggedin ? (

                    <div className='navbot'>
                        <div className='nav-user-profile-link'>
                            <Link to={`/user/${user._id}`}>
                            {' '}
                            <button>User Profile</button>{' '}
                            </Link>
                        </div>

                        <div className='nav-projects-link'>
                            <Link to="/projects">
                            {' '}
                            <button>Projects</button>{' '}
                            </Link>
                        </div>    

                        <div className='nav-graph-link'>
                            <Link to="/projects">
                            {' '}
                            <button>Graph</button>{' '}
                            </Link>
                        </div>

                        <div className='nav-add-project-link'>
                        
                            <Link to={`/projects`}  className='nav-add-project-link'>
                            {' '}
                            <button> ProAddject</button>{' '}
                            </Link>
                        </div>
                    </div>

                )  
                :
                (
                    <div className="navbot">
                        <h1>HELLO NavbarBot</h1>
                    </div>
                )}


            </div>
        )
    }
}


export default withAuth(NavbarBot);