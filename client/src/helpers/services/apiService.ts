import axios from './axios';
import jwtDecode from 'jwt-decode';
import { IDecodedJWT } from '../interface/authTypes';
import AuthService from './AuthService';
import useAuth from '../hooks/useAuth';
const BASE_URL = 'http://localhost:4001/api';

type IRequest = {
  url: string;
  method: string;
  data: Object;
  needAuthorization: boolean;
};

type THeaders = {
  Authorization: string;
  Accept: string;
  'Content-Type': string;
  'Access-Control-Allow-Origin': string;
};

export const MakeRequest = async (requestParams: {
  url: string;
  method: string;
  data: Object | null;
  needAuthorization: boolean;
}) => {
  const auth = { token: '000' };
  if (Object.keys(auth.token).length > 0) {
    const decodedJWT: IDecodedJWT = jwtDecode(auth.token);
    let userId: any = decodedJWT?.user_id;
    console.log(`Fetching for userId [${userId}] from [/${requestParams.url}]`);
    const headers: THeaders = AuthService.returnAuthHeader();
    console.log('header', headers);
    let requestHeaders: THeaders | {};
    requestParams.needAuthorization
      ? (requestHeaders = headers)
      : (requestHeaders = {});

    const response: any = await axios({
      method: `${requestParams.method}`,
      url: `${BASE_URL}/${requestParams.url}`,
      headers: requestHeaders,
      data: requestParams.data,
    });
    if (response.data.data.length > 0) {
      console.log('response', response.data.data);
      return response.data.data;
    }
  } else throw { error: 'Not logged in!' };
};
