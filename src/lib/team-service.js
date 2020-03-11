import axios from 'axios';


const baseURL = process.env.REACT_APP_API_URL;


class Team {
    constructor() {
        this.team = axios.create({ 
            baseURL: `${baseURL}/team`,
            withCredentials: true,
        })
    }


    createTeam( team ) {
        const { teamLeader, member, name } = team;

        return this.team
            .post('/', { teamLeader, member, name })
            .then( response => {
                const { newTeam } = response.data;

                return newTeam;
            })
            .catch( err => console.log(err))
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