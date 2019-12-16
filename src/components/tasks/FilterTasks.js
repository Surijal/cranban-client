import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class FilterProject extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            description: '',
            deadline: '',
            singleProject: null,
            tasks: [],
            typeFilter: '',
            statusFilter: '',
            isShowing: false
            

        }
    }    

    toggleFilterStatus = ( e) => {
        const { value } = e.target;
        const {singleProject} = this.props.singleProject;

        this.setState({isShowing: !this.state.isShowing, statusFilter: value})

        this.renderFilterByTypeForm(value)
    }

    toggleFilterType = e => {
        const { value } = e.target;

        this.setState({ typeFilter: value})
    }


    renderFilterByTypeForm = input => {
        const value = input;
        
        const { singleProject } = this.props.singleProject;
        this.setState({ singleProject: singleProject})

        if ( !this.state.isShowing) {
            this.props.singleProject.tasks.filter( task => {
                return task.status === value;
            })
            .map( task => {
                return (
                    <div key={task._id} className="task-container">
                        <Link to={`/projects/${this.props.singleProject._id}/tasks/${task._id}`} >
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </Link>
                    </div>
                )
            })
        }
        else {
            this.props.singleProject.tasks.filter( task => {
                return task.type === value;
            })
            .map( task => {
                return (
                    <div key={task._id} className="task-container">
                        <Link to={`/projects/${this.props.singleProject._id}/tasks/${task._id}`} >
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </Link>
                    </div>
                )
            })
        }
    }

    componentDidMount(){
        const { singleProject } = this.props.singleProject

        this.setState({singleProject: {singleProject}})        
        this.renderFilterByTypeForm()
    }
    

    render() {
        return (
            <div>
                <h1>{this.state.statusFilter}</h1>
                <h2>{this.state.typeFilter}</h2>
                <button onClick={this.toggleFilterStatus} value="backlog">Backlog</button>
                <button onClick={this.toggleFilterStatus} value="to do">to do</button>
                <button onClick={this.toggleFilterStatus} value="doing">doing</button>
                <button onClick={this.toggleFilterStatus} value="testing">testing</button>
                <button onClick={this.toggleFilterStatus} value="done">done</button>

                <form>
                    <label htmlFor="type">Type {this.props.type}</label>
                    <select 
                        type="text"
                        name='type'
                        id="testid"
                        
                        defaultValue='preperation'
                        // value={this.state.type}
                        onChange={ (e) => this.toggleFilterType(e)}
                    >
                        <option >frontend</option>
                        <option >backend</option>
                        <option >styles</option>
                        <option >preperation</option>
                    </select>
                </form>

                {/* {
                    ( !this.state.isShowing) ? 
                    this.props.singleProject.tasks.filter( task => {
                        return task.status === this.state.statusFilter;
                    })
                    .map( task => {
                        return (
                            <div key={task._id} className="task-container">
                                <Link to={`/projects/${this.props.singleProject._id}/tasks/${task._id}`} >
                                    <h5>{task.title}</h5>
                                    <p>{task.description}</p>
                                </Link>
                            </div>
                        )
                    })
                    :
                    null
                } */}


                {
                    ( !this.state.isShowing) ? 
                    this.props.singleProject.tasks.filter( task => {
                        return task.status === this.state.statusFilter;
                    })
                    .filter( task => {
                        return task.type === this.state.typeFilter;
                    })
                    .map( task => {
                        return (
                            <div key={task._id} className="task-container">
                                <Link to={`/projects/${this.props.singleProject._id}/tasks/${task._id}`} >
                                    <h5>{task.title}</h5>
                                    <p>{task.description}</p>
                                </Link>
                            </div>
                        )
                    })
                    :
                    <h1> No Task to Display</h1>
                }
                    {/* this.props.singleProject.tasks.map( task => {
                        return (
                            <div key={task._id} className="task-container">
                                <Link to={`/projects/${this.props.singleProject._id}/tasks/${task._id}`} >
                                    <h5>{task.title}</h5>
                                    <p>{task.description}</p>
                                </Link>
                            </div>
                        )
                    })
                }         */}
            </div>
                
                    
            
            



        )
    }
}



export default FilterProject;