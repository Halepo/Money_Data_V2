import axios from 'axios';
import jwtDecode from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import {
  ICachedJWT,
  ICachedJWTEmpty,
  IDecodedJWT,
} from '../interface/authTypes';
import AuthService from './AuthService';

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
  const userDetail: any | {} = AuthService.getCachedJwt();

  if (Object.keys(userDetail).length > 0) {
    const decodedJWT: IDecodedJWT = jwtDecode(userDetail.accessToken);
    let userId: any = decodedJWT?.user_id;
    console.log(
      `Fetching for userId [${userId}] from [${BASE_URL}/${requestParams.url}]`
    );
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
