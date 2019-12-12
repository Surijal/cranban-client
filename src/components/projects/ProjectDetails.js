import React, { Component } from 'react'

import projectsService from './../../lib/projects-service';
import EditProject from './EditProject';



class ProjectDetails extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            description: '',
            deadline: null,
            singleProject: null
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
                        </>
                    )

            }
            </div>
        )
    }
}



export default ProjectDetails;