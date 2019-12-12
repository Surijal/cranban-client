import axios from 'axios';


class Task {
    constructor(){

        this.tasks = axios.create( {
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true,
        })
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



}


const tasksService = Task();

module.exports = tasksService;