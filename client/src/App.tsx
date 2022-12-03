import './App.sass';
import { Routes, Route } from 'react-router';
import Login from './components/pages/auth/login';
import RequireAuth from './components/shared/RequireAuth';
import Logout from './components/pages/auth/logout';
import Unauthorized from './components/pages/auth/unauthorized';
import Pages from './components/pages/pages';
import PersistLogin from './components/shared/PersistLogin';
import Register from './components/pages/auth/register';

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />

        {/* pages */}

        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Pages />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>
    </Routes>
  );
}
