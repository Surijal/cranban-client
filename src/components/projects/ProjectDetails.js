import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import projectsService from './../../lib/projects-service';

import EditProject from './EditProject';
import AddTask from './../tasks/AddTask';



class ProjectDetails extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            description: '',
            deadline: '',
            singleProject: null,
            tasks: []
            
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
                            <h2>TITLE: {this.state.singleProject.title}</h2>
                            <p>DESCRIPTION: {this.state.singleProject.description}</p>
                            <p>deadline: {this.state.singleProject.deadline}</p>
                            <div>{this.renderEditForm()}</div>

                            <button onClick={ () => this.deleteProject()}  >Delete Project</button>
                            
                            {
                                (this.state.singleProject.tasks.length) ? this.state.singleProject.tasks.filter((task) =>{
                                    return task.status === 'backlog'
                                })
                                .map( task => {

                                    return (
                                        <div key={task._id} className="task-container">
                                            <h2>Backlog</h2>
                                            <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                <h5>{task.title}</h5>
                                                <p>{task.description}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : <h4>No Tasks to Display</h4>
                            }


                            {
                                (this.state.singleProject.tasks.length) ? this.state.singleProject.tasks.filter((task) =>{
                                    return task.status === 'to do'
                                })
                                .map( task => {

                                    return (
                                        <div key={task._id} className="task-container">
                                            <h2>to do</h2>
                                            <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                <h5>{task.title}</h5>
                                                <p>{task.description}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : <h4>No Tasks to Display</h4>
                            }


                            {
                                (this.state.singleProject.tasks.length) ? this.state.singleProject.tasks.filter((task) =>{
                                    return task.status === 'doing'
                                })
                                .map( task => {

                                    return (
                                        <div key={task._id} className="task-container">
                                            <h2>doing</h2>
                                            <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                <h5>{task.title}</h5>
                                                <p>{task.description}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : <h4>No Tasks to Display</h4>
                            }


                            {
                                (this.state.singleProject.tasks.length) ? this.state.singleProject.tasks.filter((task) =>{
                                    return task.status === 'testing'
                                })
                                .map( task => {

                                    return (
                                        <div key={task._id} className="task-container">
                                            <h2>testing</h2>
                                            <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                <h5>{task.title}</h5>
                                                <p>{task.description}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : <h4>No Tasks to Display</h4>
                            }


                            {
                                (this.state.singleProject.tasks.length) ? this.state.singleProject.tasks.filter((task) =>{
                                    return task.status === 'done'
                                })
                                .map( task => {

                                    return (
                                        <div key={task._id} className="task-container">
                                            <h2>done</h2>
                                            <Link to={`/projects/${this.state.singleProject._id}/tasks/${task._id}`} >
                                                <h5>{task.title}</h5>
                                                <p>{task.description}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : <h4>No Tasks to Display</h4>
                            }

                            <AddTask projectId={this.state.singleProject._id} refreshSingleProject={this.getSingleProject}/>
                        
                            
                        </>
                    )

            }
            </div>
        )
    }
}



export default ProjectDetails;