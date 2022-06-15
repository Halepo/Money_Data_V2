import axios from 'axios';

const API_URL = 'http://localhost:4001/api/auth/';

const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + 'login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = (): void => {
  localStorage.removeItem('user');
};
const authService = {
  register,
  login,
  logout,
};

export default authService;
