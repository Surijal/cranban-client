import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';


class EditTask extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: "",
            description: "",
            deadline: null,
            isShowing: null
        }


        handleInput = e => {
            const { name, value } = e.target;
            this.setState({[name]: value})
        }


        handleSubmit = e => {
            e.preventDefault();

            this.updateTask()
        }


        toggleForm = () => {
            this.setState({ isShowing: !this.state.isShowing })
        }


        updateTask = () => {

        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}


export default withAuth(EditTask);