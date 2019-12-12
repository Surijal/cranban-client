import axios from 'axios';


class Project {
    constructor () {
        
        this.projects = axios.create({
            baseUrl: 'http://localhost:5000/api',
        })


    } 


    getAllProjects = () => {

        axios.get('/projects')
            .then( (response ) => {
                const listOfProjects = response.data;
                console.log('GETALLPROJECTS', response.data)
                this.setState({ listOfProjects })
            })
            .catch((err) => console.log(err))
    }
}


const projectsAxiosRequest = new Project();

export default projectsAxiosRequest;