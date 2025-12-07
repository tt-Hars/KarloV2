import { ThemeOptions, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import themeTypography from './typography';
import componentStyleOverrides from './componentOverrides'

declare module '@mui/material/styles' {
  interface Palette {
    orange: Palette['primary'];
    dark: Palette['primary'];
  }
  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
    dark?: PaletteOptions['primary'];
  }
  interface TypeText {
    dark: string;
  }
}

export const createdTheme = (e: PaletteMode, color: any) => {

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: {
      mode: e,
      common: {
        black: color.darkPaper,
      },
      primary: {
        light: e === 'dark' ? color.darkPrimaryLight : color.primaryLight,
        main: e === 'dark' ? color.darkPrimaryMain : color.primaryMain,
        dark: e === 'dark' ? color.darkPrimaryDark : color.primaryDark,
        200: e === 'dark' ? color.darkPrimary200 : color.primary200,
        800: e === 'dark' ? color.darkPrimary800 : color.primary800,
      },
      secondary: {
        light: e === 'dark' ? color.darkSecondaryLight : color.secondaryLight,
        main: e === 'dark' ? color.darkSecondaryMain : color.secondaryMain,
        dark: e === 'dark' ? color.darkSecondaryDark : color.secondaryDark,
        200: e === 'dark' ? color.darkSecondary200 : color.secondary200,
        800: e === 'dark' ? color.darkSecondary800 : color.secondary800,
      },
      error: {
        light: color.errorLight,
        main: color.errorMain,
        dark: color.errorDark,
      },
      orange: {
        light: color.orangeLight,
        main: color.orangeMain,
        dark: color.orangeDark,
      },
      warning: {
        light: color.warningLight,
        main: color.warningMain,
        dark: color.warningDark,
      },
      success: {
        light: color.successLight,
        200: color.success200,
        main: color.successMain,
        dark: color.successDark,
      },
      grey: {
        50: color.grey50,
        100: color.grey100,
        500: e === 'dark' ? color.darkTextSecondary : color.grey500,
        600: e === 'dark' ? color.darkTextTitle : color.grey600,
        700: e === 'dark' ? color.darkTextPrimary : color.grey700,
        900: e === 'dark' ? color.darkTextPrimary : color.grey900,
      },
      dark: {
        light: color.darkTextPrimary,
        main: color.darkLevel1,
        dark: color.darkLevel2,
        800: color.darkBackground,
        900: color.darkPaper,
      },
      text: {
        primary: e === 'dark' ? color.darkTextPrimary : color.grey700,
        secondary: e === 'dark' ? color.darkTextSecondary : color.grey500,
        dark: e === 'dark' ? color.darkTextPrimary : color.grey900,
        hint: color.grey100,
      },
      divider: e === 'dark' ? color.darkTextPrimary : color.grey200,
      background: {
        paper: e === 'dark' ? color.darkLevel2 : color.paper,
        default: e === 'dark' ? color.darkPaper : color.paper,
      },
    },
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  }

  const themes = createTheme(themeOptions as ThemeOptions);
  themes.components = componentStyleOverrides(themeOptions);

  return themes;
}
