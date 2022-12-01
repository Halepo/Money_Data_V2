import './layout.sass';
import { Outlet } from 'react-router';
import NavBar from './navbar';
import Footer from './footer';
import { Sidebar } from './sidebar';

export default function Layout() {
  const sidebarWidth = 240;
  return (
    <div className="layout-wrapper">
      <Sidebar width={sidebarWidth + 'px'} />
      <div className="content-wrapper">
        <NavBar sidebarWidth={sidebarWidth} />
        <div
          className="main-container"
          style={{
            marginLeft: sidebarWidth + sidebarWidth * 0.15 + 'px',
            marginTop: '120px',
          }}
        >
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}