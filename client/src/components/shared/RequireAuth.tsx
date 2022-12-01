import { useLocation, Navigate, Outlet } from 'react-router';
import useAuth from '../../helpers/hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
