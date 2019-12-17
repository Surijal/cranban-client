import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import projectsService from './../../lib/projects-service';

import EditProject from './EditProject';
import AddTask from './../tasks/AddTask';
import FilterTask from '../tasks/FilterTasks';

import moment from 'moment';


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
                <div >
                    <EditProject projectId={this.state.singleProject._id} singleProject={this.state.singleProject} refreshProjectDetails={this.getSingleProject} {...this.props}
                        deleteProject={this.deleteProject}
                        className="container"
                    />
                </div>
            )

        }
    }


    
    componentDidMount() {
        const { id } = this.props.match.params;   
        this.getSingleProject(id)
    }
    
    render() {
        
        // const date = new Date(this.state.singleProject.deadline);

        
        const { singleProject } = this.state;

        if (singleProject) {
            const testMoment = moment(this.state.singleProject.deadline).format('MM DD YYYY,')
            console.log('testMoment', testMoment);
        }

        
        return (
            <div className="container">
                
                    {
                        !singleProject
                            ? <h1>Loading</h1>
                            :
                            (
                                
                                <div className="mt-3 card">
                                        
                                            <div className="card-header row row-cols-3">
                                            
                                                <button
                                                            className="btn btn-primary mr-3"
                                                            onClick={ () => this.deleteProject()}   
                                                >
                                                Delete
                                                </button>
                                            
                                                <AddTask
                                                            projectId={this.state.singleProject._id} 
                                                            refreshSingleProject={this.getSingleProject}
                                                        />
                                                
                                                <EditProject projectId={this.state.singleProject._id} singleProject={this.state.singleProject} refreshProjectDetails={this.getSingleProject} {...this.props}
                                                deleteProject={this.deleteProject}
                                            
                                            />

                                            </div>

                                            <div className="card-body">
                                                <h2 className="card-title">{this.state.singleProject.title}</h2>
                                                <p className="card-text">{this.state.singleProject.description}</p>
                                                <p>{this.state.singleProject.deadline}</p>
                                            </div>

                                            
                                            
                                            <div className="card-footer row row-cols-2">
                                                    
                                            </div>

                                            <div className="card mt-3">
                                                <FilterTask singleProject={singleProject} {...this.props}/>
                                            </div>
                                                    
                                                    
                                            </div>


                                
                                    
                                    
                                
                                    
                                
                            )
                

                    }
            </div>
        )
    }
}



export default ProjectDetails;