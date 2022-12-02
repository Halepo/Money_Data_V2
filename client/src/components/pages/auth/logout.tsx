import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../helpers/hooks/useAuth';
import AuthService from '../../../helpers/services/AuthService';
import { axiosPrivate } from '../../../helpers/services/axios';

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
  return <Navigate to="/login" replace />;
}
