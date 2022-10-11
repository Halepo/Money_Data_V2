import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:4001/';
const LOGIN_URL = API_URL + 'api/auth/login';
const REFRESH_URL = API_URL + '/users/refreshToken';
const REGISTER_URL = API_URL + 'api/auth/register';

const BearerHeader = (token: string) => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return config;
};

//This file is all about api calling functions!

export async function login(username: string, password: string) {
  const bodyData = {
    password: password,
    email: username,
  };

  let config = {
    headers: {},
  };

  return await axios
    .post(LOGIN_URL, bodyData, config)
    .then((response: AxiosResponse<any, any>) => {
      return response;
    });
}

export async function refreshToken(token: string) {
  return await axios
    .post(REFRESH_URL, BearerHeader(token))
    .then((response: AxiosResponse<any, any>) => {
      return response;
    });
}

export async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
) {
  return axios.post(REGISTER_URL, {
    name,
    email,
    password,
    passwordConfirmation,
  });
}
