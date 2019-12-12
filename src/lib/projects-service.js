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
                console.log('GETALLPROJECTS', response.data)
                return listOfProjects;
            })
            .catch((err) => console.log(err))
    }
    
}


const projectsAxiosRequest = new Project();


export default projectsAxiosRequest;