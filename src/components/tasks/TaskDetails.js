import React, { Component } from 'react'

import AddTask from './AddTask'



class TaskDetails extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            title: '',
            description: '',
            deadline: null
        }
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