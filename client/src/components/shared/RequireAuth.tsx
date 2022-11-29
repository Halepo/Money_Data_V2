import { useLocation, Navigate, Outlet } from 'react-router';
import useAuth from '../../helpers/hooks/useAuth';

const RequireAuth = () => {
  const { userDetails } = useAuth();
  const location = useLocation();
  return userDetails.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
