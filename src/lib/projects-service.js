import axios from 'axios';


class Project {
    constructor () {

        
        this.projects = axios.create({
            baseURL: 'http://localhost:5000/api/projects',
            withCredentials: true,
        })
    } 


    getAllProjects = () => {
        return this.projects
            .get('/')
            .then( (response ) => {
                const listOfProjects = response.data;
                
                return listOfProjects;
            })
            .catch((err) => console.log(err))
    }


    getSingleProject = (id) => {
        
        return this.projects
        .get(`/${id}`)
        .then( response => {
                const singleProject = response.data

                return singleProject;
            })
            .catch( err => console.log(err))
    }


    createProject = () => {

        return this.projects
        .post('/')
        .then( response => {
            const {newProject} = response.data;

            return newProject;
        })
        .catch( err => console.log(err))
    }
    
}


const projectsAxiosRequest = new Project();


export default projectsAxiosRequest;