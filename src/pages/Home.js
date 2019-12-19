import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withAuth} from './../lib/AuthProvider'


class Home extends Component {
    render() {
        return (
            <div className="container mt-3 d-flex align-content-between" >

                <div className=" background-crane ">
                
                
                    {/* <img alt="crane" src="/images/crane.png"  className="backkground-crane" /> */}
                    <h2 className="m-5 p-3 text-center">Welcome <br></br>to Cranban</h2>

                    <div className="d-flex justify-content-around ">
                    
                        <Link to="/login">
                            {' '}
                            <button className="btn btn-secondary m-5">Login</button>{' '}
                        </Link>

                        <Link to="/signup">
                            {' '}
                            <button className="btn btn-secondary m-5">or Sign up</button>{' '}
                        </Link>
                    </div>
                </div>
            </div>

            
        )
    }
}


export default  withAuth(Home);