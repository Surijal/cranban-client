import React, { Component } from 'react';

import withAuth from './../../lib/auth-service';
import projectsService from './../../lib/projects-service';


class EditProject extends Component {

    state = {
        title: '',
        description: '',
        deadline: null
    }


    updateProject = () => {
        const { title, description, deadline } = this.state;

        projectsService.updateProject({ title, description, deadline })
            .then( updatedProject => {
                this.setState({updatedProject})
            })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}



export default withAuth(EditProject);