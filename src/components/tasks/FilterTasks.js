import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class FilterTask extends Component {
        state = {
            title: '',
            description: '',
            deadline: '',
            singleProject: null,
            tasks: [],
            typeFilter: '',
            statusFilter: '',
            isFiltered: false,
            allTasks: false

        }


    toggleFilterStatus = ( e) => {
        const { value } = e.target;
        
        this.setState({isFiltered: true, statusFilter: value})
    }

    toggleFilterType = e => {
        const { value } = e.target;

        this.setState({ isFiltered: true, typeFilter: value})
    }

    

    // Render tasks filtered by both statusFilter or typeFilter
    renderFilteredTasks = () => {
        const { tasks, _id } = this.props.singleProject;

        const statusNotSelected = () => this.state.statusFilter === '' ;
        const typeNotSelected = () => this.state.typeFilter === '' ;
        const statusMatch = (task) => task.status === this.state.statusFilter;
        const typeMatch = (task) => task.type === this.state.typeFilter;


        const filteredTasks = tasks.filter( task => {
            if ( statusNotSelected() ) return true;
            return statusMatch(task);
        })
        .filter( task => {
            if ( typeNotSelected() ) return true;
            return typeMatch(task);
        })
        .map( task => {
            return (
                <div key={task._id} className="task-card" >
                    <Link to={`/projects/${_id}/tasks/${task._id}`} >
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                    </Link>
                </div>
            )
        })

        return filteredTasks;
    }

    renderAllTasks = () => {
        const { tasks, _id } = this.props.singleProject;

        return tasks.map( task => {
            return (
                <div key={task._id} className="task-card">
                    <Link to={`/projects/${_id}/tasks/${task._id}`} >
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                    </Link>
                </div>
            )
        })
    }

    componentDidMount(){
        const { singleProject } = this.props.singleProject;

        this.setState({ singleProject: singleProject})        
    }
    

    render() {
        return (
            <div>
                <h1>{this.state.statusFilter}</h1>
                <h2>{this.state.typeFilter}</h2>

                <div className="filter-container">
                    <form>
                        <label htmlFor="status">Status {this.props.status}</label>
                        <select 
                            type="text"
                            name='status'
                            id="testid"
                            
                            defaultValue='preperation'
                            // value={this.state.type}
                            onChange={ (e) => this.toggleFilterStatus(e)}
                        >
                            <option >backlog</option>
                            <option >to do</option>
                            <option >doing</option>
                            <option >testing</option>
                            <option >done</option>
                        </select>
                    </form>

                    <form>

                        <label htmlFor="type">Type {this.props.type}</label>
                        <select 
                            type="text"
                            name='type'
                            id="testid"
                            
                            // defaultValue='preperation'
                            value={this.state.type}
                            onChange={ (e) => this.toggleFilterType(e)}
                        >
                            <option >frontend</option>
                            <option >backend</option>
                            <option >styles</option>
                            <option >preperation</option>
                        </select>
                    </form>


                </div>

                <div className='tasks-container'>
                {

                    ( this.state.isFiltered) 
                        ? this.renderFilteredTasks()
                        :  this.renderAllTasks()
                }        
                </div>
                
            </div>
                
                    
            
            



        )
    }
}



export default FilterTask;