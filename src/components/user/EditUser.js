import React, { Component } from 'react';

import { withAuth } from './../../lib/AuthProvider';
import userService from './../../lib/users-service';


class EditUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
            isShowing: ''
        }
    }


    toggleForm = () => {
        this.setState({isShowing: !this.state.isShowing})
    }


    handleInput = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault()

        this.patchUser();
    }


    patchUser = () => {
        const { username, password, email } = this.state;
        const id = this.props.user._id;
        
        // const id = this.props.match.params;

        userService.patchUser( { username, password, email, id } )
            .then( updatedUser => {

                this.setState({username: '', password: '', email: ''})
            })
            .catch( err => console.log(err))
    }



    render() {
        return (
            <div>

                <button onClick={this.toggleForm}>Edit User</button>

                    {
                        !this.state.isShowing ?
                        null
                        :
                        (

                            <div>
                                <form onSubmit={this.handleSubmit}>
                                <label>username:</label>
                                <input 
                                        type="text"
                                        name='username'
                                        placeholder={this.state.username}
                                        value={this.state.username}
                                        onChange={this.handleInput}
                                    />

                                <label>Description:</label>
                                <input
                                        type="text"
                                        name="email" 
                                        placeholder="email"
                                        id="" 
                                        value={this.state.email}
                                        onChange={this.handleInput}
                                />

                                <button>Update</button>    
                                </form>
                            </div>
                        )
                    }
            </div>
        )
    }
}


export default withAuth(EditUser);