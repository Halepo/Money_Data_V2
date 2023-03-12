import './layout.sass';
import { Outlet } from 'react-router';
import NavBar from './navbar';
import { Sidebar } from './sidebar';
import useUI from '../../helpers/hooks/useUI';

// TODO add footer if needed
export default function Layout() {
  const { sidebarWidth } = useUI();

  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <NavBar />
        <div
          className="main-container"
          style={{
            marginLeft: `calc(2rem + ${sidebarWidth}px)`,
            marginRight: '.1rem',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
