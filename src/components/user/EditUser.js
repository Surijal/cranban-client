import React, { Component } from 'react';

import { withAuth } from './../../lib/AuthProvider';
import userService from './../../lib/users-service';

import DeleteUser from './DeleteUser';


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


                    {
                        !this.state.isShowing ?
                        
                            <div className="d-flex justify-content-around">
                                <button onClick={this.toggleForm} className="btn btn-primary">Edit User</button>

                                <DeleteUser />
                            </div>
                        :
                        (

                            <div>
                                <form onSubmit={this.handleSubmit}>

                                <div className="form-group mt-3">
                                    <label for="edit-name">Name:</label>
                                    <input 
                                            type="text"
                                            name='username'
                                            id="edit-name"
                                            className="form-control"
                                            placeholder={this.props.user.username}
                                            value={this.state.username}
                                            onChange={ (e) => this.handleInput(e)}
                                        />
                                </div>

                                <div className="form-group mt-3">
                                    <label id="edit-email">Email:</label>
                                    <input
                                            type="text"
                                            name="email"
                                            id="edit-email"
                                            className="form-control"
                                            placeholder={this.props.user.email}
                                            value={this.state.email}
                                            onChange={ (e) => this.handleInput(e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label id="edit-password">Password:</label>
                                    <input
                                            type="password"
                                            name="password"
                                            id="edit-password"
                                            className="form-control"
                                            placeholder="password"                                           
                                            value={this.state.password}
                                            onChange={ (e) => this.handleInput(e)}
                                    />
                                </div>

                                <div className="d-flex justify-content-around">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        onclick={ () => {
                                                        this.getUserById()
                                                        this.toggleForm()
                                        }}
                                >
                                        Update
                                    </button>    
                                </div>
                                </form>
                            </div>
                        )
                    }
            </div>
        )
    }
}


export default withAuth(EditUser);