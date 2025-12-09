import {createContext} from 'react';

export interface IThemeContext {
  selectedTheme: string;
  setSelectedTheme: (themeId: string) => void;
}

/**
 * Context for managing application theme.
 */
export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
