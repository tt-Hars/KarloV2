import styled from '@emotion/styled';
import './styles.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Navbar } from '@myreactapp/modules/shared/ui';
import { AppRoutes } from './routing/routes';

import { Button, Paper, ThemeProvider } from '@mui/material';
import {
  lightTheme,
  blueberryTheme,
  mintTheme,
  sunsetTheme,
  oceanTheme,
  lavenderTheme,
  darkTheme,
  nightSkyTheme,
  charcoalTheme,
  midnightTheme,
  deepOceanTheme,
  forestNightTheme,
} from './theme';
import { useEffect, useState } from 'react';
import { useInterval, useTimeout } from 'usehooks-ts';

const themeOptions = [
  { id: 'light', label: 'Light', theme: lightTheme },
  { id: 'mint', label: 'Mint', theme: mintTheme },
  { id: 'blueberry', label: 'Blueberry', theme: blueberryTheme },
  { id: 'sunset', label: 'Sunset', theme: sunsetTheme },
  { id: 'ocean', label: 'Ocean', theme: oceanTheme },
  { id: 'lavender', label: 'Lavender', theme: lavenderTheme },

  { id: 'dark', label: 'Dark', theme: darkTheme },
  { id: 'nightSky', label: 'Night Sky', theme: nightSkyTheme },
  { id: 'charcoal', label: 'Charcoal', theme: charcoalTheme },
  { id: 'midnight', label: 'Midnight', theme: midnightTheme },
  { id: 'deepOcean', label: 'Deep Ocean', theme: deepOceanTheme },
  { id: 'forestNight', label: 'Forest Night', theme: forestNightTheme },
];

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0].id);
  const [count, setCount] = useState(0);
  const currentTheme =
    themeOptions.find((theme) => theme.id === selectedTheme)?.theme ||
    lightTheme;
  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };
  useInterval(() => {
    count < themeOptions.length - 1 ? setCount(count + 1) : setCount(0);
    handleThemeChange(themeOptions[count].id);
  }, 20000);
  return (
    <ThemeProvider theme={currentTheme}>
      <StyledApp>
        <Navbar></Navbar>
        <Paper
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            top: '1rem',
            background: 'transparent',
            border: '0',
            outline: '0',
            boxShadow: 'none',
          }}
        >
          <Paper
            sx={{
              maxWidth: '200px',
              overflow: 'auto',
              display: 'flex',
              background: 'transparent',
              boxShadow: 'none'
            }}
          >
            {themeOptions.map((theme) => (
              <Button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
              >
                {theme.label}
              </Button>
            ))}
          </Paper>
        </Paper>
        <AppRoutes />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
