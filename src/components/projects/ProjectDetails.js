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
        }
    }

    
    getSingleProject = () => {
        const id  = this.props.match.params.id;
        
        projectsService.getSingleProject(id) 
        .then( (singleProject) => {
            this.setState({ singleProject })
            this.convertDate()
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

    convertDate = () => {
        const newDate = this.state.singleProject.deadline
        const parsedDate = new Date (newDate)
        
        var newDeadline = parsedDate.toISOString().substring( 0, 10)
        this.setState({deadline: newDeadline})
    }


    
    componentDidMount() {
        const { id } = this.props.match.params;   
        this.getSingleProject(id)
    }
    
    render() {

        const { singleProject } = this.state;
        
        return (
            <div  >
                
                    {
                        !singleProject
                            ? <h1>Loading</h1>
                            :
                            (
                            <div className="container">
                                <div className="mt-3 card">
                                        
                                            <div className="card-header">
                                            
                                                <h1>Project:</h1>
                                        </div>

                                            <div className="card-body">
                                                <h2 className="card-title">{this.state.singleProject.title}</h2>
                                                <p className="card-text">{this.state.singleProject.description}</p>
                                                <p>Deadline: {this.state.deadline}</p>
                                            </div>

                                            
                                            
                                            <div className="card-footer">

                                            <div className="d-flex justify-content-around">

                                                
                                                
                                                    <AddTask
                                                                projectId={this.state.singleProject._id} 
                                                                refreshSingleProject={this.getSingleProject}
                                                                className="mr-0"
                                                            />
                                                    

                                                    <EditProject projectId={this.state.singleProject._id} singleProject={this.state.singleProject} refreshProjectDetails={this.getSingleProject} {...this.props}
                                                    deleteProject={this.deleteProject}
                                                    className="p-0"
                                                />

                                    

                                                </div>
                                                                                                    
                                            </div>

                                                    
                                                    
                                    </div>

                                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                            

                                                        <div className="card mt-3">
                                                            <div className="card-header">
                                                            </div>
                                                            <div className="card-body">

                                                                <FilterTask singleProject={singleProject} {...this.props}/>
                                                            </div>
                                                        </div>


                                                </div>
                                                <div className="carousel-item">


                                                        <div className="card mt-3">
                                                            <div className="card-header">
                                                            </div>
                                                            <div className="card-body">

                                                                <FilterTask singleProject={singleProject} {...this.props}/>
                                                            </div>
                                                        </div>
                                                
                                                </div>
                                                <div className="carousel-item">
                                                

                                                        <div className="card mt-3">
                                                            <div className="card-header">
                                                            </div>
                                                            <div className="card-body">

                                                                <FilterTask singleProject={singleProject} {...this.props}/>
                                                            </div>
                                                        </div>



                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                            </div>

                                
                                    
                                    
                                
                            </div>
                                
                            )
                

                    }
            </div>
        )
    }
}



export default ProjectDetails;