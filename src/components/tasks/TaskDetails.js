import React, { Component } from 'react';

import AddTask from './AddTask';

import tasksService from './../../lib/tasks-service';



class TaskDetails extends Component {
        
        constructor(props) {
            super(props)
                this.state = {
                    title: '',
                    description: '',
                    deadline: null,
                    singleTask: null
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



    render() {
        return (
            <div>
                <AddTask />
            </div>
        )
    }
}


export default  TaskDetails;