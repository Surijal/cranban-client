import axios from 'axios';


class Task {
    constructor(){

        this.tasks = axios.create( {
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true,
        })
    }


    getSingleTask = (id) => {

        return this.tasks
            .get(`/tasks/${id}` )
            .then( response => {
                const singleTask = response.data;

                return singleTask
            })
            .catch( err => console.log(err))
    }


    getTasksByProject = (singleTask) => {
        const { projectId, taskId } = singleTask;
        
        

        return this.tasks
            .get(`/projects/${projectId}/tasks/${taskId}`)
            .then( response => {
                const projectsTasks = response.data;
                
                return projectsTasks;
            })
            .catch( err => console.log(err))
    }


    createTask = (newTask) => {
        const { title, description, deadline, projectId } = newTask;

        return this.tasks
            .post('/tasks', { title, description, deadline, projectId } )
            .then( response => {
                const { newTask  } = response.data

                return newTask
            })
            .catch( err => console.log(err))
    }


    updateTask = updatedTask => {
        const { title, description, deadline, taskId } = updatedTask;

        return this.tasks
            .put(`/tasks/${taskId}`,  { title, description, deadline })
            .then( response => {
                const {updatedTask} = response.data;

                return updatedTask
            })
            .catch(err => console.log(err))
    }


    deleteTask = (taskToDelete) => {
        const id = taskToDelete;

        return this.tasks
            .delete(`/tasks/${id}`, )
            .catch( err => console.log(err))
    }

}


const tasksService = new Task();

export default  tasksService;