import React, { Component } from 'react';

import { withAuth } from './../../lib/AuthProvider';
import projectsService from './../../lib/projects-service';


class EditProject extends Component {


    constructor(props) {
        super(props)
            this.state = {
                title: '',
                description: '',
                deadline: null,
                updatedProject: null
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


    updateProject = () => {
        const { title, description, deadline } = this.state;
        const id  = this.props.projectId;
        
        console.log('>>>>>>>>>>>>>>> COMPONENT', this.props.projectId);
        
        projectsService.updateProject({ title, description, deadline, id })
            .then( updatedProject => {
                this.setState({
                                        title: '',
                                        description: '',
                                        deadline: null,
                                        updatedProject: null
                                    })
                this.props.refreshProjectDetails();
            })
            .catch( err => console.log(err))
    }

    render() {
        return (
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
                    >

                </textarea>
                <button>Update</button>    
            </form>
            </div>
        )
    }
}



export default withAuth(EditProject);