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
            <div>

                <h1>UserProfile</h1>
                <h1>{this.state.username}</h1>
                <p>{this.state.email}</p>

                <EditUser />
            </div>
        )
    }
}


export default withAuth(UserProfile)