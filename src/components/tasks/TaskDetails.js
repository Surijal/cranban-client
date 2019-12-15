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
                    taskId: ''
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
                    taskId: singleTask._id
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
            const { id } = this.props.match.params.id

            console.log('>>>>>>>>>>>>>>>>>>>>>> in taskDetails, deletetask', this.props.match.params.id);
            

            tasksService.deleteTask(id)
                .then( () => {
                    this.props.history.push('/projects/:id')
                })
                .catch( err => console.log(err))
        }


        componentDidMount(){
            
            this.getSingleTask()
        }


    render() {

        const { title, description, deadline, taskId } = this.state;

        return (
            <div>
                            <button onClick={ () => this.deleteTask() }>Delete Task</button>
                            <EditTask taskId={taskId} refreshTaskDetails={this.getSingleTask}/>
                            <h2>TITLE: {title}</h2>
                            <p>DESCRIPTION: {description}</p>
                            
            </div>
        )
    }
}


export default  TaskDetails;