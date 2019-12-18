import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ProjectCard extends Component {

    state = {
        title: '',
        description: '',
        deadline: ''
    }


    render() {
        
        
        const { _id, title, description } = this.props.projectData

        return (
            <div key={_id} className="card mt-3 mb-3">
                <Link   to={`/projects/${_id}`}>
                    <div className="card-header">Project:</div>

                    
                    <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                        <p className="card-text
                        ">{description}</p>

                    </div>
                </Link>
            </div> 
        )
    }
}


export default ProjectCard;