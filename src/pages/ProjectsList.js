import React, { Component } from 'react'

import projectsService from './../lib/projects-service';

import ProjectCard from './../components/projects/ProjectCard';
import AddProject from './../components/projects/AddProject';



class ProjectsList extends Component {

    state = {
        listOfProjects: []
    }

    getListOfProjects = () => {
        projectsService.getAllProjects()
            .then( (listOfProjects) => {
                this.setState({ listOfProjects })
            })
            .catch( (err) => console.log(err))
    }

    componentDidMount() {
        this.getListOfProjects()
    }

    render() {
        return (
            <div>
                <AddProject refreshProjectList={this.getListOfProjects} />

                {(this.state.listOfProjects.length) ? this.state.listOfProjects.map( project => {
                    return(
    

                        <ProjectCard key={project._id} projectData={project} /> 
                        
                        
                    )
                })
                : <h1> Add your first project </h1>
                }
            </div>
        )
    }
}       


export default ProjectsList;