import React, { Component } from 'react';
import { withAuth } from '../../lib/AuthProvider';
import tasksService from '../../lib/tasks-service';


class EditTask extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: "",
            description: "",
            deadline: "",
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
        const { description, title, deadline, done, type, status } = this.props.singleTask;

        this.setState({ isShowing: !this.state.isShowing,  description, title, deadline, done, type, status })
        this.convertDate()
    }

    toggleChange = () => {
        this.setState({ done: !this.state.done})
    }

    deleteTask = () => {
        const  id  = this.props.match.params.id
        
        
        tasksService.deleteTask(id)
        .then( (deleteTask) => {
                
                this.props.history.goBack()
            })
            .catch( err => console.log(err))
    }

    
    convertDate = () => {
        const newDate = this.props.singleTask.deadline
        const parsedDate = new Date (newDate)
        
        var newDeadline = parsedDate.toISOString().substring( 0, 10)
        this.setState({deadline: newDeadline})
    }


    updateTask = () => {
        const { title, description, deadline, done, type, status } = this.state;
        const taskId = this.props.taskId;

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
                }, () => this.props.history.goBack())
            })
            .catch( err => console.log(err))
        }

        
    }

    componentDidMount(){
        const { deadline, description, title, type, status } = this.props.singleTask

        this.setState({ deadline, description, title, type, status })
        this.convertDate()
    }
    
    
    render() {
    
        const { description } = this.props.singleTask
        return (
            <div>

                
                    {
                        !this.state.isShowing ?
                        
                        <button onClick={this.toggleForm}  className='btn btn-primary'>Edit Task</button>


                        :
                        (

                            <div className="card mt-3">
                                <form onSubmit={this.handleSubmit}>
                                
                                <div className="card-header">
                                    Edit Task:
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <input 
                                                type="text"
                                                name='title'
                                                className="form-control"
                                                // defaultValue={title}
                                                value={this.state.title}
                                                onChange={ (e) => this.handleInput(e)}
                                            />

                                    </div>

                                    <div className="form-group mt-3">
                                        <textarea
                                                className="form-control"
                                                type="text"
                                                name="description"
                                                value={this.state.description}
                                                id="" 
                                                cols="30" 
                                                rows="4"
                                                // defaultValue={description}
                                                onChange={ (e) => this.handleInput(e)}
                                            >
                                            {description}

                                        </textarea>
                                            
                                    {/* <div className="form-group">
                                        <label htmlFor="done">Done</label>
                                        <input
                                            className="form-control"
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
                                    </div> */}

                                    <div className="form-group mt-3">
                                        
                                        <select
                                            className="custom-select form-control"
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
                                    </div>

                                    <div className="form-group mt-3 mb-3">
                                    
                                        <select 
                                            type="text"
                                            name='type'
                                            id="testid"
                                            className="custom-select form-control"
                                            
                                            value={this.state.type}
                                            onChange={ (e) => this.handleInput(e)}
                                        >
                                            <option >frontend</option>
                                            <option >backend</option>
                                            <option >styles</option>
                                            <option >preperation</option>
                                        </select>
                                    </div>

                                    <div className="form-group mt-3">
                                    
                                        <input
                                                type="date"
                                                name="deadline" 
                                                placeholder="Deadline"
                                                className="form-control custom-select"
                                                value={this.state.deadline}
                                                onChange={ (e) => this.handleInput(e)}
                                            />
                                    </div>

                                    </div>
                                </div>






                                <div className="card-footer d-flex justify-content-around">
                                    <button className='btn btn-primary'>Submit</button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={ () => this.deleteTask() }
                                    >
                                    Delete Task
                                </button>    
                                    </div>
                                </form>
                                
                            </div>
                        )
                    }
            </div>
        )
    }
}


export default withAuth(EditTask);