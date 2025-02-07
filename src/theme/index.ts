import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#fff',
        },
        background: {
          default: '#000',
          paper: '#111112',
        },
        common: {
          black: '#000',
          white: '#fff',
        },
        accent: {
          main: '#1cd763',
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: '#000',
        },
        background: {
          default: '#eeeeee',
          paper: '#fff',
        },
        common: {
          black: '#000',
          white: '#fff',
        },
        accent: {
          main: '#1cd763',
        },
      },
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
    subtitle1: {
      fontWeight: 600,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      // variants: [
      //   {
      //     props: { variant: 'outlined' },
      //     style: {
      //       borderColor: '#3d3d3d',
      //     },
      //   },
      // ],
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
