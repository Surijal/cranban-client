import React, { Component } from 'react';

import tasksService from './../../lib/tasks-service';
import EditTask from './EditTask';



class TaskDetails extends Component {
        
        constructor(props) {
            super(props)
                this.state = {
                    title: '',
                    description: '',
                    deadline: '',
                    projectTasks: null,
                    taskId: '',
                    projectId: '',
                    done: '',
                    type: '',
                    singleTask: {}

                }
        }
    

        getSingleTask = () => {
        

        const {id} = this.props.match.params
        
        tasksService.getSingleTask(id)
        .then( singleTask => {
            console.log(singleTask)
                this.setState({
                    title: singleTask.title,
                    description: singleTask.description,
                    deadline: singleTask.deadline,
                    taskId: singleTask._id,
                    projectId: singleTask.project,
                    done: singleTask.done,
                    type: singleTask.type,
                    singleTask: singleTask
                })
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


        deleteTask = () => {
            const  id  = this.props.match.params.id
            const projectId = this.state.projectId
            
            
            tasksService.deleteTask(id)
            .then( (deleteTask) => {
                    
                    this.props.history.push(`/projects/${projectId}`)
                })
                .catch( err => console.log(err))
        }


        componentDidMount(){
            
            this.getSingleTask()
        }


    render() {

        const { title, description, deadline, taskId } = this.state;
        const singleTask = { title, description, deadline, taskId } 

        return (
            <div>
                            <button onClick={ () => this.deleteTask() }>Delete Task</button>
                            <EditTask 
                                taskId={taskId} 
                                refreshTaskDetails={this.getSingleTask} 
                                {...this.props} 
                                singleTask={singleTask}/>
                            <h2>TITLE: {title}</h2>
                            <p>DESCRIPTION: {description}</p>
                            <p>Deadline: {deadline}</p>
                            
            </div>
        )
    }
}


export default  TaskDetails;