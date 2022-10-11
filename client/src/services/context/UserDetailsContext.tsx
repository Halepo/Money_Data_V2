import React, {
  createContext,
  useReducer,
  useEffect,
  Component,
  useState,
} from 'react';
import { ICachedJWT } from '../../interface/authTypes';
import NavBar from '../../layout/navbar';
import useFetchUserDetail from '../userDetailHooks';

type TContext = {};

export const UserDetailsContext: any = createContext({});

function UserDetailContextProvider(props: any) {
  const fetchedUserDetails: ICachedJWT | {} = useFetchUserDetail();
  return (
    <UserDetailsContext.Provider
      value={{
        userDetails: fetchedUserDetails,
      }}
    >
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export default UserDetailContextProvider;
