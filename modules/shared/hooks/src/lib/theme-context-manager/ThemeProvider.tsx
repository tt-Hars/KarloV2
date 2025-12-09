// ThemeProvider.tsx
import React, { ReactNode, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext, IThemeContext } from './themeContext';

import {themeOptions} from '@karlo/modules-shared-constants';

import { useInterval } from 'usehooks-ts';

interface IThemeProvider {
  children: ReactNode
}

/**
 * ThemeProvider component that wraps the application with Material UI ThemeProvider and a custom ThemeContext.
 * It also cycles through themes (demo feature).
 *
 * @param {IThemeProvider} props - The props for the provider.
 * @returns {JSX.Element} The theme provider component.
 */
export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0].id);
  const [count, setCount] = useState(0);

  const currentTheme = themeOptions.find((theme: any) => theme.id === selectedTheme)?.theme || themeOptions[0].theme;


  useInterval(() => {
    count < themeOptions.length - 1 ? setCount(count + 1) : setCount(0);
  }, 2000);

  const value: IThemeContext = { selectedTheme, setSelectedTheme };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
