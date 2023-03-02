import './App.sass';
import { Routes, Route } from 'react-router';
import Login from './pages/auth/login';
import RequireAuth from './components/RequireAuth';
import Logout from './pages/auth/logout';
import Unauthorized from './pages/auth/unauthorized';
import Pages from './pages/pages';
import PersistLogin from './components/PersistLogin';
import Register from './pages/auth/register';

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
