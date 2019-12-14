import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import projectsService from './../../lib/projects-service';

import EditProject from './EditProject';
// import TaskDetails from './..//tasks/TaskDetails';
import AddTask from './../tasks/AddTask';



class ProjectDetails extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            description: '',
            deadline: null,
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
    
    componentDidMount() {
        
        this.getSingleProject()
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

                            <EditProject projectId={this.state.singleProject._id} refreshProjectDetails={this.getSingleProject}/>
                            <button onClick={ () => this.deleteProject()}  >Delete Project</button>
                            
                            {
                                (this.state.singleProject.tasks.length) ? this.state.singleProject.tasks.map((task) =>{
                                    
                                    return(
                                        <div key={task._id} className="task-container">
                                            <Link to={`/projecsts/${this.state._id}/tasks/${task._id}`}>
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