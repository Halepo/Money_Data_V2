import { Navigate } from 'react-router';

export default function RedirectTo({ route }: any) {
  return <Navigate to={`/${route}`} replace={true} />;
}
