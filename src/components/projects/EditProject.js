import React, { Component } from 'react';

import { withAuth } from './../../lib/AuthProvider';
import projectsService from './../../lib/projects-service';


class EditProject extends Component {


    constructor(props) {
        super(props)
            this.state = {
                title: '',
                description: '',
                deadline: '',
                updatedProject: null,
                isShowing: false
            }
    }

    
    handleInput = e => {
        const { name, value } = e.target;
        
        this.setState({[name]: value})
    }


    handleSubmit = e => {
        e.preventDefault();

        this.updateProject();
    }

    toggleForm = () => {
        const { title, description, deadline } = this.props.singleProject

        this.setState({isShowing: !this.state.isShowing, title, description, deadline})
        this.convertDate()
    }


    deleteProject = () => {
        const id = this.props.match.params.id
        
        projectsService.deleteProject(id)
            .then( () => {
                this.props.history.push('/projects')
                
            })
            .catch( err => console.log(err))
    }

    convertDate = () => {
        const newDate = this.props.singleProject.deadline
        const parsedDate = new Date (newDate)
        
        var newDeadline = parsedDate.toISOString().substring( 0, 10)
        
        this.setState({deadline: newDeadline})
    }


    updateProject = () => {
        const { title, description, deadline } = this.state;
        const id  = this.props.projectId;
        
        
        projectsService.updateProject({ title, description, deadline, id })
            .then( updatedProject => {
                this.setState({
                                        title: '',
                                        description: '',
                                        deadline: '',
                                        updatedProject: null,
                                        isShowing: false
                                    })
                this.props.refreshProjectDetails();
            })
            .catch( err => console.log(err))
    }

    componentDidMount(){
        
    }

    render() {

        

        return (
            <div className="container">

                

                    {
                        !this.state.isShowing ?
                        
                            <button onClick={this.toggleForm} className="btn btn-primary">Edit</button>
                        :
                        (

                            <div className="card mt-3">

                            <div className="card-header">Edit Project 
                                {/* <button onClick={ () => this.deleteProject()} >Delete</button> */}
                            </div>
                                <form onSubmit={this.handleSubmit} className="form-group">
                                
                                    <div className="card-body">
                                    
                                        <input 
                                                className="card-title form-control mt-3 mb-3"
                                                type="text"
                                                name='title'
                                                placeholder="Title"
                                                value={this.state.title}
                                                onChange={ (e) => this.handleInput(e)}
                                            />

                                        
                                        <textarea
                                                className="form-control"
                                                type="text"
                                                name="description" 
                                                placeholder="Description"
                                                id="" 
                                                rows="4"
                                                value={this.state.description}
                                                onChange={ (e) => this.handleInput(e)}
                                            />


                                            <input
                                                    className="form-control"
                                                    type="date"
                                                    name="deadline" 
                                                    //placeholder="Deadline"
                                                    value={this.state.deadline}
                                                    onChange={ (e) => this.handleInput(e)}
                                                />
                                    </div>
                                        
                                    <div className="d-flex justify-content-around">

                                        <button className="btn btn-primary">Submit</button>

                                        <button
                                                                className="btn btn-primary"
                                                                onClick={ () => this.deleteProject()}   
                                                    >
                                                    Delete
                                                    </button>
                                    </div>
                                    
                                </form>
                                        
                            </div>
                        )
                    }
            </div>
        )
    }
}



export default withAuth(EditProject);