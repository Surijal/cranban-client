import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

class User {
    constructor() {
        this.user = axios.create( {
            baseURL: `${baseURL}/api/users`,
            withCredentials: true,
        })
    }

    getUserById = (id) => {

        return this.user
            .get(`/${id}`)
            .then( response => {
                const singleUser = response.data

                return singleUser;
            })
            .catch(err => console.log(err))
    }


    getUserByEmail = (email) => {

        return this.user
            .get(`/email/${email}`)
            .then( response  => {
                const singleUser = response.datat;

                return singleUser
            })
            .catch(err => console.log(err))
    }


    patchUser = userData => {

        const { username, password, email, id } = userData;
        

        return this.user
            .patch(`/${id}`, { username, password, email })
            .then( response => {
                const singleUser = response.data;

                return singleUser
            })
            .catch( err => console.log(err))
    }


    deleteUser = id => {
        
        return this.user
            .delete(`/${id}`)
            .then( response => {
                const singleUser = response.data

                return singleUser
            })
            .catch( err => console.log)
    }

}


const userService = new User();

export default userService;