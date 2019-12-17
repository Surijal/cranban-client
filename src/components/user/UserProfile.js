import React, { Component } from 'react';
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
        return (
            <div className="container">

                <div className="card mt-3">
                    <div className="card-header">
                        <h3 className="card-title">Profile:</h3>

                    </div>    

                    <div className="card-body">
                        <h4 className="card-title mb-0">{this.state.username}</h4>
                        <p className="card-text">Name</p>
                        <p className="card-title mb-0">{this.state.email}</p>
                        <p className="card-text">Email</p>
                    </div>

                    

                    
                    <div className="card-footer">
                        <EditUser />

                    </div>
                </div>

            </div>
        )
    }
}


export default withAuth(UserProfile)