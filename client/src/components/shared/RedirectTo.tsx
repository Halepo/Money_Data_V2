import { Navigate } from 'react-router';

export default function useRedirectTo(route: string) {
  return <Navigate to={`/${route}`} replace={true} />;
}
