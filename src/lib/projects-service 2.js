import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

class Project {
    constructor () {

        
        this.projects = axios.create({
            baseURL: `${baseURL}/api/`,
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


    getUserProjects = (userId) => {

        const  id  = userId;

        return this.projects
            .get(`/projects/user/${id}`)
            .then( response => {
                const userProjects = response.data

                return userProjects
            })
            .catch( err => console.log(err))
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
        const { title, description, deadline, id } = updatedProject;

        return this.projects
            .put(`/projects/${id}`, { title, description, deadline })
            .then( (response) => {
                const { updatedProject } = response.data;

                return updatedProject;
            })
            .catch( err => console.log(err))
    }
    

    deleteProject = (projectToDelete) => {
        const id = projectToDelete

        return this.projects
            .delete(`/projects/${id}`)
            
    } 
}


const projectsAxiosRequest = new Project();


export default projectsAxiosRequest;