import './navbar.sass';
import { useState } from 'react';
import { useLocation } from 'react-router';
import jwtDecode from 'jwt-decode';
import { Avatar } from '@mui/material';

import AuthService from '../../helpers/services/AuthService';
import { IDecodedJWT } from '../../helpers/interface/authTypes';
import useAuth from '../../helpers/hooks/useAuth';

//Components
import { AccountDrawer } from './accountDrawer';
import RegisterExpenseModal from '../shared/RegisterExpenseModal';
import { CallReceived } from '@mui/icons-material';

export default function NavBar({ sidebarWidth }: { sidebarWidth: number }) {
  const location = useLocation();
  const Path =
    location.pathname === '/'
      ? 'Home'
      : location.pathname[1]?.toUpperCase() + location.pathname?.substring(2);

  //register modal
  const [registerExpenseModalOpen, setRegisterExpenseModalOpen] =
    useState(false);

  const { auth, setAuth } = useAuth();
  const decodedJWT: IDecodedJWT = jwtDecode(auth.token);
  const name = decodedJWT.userName;

  console.log('NavBar Rendered!');

  const handleLogout = () => {
    AuthService.destroyCachedJwt();
    setAuth({});
  };

  return (
    <div
      className="navbar-wrapper"
      style={{
        marginLeft: sidebarWidth + sidebarWidth * 0.1 + 'px',
        width: `calc(95% - ${sidebarWidth}px)`,
      }}
    >
      <h3 className="navbar-page-title">{Path}</h3>
      <small className="navbar-page-description">
        This is some detail about this page
      </small>
      <div className="navbar-buttons-container ">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setRegisterExpenseModalOpen(true)}
        >
          Register Expense
        </button>
        <button
          className="btn btn-outline-secondary"
          // onClick={() => setRegisterForm('income')}
        >
          Register Income
        </button>
      </div>
      <div className="navbar-account-information">
        <AccountDrawer
          button={<Avatar sx={{ bgcolor: 'blue' }}>{name[0]}</Avatar>}
          sliderItems={
            <>
              <h6 className="navbar-title">{name ? `${name}` : ''}</h6>
              <button
                className="btn btn-outline-secondary"
                onClick={(e) => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          }
        />
      </div>
      <RegisterExpenseModal
        open={registerExpenseModalOpen}
        setOpen={setRegisterExpenseModalOpen}
      />
    </div>
  );
}
