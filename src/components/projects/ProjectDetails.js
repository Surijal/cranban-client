import React, { Component } from 'react'

import projectsService from './../../lib/projects-service';


class ProjectDetails extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            description: '',
            deadline: ''
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


    componentDidMount() {

        this.getSingleProject()
    }



    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
            </div>
        )
    }
}



export default ProjectDetails;