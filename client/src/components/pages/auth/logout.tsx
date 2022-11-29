import { useEffect } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../../helpers/hooks/useAuth';
import AuthService from '../../../helpers/services/AuthService';

export default function Logout() {
  const { setUserDetails } = useAuth();
  useEffect(() => {
    AuthService.destroyCachedJwt();
    setUserDetails({ isLoggedIn: false, data: {} });
  }, []);

  return <Navigate to="/login" replace />;
}
