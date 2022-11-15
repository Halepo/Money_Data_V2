import React, { useContext } from 'react';
import { Routes, Route } from 'react-router';
import RedirectTo from '../components/RedirectHome';
import { ICachedJWT } from '../interface/authTypes';
import Layout from '../layout/layout';
import UserDetailContextProvider, {
  UserDetailsContext,
} from '../services/context/UserDetailsContext';
import LoginUI from './auth/login/login';
import Register from './auth/register/register';
import Home from './home/home';
import Profile from './profile/profile';

export default function Index() {
  const userDetails:React.Context<ICachedJWT>  = useContext(UserDetailsContext);
  return (
    <UserDetailContextProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="home" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="profile" element={<Profile />}></Route>
              </Routes>
            </Layout>
          }
        ></Route>
      </Routes>
    </UserDetailContextProvider>
  );
}
