import React, { Component } from 'react'

import projectsService from './../lib/projects-service';
import { withAuth } from './../lib/AuthProvider';

import ProjectCard from './../components/projects/ProjectCard';
import AddProject from './../components/projects/AddProject';



class ProjectsList extends Component {

    state = {
        listOfProjects: []
    }

    getUserListOfProjects = () => {

        const  userId  = this.props.user._id;

        projectsService.getUserProjects(userId)
            .then( (listOfProjects) => {
                
                this.setState({ listOfProjects })
            })
            .catch( (err) => console.log(err))
    }

    componentDidMount() {
        this.getUserListOfProjects()
    }

    render() {
        
        const { listOfProjects } = this.state;
        
        return (
            <>
                {

                    !listOfProjects ?
                        <h1>Loading</h1>
                        :
                        (
                            

                                    <div className="container">
                                                    <AddProject refreshProjectList={this.getUserListOfProjects} />
                                        {(this.state.listOfProjects.length) ? this.state.listOfProjects.map( project => {

                                            
                                            return(
                                                    
                                                
                                                    <div key={project._id}>
                                                    <ProjectCard   projectData={project} /> 
                                                    </div>
                                                    
                                                
                                            )
                                        })
                                        : 
                                        <AddProject refreshProjectList={this.getUserListOfProjects} />
                                        }
                                    </div>
                            
                        )
                }
            </>
        )
    }
}       


export default withAuth(ProjectsList);