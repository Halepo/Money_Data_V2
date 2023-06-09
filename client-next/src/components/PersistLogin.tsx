import { useEffect } from 'react';
import { useState } from 'react';

import Logger from '@/helpers/lib/logger';

import useAuth from '../helpers/hooks/useAuth';
import useRefreshToken from '../helpers/hooks/useRefreshToken';

export default function PersistLogin({ children }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  Logger.info('persist calleddddddddddddddddd');

  useEffect(() => {
    let ignore = false;
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        Logger.info('New Access Token', newAccessToken);
        setAuth({ token: newAccessToken });
      } catch (error) {
        Logger.info(error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      ignore = true;
    };
  }, [auth?.token, refresh, setAuth]);

  return <>{isLoading ? <div>Loading...</div> : <>{children}</>}</>;
}
