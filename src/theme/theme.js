import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#e50914',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#94a3b8',
            },
            background: {
              default: '#0c0d12',
              paper: '#14161f',
            },
            divider: 'rgba(255, 255, 255, 0.08)',
            text: {
              primary: '#f1f5f9',
              secondary: '#94a3b8',
            },
            action: {
              hover: 'rgba(255, 255, 255, 0.04)',
            },
          }
        : {
            primary: {
              main: '#e50914',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#64748b',
            },
            background: {
              default: '#f1f5f9', // Soft modern slate gray background for depth
              paper: '#ffffff',   // Crisp white for cards, panels, and navbar
            },
            divider: 'rgba(0, 0, 0, 0.08)',
            text: {
              primary: '#0f172a', // Deep slate for high-contrast readability
              secondary: '#64748b',
            },
            action: {
              hover: 'rgba(0, 0, 0, 0.04)',
            },
          }),
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.015em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      subtitle1: {
        letterSpacing: '-0.01em',
      },
      body1: {
        letterSpacing: '-0.005em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: '1px solid',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: '1px solid',
            transition: 'border-color 0.2s ease, transform 0.2s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });