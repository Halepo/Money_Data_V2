import React, { createContext, useEffect, useState, Context } from 'react';
import { checkCachedJwtStatus } from '../../store/actionCreators';
//! get account theme options and display based on that

type TContext = {};
// type MyProps = { children: any };
export type TThemeContext = Context<{
  themeBackgroundColor?: string;
  setThemeBackgroundColor?: React.Dispatch<React.SetStateAction<string>>;
  displayThemeSelector?: string;
  setDisplayThemeSelector?: React.Dispatch<React.SetStateAction<string>>;
}>;

export const ThemeContext = createContext({});

export default function ThemeContextProvider(props: any) {
  useEffect(() => {
    checkCachedJwtStatus();
  }, []);

  const [themeBackgroundColor, setThemeBackgroundColor] = useState('#d3d3d3');
  const [displayThemeSelector, setDisplayThemeSelector] = useState('none');

  return (
    <ThemeContext.Provider
      value={{
        themeBackgroundColor,
        setThemeBackgroundColor,
        displayThemeSelector,
        setDisplayThemeSelector,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
