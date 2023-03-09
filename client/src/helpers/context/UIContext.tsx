import { createContext, useState } from 'react';

export const UIContext: any = createContext({});

const UIProvider = (props: any) => {
  //TODO save this in user profiles (settings)
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebarExpanded = () => {
    if (sidebarWidth == 240) {
      setSidebarWidth(88);
      setIsSidebarExpanded(false);
    } else {
      setSidebarWidth(240);
      setIsSidebarExpanded(true);
    }
  };

  const value = {
    sidebarWidth,
    isSidebarExpanded,
    toggleSidebarExpanded,
  };

  return (
    <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
  );
};

export default UIProvider;
