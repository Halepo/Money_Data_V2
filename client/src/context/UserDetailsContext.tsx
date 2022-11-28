import React, { createContext, useEffect, useState } from 'react';
import { ICachedJWT, ICachedJWTEmpty } from '../helpers/interface/authTypes';
import AuthService from '../helpers/services/AuthService';

export const UserDetailsContext: any = createContext({});

const UserDetailContextProvider = (props: any) => {
  let fetchedUserDetails: ICachedJWT | ICachedJWTEmpty =
    AuthService.getCachedJwt();
  const [userDetails, setUserDetails] = useState({
    isLoggedIn: fetchedUserDetails.accessToken ? true : false,
    data: fetchedUserDetails.accessToken ? fetchedUserDetails : {},
  });

  const value = { userDetails, setUserDetails };
  return (
    <UserDetailsContext.Provider value={value}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailContextProvider;
