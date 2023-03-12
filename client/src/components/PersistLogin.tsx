import useAuth from '../helpers/hooks/useAuth';
import useRefreshToken from '../helpers/hooks/useRefreshToken';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router';

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  console.log('persist calleddddddddddddddddd');

  useEffect(() => {
    let ignore = false;
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        console.log('New Access Token', newAccessToken);
        setAuth({ token: newAccessToken });
      } catch (error) {
        console.log(error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      ignore = true;
    };
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
}
