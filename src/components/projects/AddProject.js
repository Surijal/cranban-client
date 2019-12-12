import React, { Component } from 'react'

import { withAuth } from './../../lib/AuthProvider';
import projectsService from './../../lib/projects-service';



class AddProject extends Component {

    state = {
        title: '',
        description: '',
        deadline: null
    }



    handleInput = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault()

        // const { title, description, deadline } = this.req.body;
    
        this.createProject()
    }
    
    
    createProject = () => {
        const { title, description, deadline } = this.state;
        
        projectsService.createProject({ title, description, deadline })
            .then( (newProject) => {
                this.setState({ title: '', description: '', deadline: null});
                this.props.refreshProjectList()
            })
            .catch((err) => console.log(err))
    }


    render() {
        
        return (
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
                <button>Submit</button>    
            </form>
        )
    }
}



export default  withAuth(AddProject);