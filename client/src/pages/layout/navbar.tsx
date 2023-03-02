import './navbar.sass';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';
import { IDecodedJWT } from '../../helpers/interface/authTypes';
import useAuth from '../../helpers/hooks/useAuth';

// TODO Register expense and income modal or UI
// import RegisterExpenseModal from '../shared/RegisterExpenseModal';

export default function NavBar({ sidebarWidth }: { sidebarWidth: number }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const Path =
    currentPath === '/'
      ? 'Home'
      : currentPath[1]?.toUpperCase() + location.pathname?.substring(2);

  //register modal
  const [registerExpenseModalOpen, setRegisterExpenseModalOpen] =
    useState(false);

  const { auth } = useAuth();
  const decodedJWT: IDecodedJWT = jwtDecode(auth.token);
  const name = decodedJWT.userName;

  console.log('NavBar Rendered!');

  const handleLogout = () => {
    console.log('handle running...');
    return navigate('/logout');
  };

  return (
    <div
      className="row navbar-wrapper"
      style={{
        marginLeft: sidebarWidth + sidebarWidth * 0.1 + 'px',
      }}
    >
      <div className="col-2">
        <p className="font-weight-bolder">{Path}</p>
      </div>
      <div className="col-6 d-flex justify-content-center"></div>
      <div className="col-3">
        <div className="row">
          <div className="col-6 d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary button-font"
              onClick={() => setRegisterExpenseModalOpen(true)}
            >
              NEW EXPENSE
            </button>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary button-font"
              // onClick={() => setRegisterForm('income')}
            >
              NEW INCOME
            </button>
          </div>
        </div>
      </div>
      <div className="col-1 d-flex justify-content-center">
        <a
          className="dropdown-toggle"
          role="button"
          id="navbar-profile-menu"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="navbar-profile-avatar">
            {name ? `${name[0]}` : ''}
          </div>
        </a>
        {/* // TODO made this menu it's own component */}
        <div
          className="dropdown-menu navbar-profile-menu"
          aria-labelledby="navbar-profile-menu"
        >
          <h6 className="navbar-title">{name ? `${name}` : ''}</h6>
          <button
            className="btn btn-outline-secondary"
            onClick={(e) => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/* <RegisterExpenseModal
        open={registerExpenseModalOpen}
        setOpen={setRegisterExpenseModalOpen}
      /> */}
    </div>
  );
}
