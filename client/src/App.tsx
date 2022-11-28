import './App.sass';
import { Routes, Route } from 'react-router';
import Login from './components/pages/auth/login';
import NotFound from './components/shared/404';
import RequireAuth from './components/shared/RequireAuth';
import Home from './components/pages/home/home';
import Logout from './components/pages/auth/logout';
import Unauthorized from './components/pages/auth/unauthorized';
import Pages from './components/pages/pages';

export default function App() {
  return (
    <Routes>
      <Route path="links" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Login />} />

      <Route path="logout" element={<Logout />} />

      {/* pages */}
      <Route element={<RequireAuth />}>
        <Route path="/*" element={<Pages />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}
