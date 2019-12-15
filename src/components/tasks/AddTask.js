import React, { Component } from 'react'

import tasksService from './../../lib/tasks-service';
import { withAuth } from './../../lib/AuthProvider';


class AddTask extends Component {
        
    constructor(props){
        super(props)
        
        this.state = {
            title: '',
            description: '',
            deadline: '',
            isShowing: false
        }
    }



    handleChange = e => {
        const {name, value } = e.target

        this.setState({[name]:value})
    }
    

    handleSubmit = e => {
        e.preventDefault()

        this.createTask()
    }


    toggleForm = e => {
        this.setState({ isShowing: !this.state.isShowing})
    }


    createTask =  (newTask) => {
        const { title, description, deadline } = this.state;
        const projectId = this.props.projectId;

        
        tasksService.createTask({ title, description, deadline, projectId })
            .then( (newTask) => {
                this.setState({ title: '', description: '', deadline: '', isShowing: false})
                this.props.refreshSingleProject(newTask)
            })
            .catch(err => console.log(err))
    }   


    render() {
        return (
            <div>
                <button onClick={this.toggleForm}>Add Task</button>

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
                                            onChange={ (e) =>this.handleChange(e)}
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
                                            onChange={ (e) => this.handleChange(e)}
                                        />

                                    <label>Deadline:</label>
                                    <input
                                            type="date"
                                            name="deadline" 
                                            placeholder="Deadline"
                                            value={this.state.deadline}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    
                                    <button>Submit</button>    
                                </form>
                            </div>
                        )

                    }
            </div>
        )
    }
}



export default withAuth(AddTask);