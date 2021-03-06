import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });
  }

  signup(user) {
    const { username, password, email } = user;
    return this.auth
      .post('/auth/signup', { username, password, email })
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth
      .post('/auth/login', { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout', {}).then(response => response.data);
  }

  me() {
    return this.auth.get('/auth/me').then(response => response.data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
