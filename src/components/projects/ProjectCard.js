import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import projectsService from './../../lib/projects-service';

import ProjectDetails from './ProjectDetails';


class ProjectCard extends Component {

    state = {
        title: '',
        description: '',
        deadline: ''
    }


    render() {

        return (
            <div className="project-card">
                <Link to={`/projects/${this.props.projectData._id}`}>
                    <h2>{this.props.projectData.title}</h2>
                    <p>{this.props.projectData.description}</p>
                </Link>
            </div> 
        )
    }
}


export default ProjectCard;