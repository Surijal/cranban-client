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
        const { title, description, deadline, done, type } = this.state;
        const taskId = this.props.taskId;

        console.log('>>>>>>>>>>>>>> update tasl edittask state', this.state)

        if (!title && !description && !deadline && !done && !type ) return
        else {


            tasksService.updateTask({ title, description, deadline, done, type, taskId })
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
                })
                this.props.refreshTaskDetails();
            })
            .catch( err => console.log(err))
        }

        
    }
    
    
    render() {
    
        console.log('>>>>>>>>>>>>>> EDIT TASK STATE', this.state)
        console.log('>>>>>>>>>>>>>> EDIT TASK PROPS', this.props)
        const { title, description } = this.props.singleTask
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
                                        rows="5"
                                        value={this.state.description}
                                        onChange={ (e) => this.handleInput(e)}
                                    >
                                    {description}

                                    </textarea>

                                <label htmlFor="done">Done</label>
                                <input 
                                    type="checkbox"
                                    name='done'
                                    // checked=""
                                    id="done"
                                    // placeholder={this.state.done}
                                    value={this.state.done}
                                    onChange={ (e) => {
                                        this.handleInput(e)
                                        this.toggleChange(e)
                                    }}
                                    checked={this.state.done}
                                />

                                <label htmlFor="test">Status</label>
                                <select 
                                    type="text"
                                    name='type'
                                    id="testid"
                                    placeholder={this.state.type}
                                    defaultValue={this.state.type}
                                    // value={this.state.type}
                                    onChange={ (e) => this.handleInput(e)}
                                >
                                    <option >to do</option>
                                    <option >doing</option>
                                    <option >done</option>
                                    <option >testing</option>
                                    <option >backlog</option>
                                </select>

                                <label>Deadline:</label>
                                <input
                                        type="date"
                                        name="deadline" 
                                        placeholder="Deadline"
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