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
    
        
    
            this.setState({isShowing: !this.state.isShowing})
            
        
            
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
                                    }
                                    )
                                    console.log(updatedProject)
                                    this.props.refreshProjectDetails()
            })
            .catch( err => console.log(err))
    }

    componentDidMount(){
        

        const { deadline, title, description } = this.props.singleProject

        this.setState({ deadline, title, description })
        this.convertDate()
    }

    render() {

        

        return (
            <>
                        <div className="container">
                            <div className="card mt-5 mb-3 card-color">

                            <div className="card-header card-color"> 
                                <h5 className="card-title">Edit Project</h5>
                            </div>
                                <form >
                                
                                    <div className="card-body card-color">
                                    
                                    <div className="form-group">
                                        <input 
                                                className="card-title form-control mt-3 mb-3"
                                                type="text"
                                                name='title'
                                                placeholder="Title"
                                                value={this.state.title}
                                                onChange={ (e) => this.handleInput(e)}
                                                
                                            />
                                    </div>
                                        
                                    <div className="form-group">
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
                                        </div>

                                        <div className="form-group">
                                            <input
                                                    className="form-control"
                                                    type="date"
                                                    name="deadline" 
                                                    //placeholder="Deadline"
                                                    value={this.state.deadline}
                                                    onChange={ (e) => this.handleInput(e)}
                                                />
                                    </div>
                                    
                                    </div>

                                    
                                        
                                    <div className="d-flex justify-content-around card-footer card-color">

                                        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>

                                        <button
                                                                className="btn btn-primary"
                                                                onClick={ () => this.deleteProject()}   
                                                    >
                                                    Delete
                                                    </button>
                                    </div>
                                </form>
                                    
                                        
                            </div>
                    </div>
            </>
        )
    }
}



export default withAuth(EditProject);