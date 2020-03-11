import axios from 'axios';


const baseURL = process.env.REACT_APP_API_URL;


class Team {
    constructor() {
        this.team = axios.create({ 
            baseURL: `${baseURL}/team`,
            withCredentials: true,
        })
    }


    getTeamById = ( id ) => {

        return this.team
            .get(`/${id}`)
            .then( response => {
                const singleTeam = response.data

                return singleTeam;
            })
            .catch( err => console.log(err))
    }

}



const teamService = new Team();

export default teamService;