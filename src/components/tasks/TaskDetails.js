import React, { Component } from 'react';

import tasksService from './../../lib/tasks-service';
import EditTask from './EditTask';



class TaskDetails extends Component {
        
        constructor(props) {
            super(props)
                this.state = {
                    title: '',
                    description: '',
                    deadline: null,
                    projectTasks: null,
                    taskId: '',
                    projectId: '',
                    done: '',
                    type: '',
                    status: '',
                    singleTask: {}

                }
        }
    
        
        getSingleTask = () => {
            
            
            const {id} = this.props.match.params
            
            tasksService.getSingleTask(id)
            .then( singleTask => {
                
                this.setState({
                    title: singleTask.title,
                    description: singleTask.description,
                    deadline: singleTask.deadline,
                    taskId: singleTask._id,
                    projectId: singleTask.project,
                    done: singleTask.done,
                    type: singleTask.type,
                    singleTask: singleTask,
                    status: singleTask.status
                })
                
                
                this.convertDate()
            })
            .catch( err => console.log(err))
        }
        
    
        
        getProjectTask = () => {
            const { projectId, taskId } = this.props
            
            tasksService.getTasksByProject({ projectId, taskId })
                .then( singleTask => {
                    
                    this.setState({singleTask})
                })
                .catch( err => console.log(err))
        }

        convertDate = () => {
            const newDate = this.state.deadline
            const parsedDate = new Date (newDate)

            var newDeadline = parsedDate.toISOString().substring( 0, 10)
            this.setState({deadline: newDeadline})
        }

        

        componentDidMount(){
            
            this.getSingleTask()
        }


    render() {

        
        const { title, description, deadline, taskId, status, type, done } = this.state;
        const singleTask = { title, description, deadline, taskId , status, type, done} 

        return (
            <div className="container mt-5 container-color">
                        <div className="card card-color">

                        <div className="card-header">
                    
                            <div className="d-flex justify-content-center">
                                <EditTask
                                        className="button"
                                        taskId={taskId} 
                                        refreshTaskDetails={this.getSingleTask} 
                                        {...this.props} 
                                        singleTask={singleTask}/>

                            </div>

                        </div>

                        <div className="card-body">
                            <h2 className="card-title">{title}</h2>
                            <p className="card-text"> {description}</p>
                            <p>Deadline: {this.state.deadline}</p>
                            

                        </div>

                        <div className="card-footer">

                            <p>{status}</p>
                            <p>{type}</p>

                        </div>
                            
                            
                        </div>
                                
                            

            </div>
        )
    }
}


export default  TaskDetails;