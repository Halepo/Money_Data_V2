import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

export default function useUI(): any {
  const context = useContext(UIContext);
  return context;
}
