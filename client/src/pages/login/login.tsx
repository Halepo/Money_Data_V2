import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import AuthService from '../../services/AuthService';
import { Login } from '../../services/ApiService';

export default function LoginUI(props: any) {
  //states for username and password
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [JwtStatus, setJwtStatus] = useState('');

  //functions to handle login form
  async function handleLogin(e: any) {
    //send username and password to login method
    e.preventDefault();
    try {
      let response: any = await Login(username, password);
      console.log(response);
      if (response.data.sign_in.token) {
        AuthService.saveAccessTokenAsCachedJwt(response);
        console.log('successfully logged in!');
        props.history.push('/');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <Card sx={{ margin: 'auto', width: '400px', marginTop: '50px' }}>
      <Box
        onSubmit={handleLogin}
        sx={{
          '& > *': {
            marginBottom: '20px',
          },
          margin: 'auto',
          width: '400px',
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Divider sx={{ width: '80%' }} />
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          required
          id="standard-username-input"
          label="User Name"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Box sx={{ display: 'flex' }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
        <Button
          onClick={(e) => {
            setJwtStatus(AuthService.checkCachedJwtStatus());
          }}
          variant="contained"
          color="primary"
        >
          Check JWT
        </Button>
        <Typography>{JwtStatus}</Typography>
      </Box>
    </Card>
  );
}
