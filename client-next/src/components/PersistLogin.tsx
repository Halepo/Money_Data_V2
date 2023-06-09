import { useEffect } from 'react';
import { useState } from 'react';

import Logger from '@/lib/logger';

import useAuth from '../lib/hooks/useAuth';
import useRefreshToken from '../lib/hooks/useRefreshToken';

export default function PersistLogin({ children }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  Logger.info('*** Persist Called ***');

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
