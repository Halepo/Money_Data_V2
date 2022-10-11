import './navbar.sass';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import {
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { ThemeContext } from '../services/context/ThemeContext';
import { AccountDrawer } from './accountDrawer';

//Components
import { removeCachedJWT } from '../store/actionCreators';
import { Menu } from '@mui/icons-material';
import { UserDetailsContext } from '../services/context/UserDetailsContext';

export default function NavBar() {
  const { userDetails }: any = useContext(UserDetailsContext);

  console.log('NavBar Rendered!');
  console.log('userDetails', userDetails);

  const navigate = useNavigate();
  const handleLogout = () => {
    removeCachedJWT();
    navigate('/login');
  };

  const { themeBackgroundColor }: any = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: themeBackgroundColor,
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: '999',
      }}
    >
      <Container sx={{ display: 'flex', margin: 'auto', my: 4 }}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <RequestQuoteIcon fontSize="large" />
          <Typography
            sx={{ marginLeft: '1rem' }}
            variant="h6"
            component="h1"
            gutterBottom
          >
            Money Manager
          </Typography>
        </Box>
        <Box
          sx={{
            margin: 'auto',
            marginRight: '0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {userDetails.fullName ? (
            <Box sx={{ margin: 'auto', display: 'flex' }}>
              <AccountDrawer
                button={
                  <Avatar sx={{ bgcolor: 'blue' }}>
                    {userDetails.fullName[0]}
                  </Avatar>
                }
                sliderItems={
                  <>
                    <Typography
                      sx={{ marginRight: '1rem' }}
                      variant="h6"
                      component="h1"
                    >
                      {userDetails.fullName ? `${userDetails.fullName}` : ''}
                    </Typography>
                    <Button
                      onClick={(e) => {
                        handleLogout();
                      }}
                      sx={{ marginRight: '1rem' }}
                      variant="outlined"
                      startIcon={<LogoutIcon fontSize="inherit" />}
                    >
                      Logout
                    </Button>
                  </>
                }
              />
            </Box>
          ) : (
            <Box sx={{ margin: 'auto', display: 'flex' }}>
              <Link to="/login">
                <Button
                  sx={{ marginRight: '1rem' }}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                >
                  login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outlined" startIcon={<HowToRegIcon />}>
                  Register
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
