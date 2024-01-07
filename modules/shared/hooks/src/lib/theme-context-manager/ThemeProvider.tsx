// ThemeProvider.tsx
import React, { ReactNode, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext, IThemeContext } from './themeContext';

import {themeOptions} from '@myreactapp/modules/shared/data';

import { useInterval } from 'usehooks-ts';

interface IThemeProvider {
  children: ReactNode
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0].id);
  const [count, setCount] = useState(0);

  const currentTheme = themeOptions.find((theme: any) => theme.id === selectedTheme)?.theme || themeOptions[0].theme;

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };
  
  useInterval(() => {
    count < themeOptions.length - 1 ? setCount(count + 1) : setCount(0);
    handleThemeChange(themeOptions[count].id);
  }, 2000);

  const value: IThemeContext = { selectedTheme, setSelectedTheme };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={createTheme(currentTheme)}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};