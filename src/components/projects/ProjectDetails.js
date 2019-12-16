import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import projectsService from './../../lib/projects-service';

import EditProject from './EditProject';
import AddTask from './../tasks/AddTask';
import FilterTask from '../tasks/FilterTasks';


class ProjectDetails extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            description: '',
            deadline: '',
            singleProject: null,
            tasks: [],
            filterType: '',
            statusBacklog: false,
            statusTesting: false,
            statusToDO: false,
            statusDone: false,
            statusDoing:false

        }
    }

    
    getSingleProject = () => {
        const id  = this.props.match.params.id;
        
        projectsService.getSingleProject(id) 
        .then( (singleProject) => {
            this.setState({ singleProject })
        })
        .catch( err => console.log(err))
    }
    
    
    deleteProject = () => {
        const id = this.props.match.params.id
        
        projectsService.deleteProject(id)
            .then( () => {
                this.props.history.push('/projects')
                
            })
            .catch( err => console.log(err))
    }


    toggleBacklog = () => {
        
        this.setState({ statusBacklog: !this.state.statusType, 
                                statusTesting: false, 
                                statusToDO: false, 
                                statusDone: false, 
                                statusDoing: false})
    }


    toggleTesting = () => {
        
        this.setState({ statusBacklog: false, 
                                statusTesting: !this.state.statusType, 
                                statusToDO: false, 
                                statusDone: false, 
                                statusDoing: false})
    }


    toggleTodo = () => {
        
        this.setState({ statusBacklog: false, 
                                statusTesting: false, 
                                statusToDO: !this.state.statusType, 
                                statusDone: false, 
                                statusDoing: false})
    }


    toggleDoing = () => {
        
        this.setState({ statusBacklog: false, 
                                statusTesting: false, 
                                statusToDO: false, 
                                statusDone: false, 
                                statusDoing: !this.state.statusType})
    }


    toggleDone = () => {
        
        this.setState({ statusBacklog: false, 
                                statusTesting: false, 
                                statusToDO: false, 
                                statusDone: false, 
                                statusDoing: !this.state.statusType})
    }





    handleChange = (e) => {
        const value  = e.target;

        this.setState({ filterType: value })
    }

    renderFilterByTypeForm = input => {
        const value = input;

        if ( value === 'All in list') {
            this.state.singleProject.tasks.filter( task => {
                return task.status === 'testing';
            })
            .map( task => {
                return (
                    <div key={task._id} className="task-container">
                        <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </Link>
                    </div>
                )
            })
        }
        else {
            this.state.singleProject.tasks.filter( task => {
                return task.type === value;
            })
            .map( task => {
                return (
                    <div key={task._id} className="task-container">
                        <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </Link>
                    </div>
                )
            })
        }
    }


    renderEditForm = () => {

        if (!this.state.title && this.state.description ) return null
        else {
            return (

                <EditProject projectId={this.state.singleProject._id} refreshProjectDetails={this.getSingleProject} {...this.props}/>
            )

        }
    }


    
    componentDidMount() {
        const { id } = this.props.match.params;   
        this.getSingleProject(id)
    }
    
    render() {
        
        const { singleProject } = this.state;
        
        return (
            <div>
                
                    {
                        !singleProject
                            ? <h1>Loading</h1>
                            :
                            (
                                <>
                                <div className="project-details-container">
                                        <div className="project-title-container">
                                            <h2>TITLE: {this.state.singleProject.title}</h2>
                                            <p>DESCRIPTION: {this.state.singleProject.description}</p>
                                            <p>deadline: {this.state.singleProject.deadline}</p>
                                            <div>{this.renderEditForm()}</div>

                                            <div>
                                                <button onClick={ () => this.deleteProject()}  >Delete Project</button>
                                
                                                <AddTask projectId={this.state.singleProject._id} refreshSingleProject={this.getSingleProject}/>

                                                <FilterTask singleProject={singleProject} {...this.props}/>
                                            </div>
                                        </div>
                                </div>
                                    
                                    
                                
                                    
                                </>
                            )

                    }
                
            </div>
        )
    }
}



export default ProjectDetails;




{/* <div className='project-details'>
                                
                                <div className="task-type-container">
                                    <h2>BACKLOG</h2>

                                    {  
                                        
                                        
                                        (!this.state.statusBacklog) ? this.state.singleProject.tasks.filter((task) =>{
                                            return task.status === 'backlog'
                                        })
                                        .map( task => {

                                            return (
                                                <div key={task._id} className="task-container">
                                                    <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                        <h5>{task.title}</h5>
                                                        <p>{task.description}</p>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                        : <h4>No Tasks to Display</h4>
                                    }
                                </div>


                                <div className="task-type-container">
                                    <h2>TO DO</h2>

                                    {
                                        (!this.state.statusToDO) ? this.state.singleProject.tasks.filter((task) =>{
                                            return task.status === 'to do'
                                        })
                                        .map( task => {

                                            return (
                                                <div key={task._id} className="task-container">
                                                    
                                                    <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                        <h5>{task.title}</h5>
                                                        <p>{task.description}</p>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                        : <h4>No Tasks to Display</h4>
                                    }
                                </div>

                                <div className="task-type-container">
                                    <h2>DOING</h2>

                                    {
                                        (this.state.statusDoing) ? this.state.singleProject.tasks.filter((task) =>{
                                            return task.status === 'doing'
                                        })
                                        .map( task => {

                                            return (
                                                <div key={task._id} className="task-container">
                                                    <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                        <h5>{task.title}</h5>
                                                        <p>{task.description}</p>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                        : <h4>No Tasks to Display</h4>
                                    }
                                </div>


                                <div className="task-type-container">
                                    <h2>TESTING</h2>
                                    <form>
                                        <label htmlFor="type">Type {this.props.type}</label>
                                        <select 
                                            type="text"
                                            name='type'
                                            id="testid"
                                            // onChange={ e => this.handleInput(e)}
                                            
                                            // defaultValue={type}
                                            value={this.state.type}
                                            onChange={ (e) => this.handleChange(e)}
                                        >
                                            <option>All in list</option>
                                            <option >frontend</option>
                                            <option >backend</option>
                                            <option >styles</option>
                                            <option >preperation</option>
                                        </select>    
                                    </form>

                                    


                                    {
                                        (!this.state.statusTesting) ? this.state.singleProject.tasks.filter((task) =>{
                                            return task.status === 'testing'
                                        })
                                        .map( task => {

                                            return (
                                                <div key={task._id} className="task-container">
                                                    <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                        <h5>{task.title}</h5>
                                                        <p>{task.description}</p>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                        : <h4>No Tasks to Display</h4>
                                    }
                                </div>

                                
                                <div className="task-type-container">
                                    <h2>DONE</h2>

                                    {
                                        (this.state.stat) ? this.state.singleProject.tasks.filter((task) =>{
                                            return task.status === 'done'
                                        })
                                        .map( task => {

                                            return (
                                                <div key={task._id} className="task-container">
                                                    <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                        <h5>{task.title}</h5>
                                                        <p>{task.description}</p>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                        : <h4>No Tasks to Display</h4>
                                    } 
                                </div>
                            </div> */}
