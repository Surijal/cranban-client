import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class FilterTask extends Component {
        state = {
            title: '',
            description: '',
            deadline: '',
            singleProject: null,
            tasks: [],
            typeFilter: '',
            statusFilter: '',
            isFiltered: false,
            allTasks: false

        }


    toggleFilterStatus = ( e) => {
        const { value } = e.target;
        
        this.setState({isFiltered: true, statusFilter: value})
    }

    toggleFilterType = e => {
        const { value } = e.target;

        this.setState({ isFiltered: true, typeFilter: value})
    }

    

    // Render tasks filtered by both statusFilter or typeFilter
    renderFilteredTasks = () => {
        const { tasks, _id } = this.props.singleProject;

        const statusNotSelected = () => this.state.statusFilter === '' ;
        const typeNotSelected = () => this.state.typeFilter === '' ;
        const statusMatch = (task) => task.status === this.state.statusFilter;
        const typeMatch = (task) => task.type === this.state.typeFilter;


        const filteredTasks = tasks.filter( task => {
            if ( statusNotSelected() ) return true;
            return statusMatch(task);
        })
        .filter( task => {
            if ( typeNotSelected() ) return true;
            return typeMatch(task);
        })
        .map( task => {
            return (
                <div key={task._id} className="task-card" >
                    <Link to={`/projects/${_id}/tasks/${task._id}`} >
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                    </Link>
                </div>
            )
        })

        return filteredTasks;
    }

    renderAllTasks = () => {
        const { tasks, _id } = this.props.singleProject;

        return tasks.map( task => {
            return (
                <div key={task._id} className="task-card">
                    <Link to={`/projects/${_id}/tasks/${task._id}`} >
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                    </Link>
                </div>
            )
        })
    }

    componentDidMount(){
        const { singleProject } = this.props.singleProject;

        this.setState({ singleProject: singleProject})        
    }
    

    render() {
        return (
            <div>
                <h1>{this.state.statusFilter}</h1>
                <h2>{this.state.typeFilter}</h2>

                

                <div className='tasks-container'>

                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">

                        <div className="d-flex justify-content-around">
                            <h3>All Tasks</h3>
                        </div>
                        {
                            this.props.singleProject.tasks
                            .map( task => {
                                return (
                                    <div className="card" key={task._id}>
                                        
                                        <Link to={`/projects/${task.project}/tasks/${task._id}`} >
                                        <div  className="card-header" >
                                            <h5 className="card-title">{task.title}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{task.description}</p>
                                        </div>
                                        </Link>
                                    
                                </div>
                                )
                            })
                        }





                    </div>

                    
                    <div className="carousel-item">

                        <div className="d-flex justify-content-around">
                            <h3>Backlog</h3>
                        </div>
                        {
                            this.props.singleProject.tasks.filter( task => {
                                
                                return task.status === 'backlog'
                            })
                            .map( task => {
                                return (
                                    <div className="card" key={task._id}>
                                        
                                        <Link to={`/projects/${task.project}/tasks/${task._id}`} >
                                        <div  className="card-header" >
                                            <h5 className="card-title">{task.title}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{task.description}</p>
                                        </div>
                                        </Link>
                                    
                                </div>
                                )
                            })
                        }





                    </div>


                    <div className="carousel-item">
                    
                        <div className="d-flex justify-content-around">
                            <h3>To do</h3>
                        </div>
                        {
                            this.props.singleProject.tasks.filter( task => {
                                
                                return task.status === 'to do'
                            })
                            .map( task => {
                                return (
                                    <div className="card" key={task._id}>
                                        
                                        <Link to={`/projects/${task.project}/tasks/${task._id}`} >
                                        <div  className="card-header" >
                                            <h5 className="card-title">{task.title}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{task.description}</p>
                                        </div>
                                        </Link>
                                    
                                </div>
                                )
                            })
                        }


                    </div>
                    <div className="carousel-item">
                    
                    <div className="d-flex justify-content-around">

                        <div className="d-flex justify-content-around">
                            <h3>Done</h3>
                        </div>

                    </div>

                            {
                                this.props.singleProject.tasks.filter( task => {
                                    
                                    return task.status === 'doing'
                                })
                                .map( task => {
                                    return (
                                        <div className="card" key={task._id}>
                                        
                                                <Link to={`/projects/${task.project}/tasks/${task._id}`} >
                                                <div  className="card-header" >
                                                    <h5 className="card-title">{task.title}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text">{task.description}</p>
                                                </div>
                                                </Link>
                                            
                                        </div>
                                    )
                                })
                            }


                    </div>

                    <div className="carousel-item">
                    
                            <div className="d-flex justify-content-around">
                                <h3>Testing</h3>
                            </div>
                            {
                                this.props.singleProject.tasks.filter( task => {
                                    
                                    return task.status === 'testing'
                                })
                                .map( task => {
                                    return (
                                        <div className="card" key={task._id}>
                                        
                                        <Link to={`/projects/${task.project}/tasks/${task._id}`} >
                                        <div  className="card-header" >
                                            <h5 className="card-title">{task.title}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{task.description}</p>
                                        </div>
                                        </Link>
                                    
                                </div>
                                    )
                                })
                            }


                    </div>

                        <div className="carousel-item">
                            <div className="d-flex justify-content-around">
                                <h3>Done</h3>
                            </div>
                            {
                                this.props.singleProject.tasks.filter( task => {
                                    
                                    return task.status === 'done'
                                })
                                .map( task => {
                                    return (
                                        <div className="card" key={task._id}>
                                        
                                                <Link to={`/projects/${task.project}/tasks/${task._id}`} >
                                                <div  className="card-header" >
                                                    <h5 className="card-title">{task.title}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text">{task.description}</p>
                                                </div>
                                                </Link>
                                            
                                        </div>
                                    )
                                })
                            }


                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>


                {/* {

                    ( this.state.isFiltered) 
                        ? this.renderFilteredTasks()
                        :  this.renderAllTasks()
                }         */}
                </div> 
                
            </div>
                
                    
            
            



        )
    }
}



export default FilterTask;