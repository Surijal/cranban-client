import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import tasksService from '../../lib/tasks-service';


class EditTask extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: "",
            description: "",
            deadline: '',
            isShowing: null
        }
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
        const { title, description, deadline } = this.state;
        const taskId = this.props.taskId;

        tasksService.updateTask({ title, description, deadline, taskId })
            .then( updatedTasks => {
                this.setState({
                    title: '',
                    description: '',
                    deadline: null,
                    updatedProject: null,
                    isShowing: false
                })
                this.props.refreshTaskDetails();
            })
            .catch( err => console.log(err))
    }


    render() {
        return (
            <div>

                <button onClick={this.toggleForm}>Edit Task</button>

                    {
                        !this.state.isShowing ?
                        null
                        :
                        (

                            <div>
                                <form onSubmit={this.handleSubmit}>
                                <label>Title:</label>
                                <input 
                                        type="text"
                                        name='title'
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={this.handleInput}
                                    />

                                <label>Description:</label>
                                <textarea
                                        type="text"
                                        name="description" 
                                        placeholder="Description"
                                        id="" 
                                        cols="30" 
                                        rows="10"
                                        value={this.state.description}
                                        onChange={this.handleInput}
                                    />

                                <label>Deadline:</label>
                                <input
                                        type="date"
                                        name="deadline" 
                                        placeholder="Deadline"
                                        value={this.state.deadline}
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


export default withAuth(EditTask);