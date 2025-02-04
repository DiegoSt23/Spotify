import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    background: {
      default: '#000',
      paper: '#080809',
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
      color: '#a0a0a0',
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      color: '#a0a0a0',
    },
  },
  components: {
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
            borderColor: '#292929',
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
          borderBottom: '1px solid #292929',
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
          borderRadius: 8,
          padding: 12,
        },
      },
    },
  },
});
