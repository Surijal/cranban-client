import React, { Component } from 'react'

import { withAuth } from './../../lib/AuthProvider';
import projectsService from './../../lib/projects-service';



class AddProject extends Component {

    state = {
        title: '',
        description: '',
        deadline: '',
        isShowing: false
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
    
        this.createProject()
    }
    
    
    createProject = () => {
        const { title, description, deadline } = this.state;
        
        
        projectsService.createProject({ title, description, deadline })
            .then( (newProject) => {
                this.setState({ title: '', description: '', deadline: '', isShowing: false});
                this.props.refreshProjectList()
            })
            .catch((err) => console.log(err))
    }


    render() {
        
        return (
            <div>
                <button onClick={this.toggleForm} className="btn btn-primary">Add Project</button>

                {
                    !this.state.isShowing ?
                    null
                    :
                    (
                    
                        <form onSubmit={this.handleSubmit}  className="edit-form">
                            <label>Title:</label>
                            <input 
                                    type="text"
                                    name='title'
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={ (e) => this.handleInput(e)}
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
                                    onChange={ (e) => this.handleInput(e)}
                                />

                            <label>Deadline:</label>
                            <input
                                    type="date"
                                    name="deadline" 
                                    placeholder="Deadline"
                                    value={this.state.deadline}
                                    onChange={ (e) => this.handleInput(e)}
                                />

                            <button className="button">Submit</button>    
                        </form>
                    )
                }
            </div>

        )
    }
}



export default  withAuth(AddProject);