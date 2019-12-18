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
                            
                                    <Link to={`/user/${user._id}`} className="nav-link nav-brand">
                                    {' '}
                                    <img alt="profile" src="/images/person.png" width="30px" height="30px"></img>
                                    {' '}
                                    </Link>
                                
                                    <Link to="/projects" className="nav-link nav-brand">
                                    {' '}
                                    <img alt="projects" src="/images/week.png" width="30px" height="30px"></img>
                                    {' '}
                                    </Link>
                                

{/*                         
                                    <Link to="/projects" className="nav-link nav-brand">
                                    {' '}
                                    Graph{' '}
                                    </Link>
                        

                                
                                
                                    <Link to={`/projects`}  className="nav-link nav-brand">
                                    {' '}
                                        Add{' '}
                                    </Link> */}
                            
                            
                        </nav>
                        
    
                )  
                :
                (
                    <nav className="navbar  navbar-light bg-light fixed-bottom">
                        
                    </nav>
                )}

            </div>
            
            
        )
    }
}


export default withAuth(NavbarBot);