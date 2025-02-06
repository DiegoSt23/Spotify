import { createTheme } from '@mui/material';

export const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#000000',
      secondary: '#767676',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    accent: {
      main: '#1cd763',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
      color: '#767676',
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      color: '#767676',
    },
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            borderColor: '#e2e2e2',
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e2e2',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 10,
          '& .MuiLinearProgress-bar': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: 12,
        },
      },
    },
  },
});
