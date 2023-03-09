import './navbar.sass';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';
import { IDecodedJWT } from '../../helpers/interface/authTypes';

//context
import useAuth from '../../helpers/hooks/useAuth';
import useUI from '../../helpers/hooks/useUI';

// TODO Register expense and income modal or UI
// import RegisterExpenseModal from '../shared/RegisterExpenseModal';

export default function NavBar() {
  const { sidebarWidth } = useUI();

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
      className="navbar-wrapper"
      // calculate the gap
      style={{
        marginLeft: `calc(2rem + ${sidebarWidth}px)`,
        marginRight: '1rem',
      }}
    >
      <h3 className="title mx-5">{Path}</h3>
      <a
        className="dropdown-toggle"
        role="button"
        id="navbar-profile-menu"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="navbar-profile-avatar">{name ? `${name[0]}` : ''}</div>
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
      {/* <RegisterExpenseModal
        open={registerExpenseModalOpen}
        setOpen={setRegisterExpenseModalOpen}
      /> */}
    </div>
  );
}
