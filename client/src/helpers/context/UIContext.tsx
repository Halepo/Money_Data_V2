import { createContext, useState } from 'react';

export const UIContext: any = createContext({});

const UIProvider = (props: any) => {
  //TODO save this in user profiles (settings)
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const value = {
    sidebarWidth,
    setSidebarWidth,
    sidebarExpanded,
    setSidebarExpanded,
  };
  return (
    <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
  );
};

export default UIProvider;
