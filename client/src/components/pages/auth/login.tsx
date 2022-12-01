import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './login.sass';

import { login } from '../../../helpers/services/authApiService';
import useAuth from '../../../helpers/hooks/useAuth';
import RedirectTo from '../../shared/RedirectTo';
import { FormError } from '../../shared/FormError';

export default function Login(props: any) {
  console.log('Login rendered!');
  const { auth, setAuth }: any = useAuth();
  console.log('user Details from login', auth);
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  //states for username and password
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  useEffect(() => {
    setError({});
  }, [password, email]);

  async function handleLogin(e: any) {
    try {
      let response: any = await login(email, password);
      console.log('response', response);
      if (response.data.data.token) {
        console.log('successfully logged in!');
        setAuth({ token: response.data.data.token });
        setError({});
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        setError(errorData);
      } else {
        setError(error);
      }
      return null;
    }
  }

  return auth.token ? (
    RedirectTo('')
  ) : (
    <div className="login-wrapper">
      <section className="container login-container card">
        <form className="login-form-container">
          <h3>Welcome to MoneyData</h3>
          <p>Please login </p>
          <hr className="login-container-divider" />
          <div className="form-group">
            <label htmlFor="standard-email-input">Email address</label>
            <input
              tabIndex={1}
              className="login-input-field form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
              id="standard-email-input"
              type="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              autoComplete="current-email"
            />
            <small
              id="emailHelp"
              className="login-form-small form-text text-muted"
            >
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="standard-password-input">Password</label>
            <input
              className="login-input-field form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
              id="standard-password-input"
              type="password"
              aria-describedby="passwordHelp"
              placeholder="Enter email"
              autoComplete="current-password"
            />
            <small
              id="passwordHelp"
              className="login-form-small form-text text-muted"
            >
              We'll never share your password with anyone else.
            </small>
          </div>

          <div className="login-button-container">
            <button
              type="button"
              className="btn btn-outline-secondary"
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
