import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import tasksService from '../../lib/tasks-service';


class EditTask extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: "",
            description: "",
            deadline: '',
            isShowing: null,
            done: false,
            type: '',
            status: '',
            singleTask: {}
        }
    }


    handleInput = e => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }


    handleSubmit = e => {
        e.preventDefault();

        this.updateTask()
    }


    toggleForm = () => {
        this.setState({ isShowing: !this.state.isShowing })
    }

    toggleChange = () => {
        this.setState({ done: !this.state.done})
    }


    updateTask = () => {
        const { title, description, deadline, done, type, status } = this.state;
        const taskId = this.props.taskId;

        console.log('>>>>>>>>>>>>>> update tasl edittask state', this.state)

        if (!title && !description && !deadline && !done && !type ) return
        else {


            tasksService.updateTask({ title, description, deadline, done, type, status, taskId })
            .then( updatedTasks => {
                this.setState({
                    title: '',
                    description: '',
                    deadline: '',
                    updatedProject: null,
                    isShowing: false,
                    isChecked: false,
                    done: false,
                    type: '',
                    status: ''
                })
                this.props.refreshTaskDetails();
            })
            .catch( err => console.log(err))
        }

        
    }
    
    
    render() {
    
        console.log('>>>>>>>>>>>>>> EDIT TASK STATE', this.state)
        console.log('>>>>>>>>>>>>>> EDIT TASK PROPS', this.props)
        const { title, description, type, status, deadline, done } = this.props.singleTask
        return (
            <div>

                <button onClick={this.toggleForm}>Edit Task</button>

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
                                        // defaultValue={title}
                                        value={this.state.title}
                                        onChange={ (e) => this.handleInput(e)}
                                    />

                                <label>Description:</label>
                                <textarea
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        id="" 
                                        cols="30" 
                                        rows="5"
                                        // defaultValue={description}
                                        onChange={ (e) => this.handleInput(e)}
                                    >
                                    {description}

                                    </textarea>

                                <label htmlFor="done">Done</label>
                                <input 
                                    type="checkbox"
                                    name='done'
                                    id="done"
                                    defaultValue={done}
                                    onChange={ (e) => {
                                        this.handleInput(e)
                                        this.toggleChange(e)
                                    }}
                                    checked={this.state.done}
                                />

                                <label htmlFor="status">Status</label>
                                <select 
                                    type="text"
                                    name='status'
                                    id="status"
                                    
                                    // defaultValue={status}
                                    value={this.state.type}
                                    onChange={ (e) => this.handleInput(e)}
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
                                    
                                    // defaultValue={type}
                                    value={this.state.type}
                                    onChange={ (e) => this.handleInput(e)}
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
                                        // defaultValue={deadline}
                                        value={this.state.deadline}
                                        onChange={ (e) => this.handleInput(e)}
                                    />
                                
                                <button>Update</button>    
                                </form>
                            </div>
                        )
                    }
            </div>
        )
    }
}


export default withAuth(EditTask);