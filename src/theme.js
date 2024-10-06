// theme.js
import { createTheme } from '@mui/material/styles';
import { lightBlue, deepOrange } from '@mui/material/colors';

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: lightBlue[200],
    },
    secondary: {
      main: deepOrange[200],
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

