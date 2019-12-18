import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withAuth } from '../../lib/AuthProvider';
import userService from '../../lib/users-service';

import EditUser from './EditUser';



class UserProfile extends Component {

    constructor(props){
        super(props)

        this.state ={
            username: "",
            password: '',
            email: '',
            isShowing: ''
        }
    }

    getUserById = () => {
        const id = this.props.match.params.id;

        userService.getUserById(id)
            .then( singleUser => {
                const { username, password, email } = singleUser;

                this.setState({ username, password, email } )
            })
            .catch( err => console.log(err))
    }


    componentDidMount() {
        this.getUserById()
    }


    render() {
        const { logout } = this.props;
        return (


            <div className="container">

                <div className="card mt-3">
                    <div className="card-header">
                        <h3 className="card-title">Profile:</h3>

                    </div>    

                    <div className="card-body">
                        <h4 className="card-title">{this.state.username}</h4>
                        
                        <p className="card-title mb-0">{this.state.email}</p>
                
                    </div>

                    

                    
                    <div className="card-footer">
                        <EditUser refreshUserProfile={this.getUserById}/>

                    </div>
                </div>

                <div className="d-flex align-content-end">
                    <Link to="/home">
                    {' '}
                    <button className="btn btn-primary mt-3" onClick={logout}>Logout</button>{' '}
                    </Link>
                </div>

            </div>
        )
    }
}


export default withAuth(UserProfile)