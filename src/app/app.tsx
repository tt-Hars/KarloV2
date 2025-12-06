import './styles.css';

import { Navbar } from '@karlo/modules/shared/ui';
import { AppRoutes } from './routing/routes';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@karlo/modules-shared-utils';

import { ThemeProvider } from '@karlo/modules-shared-hooks';

import { AuthProvider } from '@karlo/modules-shared-hooks';


import { Container, CssBaseline } from '@mui/material';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ThemeProvider>
      <Navbar />
      <CssBaseline>
        <Container maxWidth="xl">
          <AppRoutes />
        </Container>
      </CssBaseline>
    </ThemeProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
