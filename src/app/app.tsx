import styled from '@emotion/styled';
import './styles.css';

import { Navbar } from '@karlo/modules/shared/ui';
import { AppRoutes } from './routing/routes';

import { createContext, useContext } from 'react';
import { ThemeProvider } from '@karlo/modules/shared/hooks';

const ThemeContext = createContext({});
export const useMyTheme = () => useContext(ThemeContext);

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ThemeProvider>
      <StyledApp>
        <Navbar />
        <AppRoutes />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
