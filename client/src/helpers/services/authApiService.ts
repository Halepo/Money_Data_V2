import { AxiosResponse } from 'axios';
import axios from './axios';

const LOGIN_URL = '/auth/login';
const REFRESH_URL = '/auth/refresh';
const REGISTER_URL = '/auth/register';

const BearerHeader = (token: string) => {
  let config = {
    headers: {
      ...headerConfig.headers,
      Authorization: 'Bearer ' + token,
    },
  };
  return config;
};

const headerConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
};

//This file is all about api calling functions!

export async function login(username: string, password: string) {
  const bodyData = {
    password: password,
    email: username,
  };

  return await axios
    .post(LOGIN_URL, bodyData, headerConfig)
    .then((response: AxiosResponse<any, any>) => {
      return response;
    });
}

export async function refresh() {
  return await axios
    .get(REFRESH_URL, headerConfig)
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
