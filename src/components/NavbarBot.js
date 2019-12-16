import React, { Component } from 'react';
import { withAuth } from './../lib/AuthProvider';
import { Link } from 'react-router-dom';




class NavbarBot extends Component {
    render() {
        const { user, isLoggedin, logout } = this.props;

    
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
                        <button onClick={logout}>Logout</button>

                    </div>

                )  
                :
                (
                    <div className="navbot">
                        
                    </div>
                )}


            </div>
        )
    }
}


export default withAuth(NavbarBot);