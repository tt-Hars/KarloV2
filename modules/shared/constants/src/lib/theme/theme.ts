import { PaletteMode } from '@mui/material';
import { Gc, Wc, Zc, Kc, Yc, Xc } from './palette';
import { createdTheme } from './util';

const themeGc = (mode: PaletteMode) => createdTheme(mode, Gc)

const themeWc = (mode: PaletteMode) => createdTheme(mode, Wc)

const themeZc = (mode: PaletteMode) => createdTheme(mode, Zc)

const themeKc = (mode: PaletteMode) => createdTheme(mode, Kc)

const themeYc = (mode: PaletteMode) => createdTheme(mode, Yc)

const themeXc = (mode: PaletteMode) => createdTheme(mode, Xc)

/**
 * Available theme options for the application.
 * Each option includes an id, label, and the MUI theme object.
 */
export const themeOptions = [
  { id: 'light', label: 'Light', theme: themeZc('light') },
  { id: 'mint', label: 'Mint', theme: themeKc('light') },
  { id: 'blueberry', label: 'Blueberry', theme: themeWc('light') },
  { id: 'sunset', label: 'Sunset', theme: themeXc('light') },
  { id: 'ocean', label: 'Ocean', theme: themeYc('light') },
  { id: 'lavender', label: 'Lavender', theme: themeZc('light') },

  { id: 'dark', label: 'Dark', theme: themeZc('dark') },
  { id: 'nightSky', label: 'Night Sky', theme: themeKc('dark') },
  { id: 'charcoal', label: 'Charcoal', theme: themeWc('dark') },
  { id: 'midnight', label: 'Midnight', theme: themeXc('dark') },
  { id: 'deepOcean', label: 'Deep Ocean', theme: themeYc('dark') },
  { id: 'forestNight', label: 'Forest Night', theme: themeGc('dark') },
];
