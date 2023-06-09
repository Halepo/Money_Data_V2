import useAuth from './useAuth';
import { refresh } from '../services/authApiService';

export default function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refreshToken = async () => {
    const response: any = await refresh();
    console.log('.....response', response);
    setAuth((prev: any) => {
      console.log(`Previous State: ${JSON.stringify(prev)}`);
      console.log('response', response.data.data.token);
      prev.token = response.data.data.token;
      return prev;
    });
    console.log('auth', auth);
    return response?.data?.data?.token;
  };
  return refreshToken;
}
