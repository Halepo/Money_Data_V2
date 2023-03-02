import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import './login.sass';

import { login } from '../../helpers/services/authApiService';
import useAuth from '../../helpers/hooks/useAuth';
import { FormError } from '../../components/shared/formError';

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
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div className="login-wrapper">
      <section className="login-container">
        <form className="login-form-container">
          <h3 className="login-header">Welcome to MoneyData</h3>
          <hr className="login-divider" />
          <div className="form-group">
            <label htmlFor="standard-email-input">Email</label>
            <input
              tabIndex={1}
              className="login-input-field form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
              id="standard-email-input"
              type="email"
              placeholder="Enter email"
              autoComplete="current-email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="standard-password-input">Password</label>
            <input
              className="login-input-field form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
              id="standard-password-input"
              type="password"
              placeholder="Enter email"
              autoComplete="current-password"
            />
          </div>

          <div className="login-button-container">
            <button
              type="button"
              className="btn btn-dark"
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
