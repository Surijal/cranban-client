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
            isShowing: false,
            type: '',
            status: '',
            done: false
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
        const { title, description, deadline, status, type, done } = this.state;
        const projectId = this.props.projectId;

        
        tasksService.createTask({ title, description, deadline, projectId, status,type, done })
            .then( (newTask) => {
                this.setState({ title: '', description: '', deadline: '', isShowing: false})
                this.props.refreshSingleProject(newTask)
            })
            .catch(err => console.log(err))
    }   


    render() {
        return (
            <div>
                <button onClick={this.toggleForm} className="btn btn-primary mr-3 ml-3">Add Task</button>

                    {
                        !this.state.isShowing ?
                        null
                        :
                        (
                            <div className="card mt-3 mb-3">
                                <h5 className="card-header">Add Task</h5>
                                <form onSubmit={this.handleSubmit} 
                                    className="form-group">
                                    
                                    <div className="card-body">
                                        <input
                                                className="form-control mb-3"
                                                type="text"
                                                name='title'
                                                placeholder="Title"
                                                value={this.state.title}
                                                onChange={ (e) =>this.handleChange(e)}
                                            />

                                        
                                        <textarea
                                                className="form-control"
                                                type="text"
                                                name="description" 
                                                placeholder="Description"
                                                id="" 
                                                
                                                rows="4"
                                                value={this.state.description}
                                                onChange={ (e) => this.handleChange(e)}
                                            />

                                    <label htmlFor="status">Status</label>
                                    <select
                                        className="form-control"
                                        type="text"
                                        name='status'
                                        id="status"
                                        
                                        defaultValue='to do'
                                        // value={this.state.type}
                                        onChange={ (e) => this.handleChange(e)}
                                    >
                                        <option >to do</option>
                                        <option >doing</option>
                                        <option >done</option>
                                        <option >testing</option>
                                        <option >backlog</option>
                                    </select>

                                    <label htmlFor="type">Type {this.props.type}</label>
                                    <select 
                                        type="text"
                                        name='type'
                                        id="testid"
                                        
                                        defaultValue='preperation'
                                        // value={this.state.type}
                                        onChange={ (e) => this.handleChange(e)}
                                    >
                                        <option >frontend</option>
                                        <option >backend</option>
                                        <option >styles</option>
                                        <option >preperation</option>
                                    </select>

                                        <label>Deadline:</label>
                                        <input
                                                type="date"
                                                name="deadline" 
                                                placeholder="Deadline"
                                                value={this.state.deadline}
                                                onChange={ (e) => this.handleChange(e)}
                                            />
                                        
                                        <button>Submit</button>  
                                    </div>  
                                </form>
                            </div>
                        )

                    }
            </div>
        )
    }
}



export default withAuth(AddTask);