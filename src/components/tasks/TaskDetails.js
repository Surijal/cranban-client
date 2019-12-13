import React, { Component } from 'react'

import AddTask from './AddTask'



class TaskDetails extends Component {
        
        state = {
            title: '',
            description: '',
            deadline: null
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