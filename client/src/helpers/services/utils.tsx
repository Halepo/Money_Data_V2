import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { IDecodedJWT } from '../interface/authTypes';

export const useBeforeRender = (callback: Function, deps: any) => {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
    callback();
    setIsRun(true);
  }

  useEffect(() => () => setIsRun(false), deps);
};

export const decodeJWT = (JWT: string): IDecodedJWT => {
  return jwtDecode(JWT);
};
