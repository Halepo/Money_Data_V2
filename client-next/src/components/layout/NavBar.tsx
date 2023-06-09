import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';
import './navbar.module.sass';

//context
import useAuth from '@/lib/hooks/useAuth';
import useUI from '@/lib/hooks/useUI';
import { IDecodedJWT } from '@/lib/interface/authTypes';
import logger from '@/lib/logger';

// TODO Register expense and income modal or UI

export default function NavBar() {
  const { sidebarWidth } = useUI();

  const router = useRouter();
  const currentPath = router.pathname;
  const Path =
    currentPath === '/'
      ? 'Home'
      : currentPath[1]?.toUpperCase() + router.pathname?.substring(2);

  const { auth } = useAuth();
  logger.info(auth, 'auth in navbar');
  const decodedJWT: IDecodedJWT = jwtDecode(auth.token);
  const name = decodedJWT?.userName;

  const handleLogout = () => {
    logger.info('handle running...');
    // TODO handle logout logic
  };

  return (
    <div
      className='navbar-wrapper'
      // calculate the gap
      style={{
        marginLeft: `calc(2rem + ${sidebarWidth}px)`,
        marginRight: '1rem',
      }}
    >
      <h3 className='title mx-5'>{Path}</h3>
      <Link
        href='/logout'
        className='dropdown-toggle'
        role='button'
        id='navbar-profile-menu-toggle'
        data-bs-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <div className='navbar-profile-avatar'>{name ? `${name[0]}` : ''}</div>
      </Link>
      {/* // TODO made this menu it's own component */}
      <div
        className='dropdown-menu navbar-profile-menu'
        aria-labelledby='navbar-profile-menu'
      >
        <h6 className='navbar-title'>{name ? `${name}` : ''}</h6>
        <button
          className='btn btn-outline-secondary'
          onClick={(e) => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
