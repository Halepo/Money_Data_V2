import { ReactNode } from 'react';
import './layout.module.sass';

import useAuth from '@/lib/hooks/useAuth';
import logger from '@/lib/logger';

import PersistLogin from '@/components/PersistLogin';
import RequireAuth from '@/components/RequireAuth';

import NavBar from './NavBar';
import { Sidebar } from './SideBar';
import Modal from '../../components/shared/modal';
import useUI from '../../lib/hooks/useUI';

// TODO add footer if needed
export default function Layout({
  children: Children,
}: {
  children: ReactNode;
}) {
  const { sidebarWidth, modalContent, modalTitle } = useUI();

  const auth = useAuth();
  logger.info(auth.auth, 'auth? ');

  //   <UIProvider>
  //   <Routes>
  //     <Route element={<PersistLogin />}>
  //       <Route path="login" element={<Login />} />
  //       <Route path="register" element={<Register />} />
  //       <Route path="logout" element={<Logout />} />

  //       {/* pages */}

  //       <Route element={<RequireAuth />}>
  //         <Route path="/*" element={<Pages />} />
  //         <Route path="unauthorized" element={<Unauthorized />} />
  //       </Route>
  //     </Route>
  //   </Routes>
  // </UIProvider>

  return (
    <PersistLogin>
      <RequireAuth>
        <div className='layout-wrapper'>
          <Sidebar />
          <div className='content-wrapper'>
            <NavBar />
            <div
              className='main-container'
              style={{
                marginLeft: `calc(2rem + ${sidebarWidth}px)`,
              }}
            >
              {Children}
              <Modal content={modalContent} title={modalTitle} />
            </div>
          </div>
        </div>
      </RequireAuth>
    </PersistLogin>
  );
}
