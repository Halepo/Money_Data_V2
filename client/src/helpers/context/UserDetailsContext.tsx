import { createContext, useState } from 'react';

export const UserDetailsContext: any = createContext({});

const AuthProvider = (props: any) => {
  const [auth, setAuth] = useState({});

  const value = { auth, setAuth };
  return (
    <UserDetailsContext.Provider value={value}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default AuthProvider;
