import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import { withRouter } from 'react-router-dom';




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
            
            this.props.deleteUser()
                .then( () => {
                    
                    this.props.history.push('/')
                })
                .catch( err => console.log(err))
        }


    componentDidMount(){
        
    }


    render() {
        return (
            <div>
                <button onClick={this.toggleForm} className="btn btn-scondary">Delete User Profile</button>

                {
                    !this.state.isShowing ?
                    null
                    :
                    <div >
                        <h5>Confirm your password to delete Profile</h5>



                        <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="delete-user">Password:</label>
                            <input
                                    type="password"
                                    name="password" 
                                    placeholder="password"
                                    id="delete-user" 
                                    value={this.state.password}
                                    onChange={ (e) => this.handleInput(e)}
                                    className="form-control"
                            />

                        </div>

                            <button className="btn btn-scondary">Delete Profile</button> 
                        </form>

                    </div>
                }

                
            </div>
        )
    }
}


export default withRouter(withAuth(DeleteUser));