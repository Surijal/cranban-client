import React, { Component } from 'react';

import tasksService from './../../lib/tasks-service';



class TaskDetails extends Component {
        
        constructor(props) {
            super(props)
                this.state = {
                    title: '',
                    description: '',
                    deadline: null,
                    projectTasks: null
                }
        }
    

        getSingleTask = () => {
        

        const {id} = this.props.match.params
        
        tasksService.getSingleTask(id)
        .then( singleTask => {
            
                this.setState({
                    title: singleTask.title,
                    description: singleTask.description,
                    deadline: singleTask.deadline
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

        componentDidMount(){
            
            this.getSingleTask()
        }


    render() {

        const { title, description, deadline } = this.state;

        return (
            <div>
                            <h2>TITLE: {title}</h2>
                            <p>DESCRIPTION: {description}</p>
                            
            </div>
        )
    }
}


export default  TaskDetails;