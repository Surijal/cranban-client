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

                <button onClick={this.toggleForm} className="btn btn-primary mr-3 ml-3 ml-3">Edit</button>

                    {
                        !this.state.isShowing ?
                        null
                        :
                        (

                            <div className="card mt-3 mb-3">

                            <h5 className="card-header">Edit Project</h5>
                                <form onSubmit={this.handleSubmit} className="form-group">
                                
                                    <div className="card-body">
                                    
                                        <input 
                                                className="card-title form-control mt-3 mb-3"
                                                type="text"
                                                name='title'
                                                placeholder="Title"
                                                value={this.state.title}
                                                onChange={ (e) => this.handleInput(e)}
                                            />

                                        
                                        <textarea
                                                className="form-control"
                                                type="text"
                                                name="description" 
                                                placeholder="Description"
                                                id="" 
                                                rows="4"
                                                value={this.state.description}
                                                onChange={ (e) => this.handleInput(e)}
                                            />


                                            <input
                                                    className="form-control"
                                                    type="date"
                                                    name="deadline" 
                                                    placeholder="Deadline"
                                                    value={this.state.deadline}
                                                    onChange={ (e) => this.handleInput(e)}
                                                />

                                        
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        )
                    }
            </div>
        )
    }
}



export default withAuth(EditProject);