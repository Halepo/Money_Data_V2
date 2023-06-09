import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import './login.module.sass';

import Logger from '@/lib/logger';

import { FormError } from '../../components/shared/formError';
import useAuth from '../../lib/hooks/useAuth';
import { login } from '../../lib/services/authApiService';

export default function Login(props: any) {
  Logger.info('Login rendered!');
  const { auth, setAuth }: any = useAuth();
  Logger.info('user Details from login', auth);
  const router = useRouter();

  const from = (router.query.from as string) || '/';

  //states for username and password
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  useEffect(() => {
    setError({});
  }, [password, email]);

  async function handleLogin(e: any) {
    try {
      const response: any = await login(email, password);

      Logger.info('response', response);

      if (response.data.data.token) {
        Logger.info('successfully logged in!');

        setAuth({ token: response.data.data.token });
        setError({});
        router.replace(from, from);
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        const errorData = error.response.data.error;
        setError(errorData);
      } else {
        setError(error);
      }
      return null;
    }
  }

  return auth.token ? (
    <div>
      <p>Already logged in</p>
      <button onClick={() => router.push('/')}>Go to home page</button>
    </div>
  ) : (
    // TODO styling login component
    <div className='login-wrapper'>
      <section className='login-container'>
        <form className='login-form-container'>
          <h3 className='login-header'>Welcome to MoneyData</h3>
          <hr className='login-divider' />
          <div className='form-group'>
            <label htmlFor='standard-email-input'>Email</label>
            <input
              tabIndex={1}
              className='login-input-field form-control'
              onChange={(e) => setEmail(e.target.value)}
              required
              id='standard-email-input'
              type='email'
              placeholder='Enter email'
              autoComplete='current-email'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='standard-password-input'>Password</label>
            <input
              className='login-input-field form-control'
              onChange={(e) => setPassword(e.target.value)}
              required
              id='standard-password-input'
              type='password'
              placeholder='Enter email'
              autoComplete='current-password'
            />
          </div>

          <div className='login-button-container'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              Login
            </button>
          </div>
          {Object.keys(error).length > 0 ? <FormError error={error} /> : ''}
        </form>
      </section>
    </div>
  );
}
