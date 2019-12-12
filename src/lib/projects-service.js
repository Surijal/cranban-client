import axios from 'axios';


class Project {
    constructor () {

        
        this.projects = axios.create({
            baseURL: 'http://localhost:5000/api',
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
        

        console.log('>>>>>>>>>>>>>>>>>>>> SERVICE PROPS', id);
        // console('<<<<<<<<<<<<<<<<< Credentials', this.projects.withCredentials);
        
        
        return this.projects
        .get(`/projects/${id}`)
        .then( response => {
                const singleProject = response.data

                return singleProject;
            })
            .catch( err => console.log(err))
    }
    
}


const projectsAxiosRequest = new Project();


export default projectsAxiosRequest;