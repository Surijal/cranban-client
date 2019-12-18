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

    componentDidMount(){
        
    }

    render() {

        return (
            <div>


                    {
                        !this.state.isShowing ?
                        
                            <div className="d-flex justify-content-around">
                                <button onClick={this.toggleForm} className="btn btn-scondary">Edit User</button>

                                <DeleteUser />
                            </div>
                        :
                        (

                            <div>
                                <form onSubmit={this.handleSubmit}>

                                <div className="form-group mt-3">
                                    <label htmlFor="edit-name">Name:</label>
                                    <input 
                                            type="text"
                                            name='username'
                                            id="edit-name"
                                            autoComplete="off"
                                            className="form-control"
                                            placeholder={this.props.user.username}
                                            value={this.state.username}
                                            onChange={ (e) => this.handleInput(e)}
                                        />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="edit-email">Email:</label>
                                    <input
                                            type="text"
                                            name="email"
                                            id="edit-email"
                                            autoComplete="off"
                                            className="form-control"
                                            placeholder="email"
                                            value={this.state.email}
                                            onChange={ (e) => this.handleInput(e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-password">Password:</label>
                                    <input
                                            type="password"
                                            name="password"
                                            autoComplete="off"
                                            id="edit-password"
                                            className="form-control"
                                            placeholder="password"                                           
                                            value={this.state.password}
                                            onChange={ (e) => this.handleInput(e)}
                                    />
                                </div>

                                <div className="d-flex justify-content-around form-group">
                                    <button 
                                        type="submit" 
                                        className="btn btn-scondary form-control"
                                        onClick={ () => {
                                                        // this.getUserById()
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