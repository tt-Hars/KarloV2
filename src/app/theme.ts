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
  '#f5f5f5',
  '#ffffff',
  '#333333',
  '#757575'
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
  '#333333',
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

export {
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
};

// // styles/theme.ts
// import { createTheme } from '@mui/material/styles';

// // Common colors
// const commonColors = {
//   primary: { main: '#1976d2' },
//   secondary: { main: '#f50057' },
// };

// // Light mode palette
// const lightPalette = {
//   ...commonColors,
//   background: {
//     default: '#f5f5f5', // Light gray
//     paper: '#ffffff', // White
//   },
//   text: {
//     primary: '#333333', // Dark gray
//     secondary: '#757575', // Medium gray
//   },
// };

// // Dark mode palette
// const darkPalette = {
//   ...commonColors,
//   background: {
//     default: '#121212', // Very dark gray
//     paper: '#1f1f1f', // Dark gray
//   },
//   text: {
//     primary: '#ffffff', // White
//     secondary: '#b0b0b0', // Light gray
//   },
// };

// const blueberryPalette = {
//   ...commonColors,
//   background: {
//     default: '#f5f8fd', // Pale blue
//     paper: '#ffffff', // White
//   },
//   text: {
//     primary: '#333333', // Dark gray
//     secondary: '#6a7a8d', // Medium blue-gray
//   },
// };

// const mintPalette = {
//   ...commonColors,
//   background: {
//     default: '#f1f9f3', // Light mint
//     paper: '#ffffff', // White
//   },
//   text: {
//     primary: '#333333', // Dark gray
//     secondary: '#5b8c6e', // Darker mint
//   },
// };

// const sunsetPalette = {
//   ...commonColors,
//   background: {
//     default: '#fdf0e4', // Light peach
//     paper: '#ffffff', // White
//   },
//   text: {
//     primary: '#333333', // Dark gray
//     secondary: '#a47c63', // Medium brown
//   },
// };

// const oceanPalette = {
//   ...commonColors,
//   background: {
//     default: '#e6f3f8', // Light aqua
//     paper: '#ffffff', // White
//   },
//   text: {
//     primary: '#333333', // Dark gray
//     secondary: '#5e98b2', // Medium blue
//   },
// };

// const lavenderPalette = {
//   ...commonColors,
//   background: {
//     default: '#f3efff', // Light lavender
//     paper: '#ffffff', // White
//   },
//   text: {
//     primary: '#333333', // Dark gray
//     secondary: '#937bc6', // Medium lavender
//   },
// };

// // Create themes for light and dark modes
// const lightTheme = createTheme({
//   palette: lightPalette,
//   // other theme options...
// });

// const darkTheme = createTheme({
//   palette: darkPalette,
//   // other theme options...
// });

// const lavenderTheme = createTheme({
//   palette: lavenderPalette,
//   // other theme options...
// });

// const oceanTheme = createTheme({
//   palette: oceanPalette,
//   // other theme options...
// });

// const sunsetTheme = createTheme({
//   palette: sunsetPalette,
//   // other theme options...
// });

// const mintTheme = createTheme({
//   palette: mintPalette,
//   // other theme options...
// });

// const blueberryTheme = createTheme({
//   palette: blueberryPalette,
//   // other theme options...
// });

// export {
//   lightTheme,
//   darkTheme,
//   lavenderTheme,
//   oceanTheme,
//   sunsetTheme,
//   mintTheme,
//   blueberryTheme,
// };
