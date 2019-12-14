import React, { Component } from 'react';

import tasksService from './../../lib/tasks-service';



class TaskDetails extends Component {
        
        constructor(props) {
            super(props)
                this.state = {
                    title: '',
                    description: '',
                    deadline: null,
                    singleTask: null,
                    projectTasks: null
                }
        }
    

        getSingleTask = () => {
            const id = this.props.match.params.id;

            tasksService.getSingleTask(id)
            .then( singleTask => {
                this.setState({singleTask})
            })
            .catch( err => console.log(err))
        }
        
        
        getProjectTask = () => {
            const { projectId, taskId } = this.props.match.params
            console.log('>>>>>>>>>>>>>>>>>', this.props.match.params);
            

            tasksService.getTasksByProject({projectId, taskId})
                .then( projectTasks => {
                    this.setState({projectTasks})
                })
                .catch( err => console.log(err))
        }

        componentDidMount(){
            this.getProjectTask()
        }


    render() {

        const { projectTasks } = this.state
        
        return (
            <div>
                            <h2>TITLE: {projectTasks.title}</h2>
                            <p>DESCRIPTION: {projectTasks.description}</p>

            </div>
        )
    }
}


export default  TaskDetails;