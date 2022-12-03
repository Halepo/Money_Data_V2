import { useEffect, useState } from 'react';
import { register } from '../../../helpers/services/authApiService';
import { Navigate, useLocation, useNavigate } from 'react-router';
import './register.sass';

import { FormError } from '../../shared/formError';
import useAuth from '../../../helpers/hooks/useAuth';

export default function Register(props: any) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  //states for username and password
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    setError({});
  }, [password, repeatPassword, email, name]);

  //functions to handle register form
  async function handleRegister(e: any) {
    //send username and password to register method
    e.preventDefault();
    try {
      let response: any = await register(name, email, password, repeatPassword);
      console.log('response', response);
      if (response.data.data._id) {
        console.log('successfully Registered!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      } else {
        error = [{ msg: error.message }];
        setError(error);
      }
      return null;
    }
  }

  return auth.token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div className="register-wrapper">
      <section className="register-container">
        <form className="register-form-container">
          <h3 className="register-header">Register to MoneyData</h3>
          <hr className="register-divider" />
          <div className="form-group">
            <label htmlFor="standard-username-input">Full Name</label>
            <input
              tabIndex={1}
              className="register-input-field form-control"
              onChange={(e) => setName(e.target.value)}
              required
              id="standard-username-input"
              type="username"
              placeholder="Enter username"
              autoComplete="current-username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="standard-email-input">Email</label>
            <input
              tabIndex={1}
              className="register-input-field form-control"
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
              className="register-input-field form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
              id="standard-password-input"
              type="password"
              placeholder="Enter email"
              autoComplete="current-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="standard-repeat-password-input">
              Repeat Password
            </label>
            <input
              className="register-input-field form-control"
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              id="standard-repeat-password-input"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="register-button-container">
            <button
              type="button"
              className="btn btn-dark"
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
