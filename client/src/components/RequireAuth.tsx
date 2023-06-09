import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../helpers/hooks/useAuth";

const RequireAuth = (children: any) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
