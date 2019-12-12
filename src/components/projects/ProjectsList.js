import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import projectsService from '../../lib/projects-service';

class ProjectsList extends Component {

    state = {
        listOfProjects: [],
        title: '',
        description: '',
        deadline: ''
    }


    componentDidMount() {
        projectsService
            .getAllProjects()
            .then( (project) => {
                
                this.setState({ title: project.title, description: project.description, deadline: project.deadline})
                console.log(project);
            })
            .catch( (err) => console.log(err))
    }

    render() {
        return (
            <div>
                <h2>Title</h2>
                <p>Description</p>

                {this.state.listOfProjects.map( project => {
                    return(
                        <div key={project._id} className="project">
                            <Link to={`/projects/${project._id}`}>
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                            </Link>
                        </div> 
                    )
                })}
            </div>
        )
    }
}



export default ProjectsList;