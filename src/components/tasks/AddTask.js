import React, { Component } from 'react'
import tasksService from './../../lib/tasks-service';


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


    createTask =  () => {
        const { title, description, deadline } = this.state;

        console.log('<<<<<<<<<<<<<<<<<<< ADDTASK COMPONENT PROPS ', this.props);

        tasksService.createTask({ title, description, deadline })
            .then( (newTask) => {
                this.setState({ title: '', description: '', deadline: null})
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
                                        >

                                    </textarea>
                                    <button>Submit</button>    
                                </form>
                            </div>
                        )

                    }
            </div>
        )
    }
}



export default AddTask;