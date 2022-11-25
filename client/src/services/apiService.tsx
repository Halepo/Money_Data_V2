import axios from 'axios';
import { ICachedJWT } from '../interface/authTypes';
import AuthService from './AuthService';
import useFetchUserDetail from './userDetailHooks';

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

export const MakeRequest = async (
  url: string,
  method: string,
  data: Object | null,
  needAuthorization: boolean
) => {
  const userDetail: any | {} = useFetchUserDetail();
  if (Object.keys(userDetail).length > 0) {
    console.log(
      `Fetching for userId [${userDetail.userId}] from [${BASE_URL}/${url}]`
    );
    const headers: THeaders = AuthService.returnAuthHeader();
    console.log('header', headers);
    let requestHeaders: THeaders | {};
    needAuthorization ? (requestHeaders = headers) : (requestHeaders = {});

    const response: any = await axios({
      method: `${method}`,
      url: `${BASE_URL}/${url}`,
      headers: requestHeaders,
      data: data,
    });
    if (response.data.data.length > 0) {
      console.log('response', response.data.data);
      return response.data.data;
    }
  }
};
