import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router';

import useAuth from '../../lib/hooks/useAuth';
import AuthService from '../../lib/services/AuthService';
import { axiosPrivate } from '../../lib/services/axios';

export default function Logout() {
  const { setAuth } = useAuth();
  console.log('logging out...');
  useEffect(() => {
    setAuth({});
    const logoutHandler = async () => {
      await axiosPrivate
        .post('/auth/logout')
        .then((response: AxiosResponse<any, any>) => {
          console.log('logged out', response);
          AuthService.destroyCachedJwt();
        });
    };
    logoutHandler().catch((error) => console.log(error));
  }, []);
  return <Navigate to='/login' replace />;
}
