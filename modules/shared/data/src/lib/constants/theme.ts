// styles/theme.ts
// styles/themeUtils.ts
import { PaletteOptions, createTheme } from '@mui/material/styles';

// Generate a theme palette
const generatePalette = (
  primary: string,
  secondary: string,
  backgroundDefault: string,
  backgroundPaper: string,
  textPrimary: string,
  textSecondary: string
) => ({
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  background: {
    default: backgroundDefault,
    paper: backgroundPaper,
  },
  text: {
    primary: textPrimary,
    secondary: textSecondary,
  },
  // Add other palette colors as needed...
});

const generateTheme = (palette: PaletteOptions) => createTheme({ palette });

export { generatePalette, generateTheme };

const lightPalette = generatePalette(
  '#1976d2',
  '#f50057',
  '#f9f9fb',
  '#ffffff',
  '#333333',
  '#5a5a5a'
);

const darkPalette = generatePalette(
  '#1976d2',
  '#f50057',
  '#121212',
  '#1f1f1f',
  '#ffffff',
  '#b0b0b0'
);

const blueberryPalette = generatePalette(
  '#3f51b5',
  '#e91e63',
  '#f5f8fd',
  '#ffffff',
  '#1b1b1b',
  '#6a7a8d'
);
const mintPalette = generatePalette(
  '#4caf50',
  '#ff9800',
  '#f1f9f3',
  '#ffffff',
  '#333333',
  '#5b8c6e'
);
const sunsetPalette = generatePalette(
  '#f44336',
  '#9c27b0',
  '#fdf0e4',
  '#ffffff',
  '#333333',
  '#a47c63'
);
const oceanPalette = generatePalette(
  '#00bcd4',
  '#673ab7',
  '#e6f3f8',
  '#ffffff',
  '#333333',
  '#5e98b2'
);
const lavenderPalette = generatePalette(
  '#9c27b0',
  '#2196f3',
  '#f3efff',
  '#ffffff',
  '#333333',
  '#937bc6'
);
const nightSkyPalette = generatePalette(
  '#7e7e7e',
  '#ff9800',
  '#121212',
  '#1f1f1f',
  '#ffffff',
  '#b0b0b0'
);

const charcoalPalette = generatePalette(
  '#e91e63',
  '#4caf50',
  '#1c1c1c',
  '#2d2d2d',
  '#ffffff',
  '#b0b0b0'
);
const midnightPalette = generatePalette(
  '#9c27b0',
  '#00bcd4',
  '#121212',
  '#1f1f1f',
  '#ffffff',
  '#b0b0b0'
);
const deepOceanPalette = generatePalette(
  '#2962ff',
  '#ff1744',
  '#0a192f',
  '#121f33',
  '#ffffff',
  '#b0b0b0'
);
const forestNightPalette = generatePalette(
  '#00e676',
  '#ffd600',
  '#121212',
  '#1f1f1f',
  '#ffffff',
  '#b0b0b0'
);
const lightTheme = generateTheme(lightPalette);
const darkTheme = generateTheme(darkPalette);
const blueberryTheme = generateTheme(blueberryPalette);
const mintTheme = generateTheme(mintPalette);
const sunsetTheme = generateTheme(sunsetPalette);
const oceanTheme = generateTheme(oceanPalette);
const lavenderTheme = generateTheme(lavenderPalette);
const nightSkyTheme = generateTheme(nightSkyPalette);
const charcoalTheme = generateTheme(charcoalPalette);
const midnightTheme = generateTheme(midnightPalette);
const deepOceanTheme = generateTheme(deepOceanPalette);
const forestNightTheme = generateTheme(forestNightPalette);

export const themeOptions = [
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

// export themeOptions

// export {
//   lightTheme,
//   blueberryTheme,
//   mintTheme,
//   sunsetTheme,
//   oceanTheme,
//   lavenderTheme,
//   darkTheme,
//   nightSkyTheme,
//   charcoalTheme,
//   midnightTheme,
//   deepOceanTheme,
//   forestNightTheme,
// };