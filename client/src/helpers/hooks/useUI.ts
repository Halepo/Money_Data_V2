import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

export default function useAuth(): any {
  const context = useContext(UIContext);
  return context;
}
