import axios from 'axios';


class User {
    constructor() {
        this.user = axios.create( {
            baseURL: 'http://localhost:5000/api/',
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


    patchUser = id => {

        return this.user
            .patch(`/${id}`)
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