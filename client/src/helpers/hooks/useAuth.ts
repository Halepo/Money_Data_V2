import { useContext } from 'react';
import  {UserDetailsContext}  from '../../context/UserDetailsContext';

export default function useAuth(): any {
  const context = useContext(UserDetailsContext)
  return context;
}
