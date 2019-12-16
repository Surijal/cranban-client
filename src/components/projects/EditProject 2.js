import React, { Component } from 'react';

import { withAuth } from './../../lib/AuthProvider';
import projectsService from './../../lib/projects-service';


class EditProject extends Component {


    constructor(props) {
        super(props)
            this.state = {
                title: '',
                description: '',
                deadline: '',
                updatedProject: null,
                isShowing: false
            }
    }

    
    handleInput = e => {
        const { name, value } = e.target;
        
        this.setState({[name]: value})
    }


    handleSubmit = e => {
        e.preventDefault();

        this.updateProject();
    }

    toggleForm = () => {
        const { title, description, deadline } = this.props.singleProject

        this.setState({isShowing: !this.state.isShowing, title, description, deadline})
    }


    updateProject = () => {
        const { title, description, deadline } = this.state;
        const id  = this.props.projectId;
        
        
        projectsService.updateProject({ title, description, deadline, id })
            .then( updatedProject => {
                this.setState({
                                        title: '',
                                        description: '',
                                        deadline: '',
                                        updatedProject: null,
                                        isShowing: false
                                    })
                this.props.refreshProjectDetails();
            })
            .catch( err => console.log(err))
    }

    render() {
        return (
            <div>

                <button onClick={this.toggleForm} className="button">Edit Project</button>

                    {
                        !this.state.isShowing ?
                        null
                        :
                        (

                            <div>
                                <form onSubmit={this.handleSubmit} className="edit-form">
                                
                                <input 
                                        type="text"
                                        name='title'
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={ (e) => this.handleInput(e)}
                                    />

                                
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


                                    <input
                                            type="date"
                                            name="deadline" 
                                            placeholder="Deadline"
                                            value={this.state.deadline}
                                            onChange={ (e) => this.handleInput(e)}
                                        />

                                
                                <button className="button">Update Project</button>    
                                </form>
                            </div>
                        )
                    }
            </div>
        )
    }
}



export default withAuth(EditProject);