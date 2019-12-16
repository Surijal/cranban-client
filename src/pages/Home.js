import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <div>
                <Link to="/login">
                    {' '}
                    <button>Login</button>{' '}
                </Link>

                <Link to="/signup">
                    {' '}
                    <p>Sign up</p>{' '}
                </Link>

            </div>
        )
    }
}


export default  Home;