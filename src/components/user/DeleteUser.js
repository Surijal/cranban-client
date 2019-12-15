import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';

import userService from '../../lib/users-service';

class DeleteUser extends Component {

    constructor(props){
        super(props)

        this.state = {
            password: '',
            isShowing: false
        }
    }

        toggleForm = e => {
            this.setState({isShowing: !this.state.isShowing})
        }


        handleInput = e => {
            const { name, value } = e.target

            this.setState({[name]: value})
        }

        handleSubmit = e => {
            e.preventDefault()

            this.deleteUser()
        }


        deleteUser = () =>{
            const userId = this.props.user._id;
            console.log('>>>>>>>>>>>> USER PROFILE ID', this.props.user._id)

            userService.deleteUser(userId)
                .then( () => {
                    this.props.history.push('/')
                })
                .catch( err => console.log(err))
        }


    


    render() {
        return (
            <div>
                <button onClick={this.toggleForm}>Delete User Profile</button>

                {
                    !this.state.isShowing ?
                    null
                    :
                    <div>
                        <h2>Confirm your password to delete Profile</h2>

                        <form onSubmit={this.handleSubmit}>
                            <label>Password:</label>
                            <input
                                    type="password"
                                    name="password" 
                                    placeholder="password"
                                    id="" 
                                    value={this.state.password}
                                    onChange={ (e) => this.handleInput(e)}
                            />

                            <button>Delete Profile</button> 
                        </form>

                    </div>
                }

                
            </div>
        )
    }
}


export default withAuth(DeleteUser);