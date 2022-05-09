import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  spacing: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
  palette: {
    primary: { main: '#FB2F8A', },
    secondary: { main: '#5A6178' },
    dark: { main: '#03051B' },
    text: {
      primary: "#31373E",
      secondary: "#FB2F8A",
    }
  },

  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: `'Rajdhani', -apple-system, BlinkMacSystemFont,
		Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
		Helvetica Neue, sans-serif;`,
    body1: {
      fontSize: '1rem',
      fontWeight: `normal`,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '1.167rem',
      fontWeight: `normal`,
      lineHeight: 1.57
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.75
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.66
    },
    h1: {
      fontWeight: 'bolder',
      fontSize: '3.5rem',
      lineHeight: 1.375
    },
    h2: {
      fontWeight: 'bolder',
      fontSize: '3rem',
      lineHeight: 1.375
    },
    h3: {
      fontWeight: 'bolder',
      fontSize: '2.25rem',
      lineHeight: 1.375
    },
    h4: {
      fontWeight: 'bolder',
      fontSize: '2rem',
      lineHeight: 1.375
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375
    },

  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },

});

export default theme;