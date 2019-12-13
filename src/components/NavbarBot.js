import React, { Component } from 'react';
import { withAuth } from './../lib/AuthProvider';
import { Link } from 'react-router-dom';


class NavbarBot extends Component {
    render() {
        const { user, isLoggedin } = this.props;

    
        return (
            <div style={{ height: '100px', position: 'fixed', bottom: 0, backgroundColor: 'pink'}}>
                { isLoggedin ? (

                    <div>
                        <Link to="/projects">
                            {' '}
                            <button>Projects</button>{' '}
                            </Link>

                            <br />
                            <Link to={`/user/${user._id}`}>
                            {' '}
                            <button>User Profile</button>{' '}
                        </Link>
                    </div>

                )  
                :
                (
                    <div style={{ height: '100px', position: 'fixed', backgroundColor: 'pink'}}>
                        <h1>HELLO NavbarBot</h1>
                    </div>
                )}


            </div>
        )
    }
}


export default withAuth(NavbarBot);