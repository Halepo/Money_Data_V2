import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomButton from '../components/shared/CustomButton';
import LoginUI from './login/login';

export default function Home() {
  //where everything is

  //container with login

  // routers with a place to load other components
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          You are not logged in please login bellow!
        </Typography>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </Box>
      {
        //Routes here
      }
      <Routes>
        <Route path="/">
          <Route path="/login" element={<LoginUI />}></Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}
