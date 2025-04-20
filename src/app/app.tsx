import styled from '@emotion/styled';
import './styles.css';

import { Navbar } from '@karlo/modules/shared/ui';
import { AppRoutes } from './routing/routes';

import { ThemeProvider } from '@karlo/modules/shared/hooks';

import { Container, CssBaseline } from '@mui/material';

import { useEffect } from 'react';

export function App() {
  const fetchRefreshToken = async () => { 
    fetch('api/v1/users/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) {
        console.error('Failed to refresh token');
      }
    }).catch(err => {
      console.error('Refresh token error:', err);
    });
  }
  fetchRefreshToken()
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRefreshToken()
    }, 14 * 60 * 1000);
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
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
