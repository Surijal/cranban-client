import React, { Component } from 'react';
import { withAuth } from './../lib/AuthProvider';
import { Link } from 'react-router-dom';




class NavbarBot extends Component {
    render() {
        const { user, isLoggedin } = this.props;

    
        return (

                <div>
                    { isLoggedin ? (
                    <nav className="navbar  navbar-light bg-light fixed-bottom">

                        <div className="collapse navbar-collapse container " id="navbarSupportedContent">
                            <ul className='navbar-nav mr-auto'>
                                <li className="nav-item active">
                                    <Link to={`/user/${user._id}`} className="nav-link">
                                    {' '}
                                    User Profile{' '}
                                    </Link>
                                </li>

                                <li className="nav-item active">
                                    <Link to="/projects" className="nav-link">
                                    {' '}
                                    Projects{' '}
                                    </Link>
                                </li>    

                                <li className="nav-item active">
                                    <Link to="/projects" className="nav-link">
                                    {' '}
                                    Graph{' '}
                                    </Link>
                                </li>

                                <li className="nav-item active">
                                
                                    <Link to={`/projects`}  className="nav-link">
                                    {' '}
                                        ProAddject{' '}
                                    </Link>
                                </li>
                            </ul>
                            

                        </div>
                    </nav>
    
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