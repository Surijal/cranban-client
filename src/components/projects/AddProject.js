import React, { Component } from 'react'

import { withAuth } from './../../lib/AuthProvider';
import projectsService from './../../lib/projects-service';



class AddProject extends Component {

    state = {
        title: '',
        description: '',
        deadline: '',
        isShowing: false
    }

    toggleForm = () => {
        this.setState({isShowing: !this.state.isShowing})
    }



    handleInput = e => {
        const { name, value } = e.target;

        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault()
    
        this.createProject()
    }
    
    
    createProject = () => {
        const { title, description, deadline } = this.state;
        
        
        projectsService.createProject({ title, description, deadline })
            .then( (newProject) => {
                this.setState({ title: '', description: '', deadline: '', isShowing: false});
                this.props.refreshProjectList()
            })
            .catch((err) => console.log(err))
    }

    convertDate = () => {
        const parsedDate = new Date ()
        
        var newDeadline = parsedDate.toISOString().substring( 0, 10)
        this.setState({deadline: newDeadline})
    }



    componentDidMount(){
        this.convertDate()
    }


    render() {
        
        return (
            <div >

                {
                    !this.state.isShowing ?
                    
                        <button onClick={this.toggleForm} className="btn btn-primary">Add Project</button>
                    :
                    (
                    <div className="card mt-3">
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className="card-header">
                                <input
                                        className="form-control"
                                        type="text"
                                        name='title'
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={ (e) => this.handleInput(e)}
                                    />
                            </div>

                            <div className="card-body">
                                <textarea
                                        className="form-control"
                                        type="text"
                                        name="description" 
                                        placeholder="Description"
                                        id="" 
                                        cols="30" 
                                        rows="4"
                                        value={this.state.description}
                                        onChange={ (e) => this.handleInput(e)}
                                    />

                                
                                <input
                                        className="form-control mb-3 mt-3"
                                        type="date"
                                        name="deadline" 
                                        placeholder="Deadline"
                                        value={this.state.deadline}
                                        onChange={ (e) => this.handleInput(e)}
                                    />

                            </div>
                                <div className="card-footer d-flex justify-content-around">
                                <button className="btn btn-primary">Submit</button> 
                            </div>
                        </form>
                    </div>
                    )
                }
            </div>

        )
    }
}



export default  withAuth(AddProject);