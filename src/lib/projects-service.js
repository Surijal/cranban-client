import axios from 'axios';


class Project {
    constructor () {

        
        this.projects = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true,
        })
    } 


    getAllProjects = () => {
        return this.projects
            .get('/projects')
            .then( (response ) => {
                const listOfProjects = response.data;
                
                return listOfProjects;
            })
            .catch((err) => console.log(err))
    }


    getSingleProject = (id) => {
        
        return this.projects
        .get(`/projects/${id}`)
        .then( response => {
                const singleProject = response.data

                return singleProject;
            })
            .catch( err => console.log(err))
    }


    createProject = (oneProject) => {
        const { title, description, deadline } = oneProject;


        return this.projects
        .post('/projects', { title, description, deadline })
        .then( response => {
            const {newProject} = response.data;

            return newProject;
        })
        .catch( err => console.log(err))
    }


    updateProject = (updatedProject) => {
        const { title, description, deadline } = updatedProject;


        return this.projects
            .put('/projects/:id', { title, description, deadline })
            .then( (response) => {
                const { updatedProject } = response.data;

                return updatedProject;
            })
            .catch( err => console.log(err))
    }
    
}


const projectsAxiosRequest = new Project();


export default projectsAxiosRequest;