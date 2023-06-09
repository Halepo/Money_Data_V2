import { useContext } from 'react';
import { UIContext, useUI } from '../context/UIContext';

export default function useUI(): useUI {
  const context: useUI = useContext(UIContext);
  return context;
}
