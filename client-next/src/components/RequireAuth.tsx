import { useRouter } from 'next/router';

import useAuth from '../lib/hooks/useAuth';

const RequireAuth = ({ children }: any) => {
  const { auth } = useAuth();
  const router = useRouter();
  if (auth.token) {
    return <>{children}</>;
  } else {
    router.push('auth/login');
  }
  return null;
};

export default RequireAuth;
