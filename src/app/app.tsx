import styled from '@emotion/styled';
import './styles.css';

import { Navbar } from '@karlo/modules/shared/ui';
import { AppRoutes } from './routing/routes';

import { ThemeProvider } from '@karlo/modules/shared/hooks';
import { Container, CssBaseline } from '@mui/material';

export function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <CssBaseline>
        <Container maxWidth="xl">
          <AppRoutes />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
