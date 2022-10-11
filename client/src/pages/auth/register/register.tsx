import { ReactElement, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import AuthService from '../../../services/AuthService';
import { register } from '../../../services/authApiService';
import { useNavigate } from 'react-router';

import { FormError } from '../../../components/FormError';

export default function Register(props: any) {
  const navigate = useNavigate();
  //states for username and password
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState({});

  //functions to handle login form
  async function handleRegister(e: any) {
    //send username and password to login method
    e.preventDefault();
    try {
      let response: any = await register(name, email, password, repeatPassword);
      console.log('response', response);
      if (response.data.data._id) {
        console.log('successfully Registered!');
        navigate('/login');
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Register</Typography>
      <Divider
        sx={{
          width: '80%',
          height: '.1rem',
          backgroundColor: 'gray',
          marginBottom: '2rem',
        }}
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setName(e.target.value)}
        required
        id="standard-username-input"
        label="Full Name"
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setEmail(e.target.value)}
        required
        id="standard-email-input"
        label="Email"
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setPassword(e.target.value)}
        id="standard-password-input"
        label="Password"
        type="password"
        required
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setRepeatPassword(e.target.value)}
        id="standard-password-input"
        label="Repeat Password"
        type="password"
        required
      />
      <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleRegister(e);
          }}
        >
          Register
        </Button>
      </Box>
      {Object.keys(error).length > 0 ? <FormError error={error} /> : ''}
    </Box>
  );
}
