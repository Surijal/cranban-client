import React, { Component } from 'react'

import projectsService from './../lib/projects-service';

import ProjectCard from './../components/projects/ProjectCard';

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
                <h2>Title</h2>
                <p>Description</p>

                {this.state.listOfProjects.map( project => {
                    return(
    

                        <ProjectCard key={project._id} projectData={project} /> 
                        
                        
                    )
                })}
            </div>
        )
    }
}       


export default ProjectsList;