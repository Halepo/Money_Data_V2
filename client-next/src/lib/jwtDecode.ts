import jwtDecode from 'jwt-decode';

import { IDecodedJWT } from '../interface/authTypes';

export const decodeJWT = (JWT: string): IDecodedJWT => {
  return jwtDecode(JWT);
};
