import React, { Component } from 'react'


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


    createProject = () => {
        const { title, description, deadline } = this.req.body;

        projectsService.createProject()
            .then( () => {
                this.setState( { title, description, deadline })
            })
            .then(() =>{
                this.setState({ title: '', description: '', deadline: null})
            })
            .catch((err) => console.log(err))
    }


    render() {
        return (
            <form action="">
                <label>Titel:</label>
                <input 
                        type="text"
                        name='titel'
                        placeholder="Titel"
                        value={this.state.titel}
                        onChange={this.handleInput}
                    />

                <label>Description:</label>
                <textarea 
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


export default  AddProject;