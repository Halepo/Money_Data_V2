import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import './register.module.sass';

import Logger from '@/helpers/lib/logger';

import { FormError } from '../../components/shared/formError';
import useAuth from '../../helpers/hooks/useAuth';
import { register } from '../../helpers/services/authApiService';

export default function Register(props: any) {
  const { auth } = useAuth();
  //states for username and password
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});

  const router = useRouter();
  const from = (router.query.from as string) || '/';

  useEffect(() => {
    setError({});
  }, [password, repeatPassword, email, name]);

  //functions to handle register form
  async function handleRegister(e: any) {
    //send username and password to register method
    e.preventDefault();
    try {
      const response: any = await register(
        name,
        email,
        password,
        repeatPassword
      );
      Logger.info('response', response);
      if (response.data.data._id) {
        Logger.info('successfully Registered!');
        router.push(from, { replace: true });
      }
    } catch (error: any) {
      Logger.info(error);
      if (error?.response?.data?.error) {
        Logger.info(error.response.data.error);
        setError(error.response.data.error);
      } else {
        error = [{ msg: error.message }];
        setError(error);
      }
      return null;
    }
  }

  return auth.token ? (
    router.push('/', { replace: true })
  ) : (
    // TODO styling register component
    <div className='register-wrapper relative h-full w-full bg-background'>
      <section className='register-container absolute top-1/4 m-auto max-w-md bg-background p-4'>
        <form className='register-form-container'>
          <h3 className='register-header'>Register to MoneyData</h3>
          <hr className='register-divider' />
          <div className='form-group'>
            <label htmlFor='standard-username-input'>Full Name</label>
            <input
              tabIndex={1}
              className='register-input-field form-control'
              onChange={(e) => setName(e.target.value)}
              required
              id='standard-username-input'
              type='username'
              placeholder='Enter username'
              autoComplete='current-username'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='standard-email-input'>Email</label>
            <input
              tabIndex={1}
              className='register-input-field form-control'
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
              className='register-input-field form-control'
              onChange={(e) => setPassword(e.target.value)}
              required
              id='standard-password-input'
              type='password'
              placeholder='Enter email'
              autoComplete='current-password'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='standard-repeat-password-input'>
              Repeat Password
            </label>
            <input
              className='register-input-field form-control'
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              id='standard-repeat-password-input'
              type='password'
              placeholder='Confirm Password'
            />
          </div>
          <div className='register-button-container'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Register
            </button>
          </div>
          {Object.keys(error).length > 0 ? <FormError error={error} /> : ''}
        </form>
      </section>
    </div>
  );
}
