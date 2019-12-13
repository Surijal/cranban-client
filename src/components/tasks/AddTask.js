import React, { Component } from 'react'
import tasksService from './../../lib/tasks-service';


export default class AddTask extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            deadline: ''
        }
    }

    handleInput = e => {
        const {name, value } = e.target

        this.setState({[name]:value})
    }
    

    handleSubmit = e => {
        e.preventDefault()

        this.createTask()
    }


    createTask =  () => {
        const { title, description, deadline } = this.state;

        tasksService.AddTask({ title, description, deadline })
            .then( () => {
                this.setState({ title: '', description: '', deadline: null})
            })
            .catch(err => console.log(err))
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
                <button>Add Project</button>    
            </form>
        )
    }
}
