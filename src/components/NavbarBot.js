import React, { Component } from 'react';
import { withAuth } from './../lib/AuthProvider';
import { Link, withRouter } from 'react-router-dom';




class NavbarBot extends Component {


    goBack = () => {

        this.props.history.goBack()
    }


    render() {
        const { user, isLoggedin } = this.props;

        
        return (

            <div>

            
            { isLoggedin ? (
                
                    <nav className="navbar  navbar-light fixed-bottom navbar-color">
                            
                                    <Link to={`/user/${user._id}`} className="nav-link nav-brand">
                                    {' '}
                                    <img alt="profile" src="/images/person.png" width="30px" height="30px"></img>
                                    {' '}
                                    </Link>


                                    {
                                    
                                    <button className="nav-link nav-brand back-image" onClick={this.goBack}>
                                    {' '}
                                    
                                    {' '}
                                    </button>
                                
                                    }
                                    <Link to="/projects" className="nav-link nav-brand">
                                    {' '}
                                    <img alt="projects" src="/images/week.png" width="30px" height="30px"></img>
                                    {' '}
                                    </Link>
                                

{/*                         
                                
                        

                                
                                
                                    <Link to={`/projects`}  className="nav-link nav-brand">
                                    {' '}
                                        Add{' '}
                                    </Link> */}
                            
                            
                        </nav>
                        
    
                )  
                :
                (
                    <nav className="navbar  navbar-light  fixed-bottom navbar-color">
                        <Link to={`/login`} className="nav-link nav-brand">
                            {' '}
                            <img alt="profile" src="/images/person.png" width="30px" height="30px"></img>
                            {' '}
                            </Link>
                        
                    </nav>
                )}

            </div>
            
            
        )
    }
}


export default withRouter(withAuth(NavbarBot));