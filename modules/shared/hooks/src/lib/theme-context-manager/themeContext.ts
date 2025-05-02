import {createContext} from 'react';

export interface IThemeContext {
  selectedTheme: string;
  setSelectedTheme: (themeId: string) => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);