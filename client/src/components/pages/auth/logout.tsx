import { useEffect } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../../helpers/hooks/useAuth';
import AuthService from '../../../helpers/services/AuthService';

export default function Logout() {
  const { setAuth } = useAuth();
  useEffect(() => {
    AuthService.destroyCachedJwt();
    setAuth({});
  }, []);

  return <Navigate to="/login" replace />;
}
