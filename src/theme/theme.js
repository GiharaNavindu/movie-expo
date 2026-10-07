import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#e50914', 
            },
            secondary: {
              main: '#00df9a',
            },
            background: {
              default: '#0f172a', 
              paper: '#1e293b',
            },
            text: {
              primary: '#f8fafc',
              secondary: '#94a3b8',
            },
          }
        : {
            primary: {
              main: '#e50914',
            },
            secondary: {
              main: '#0284c7',
            },
            background: {
              default: '#f8fafc',
              paper: '#ffffff',
            },
            text: {
              primary: '#0f172a',
              secondary: '#64748b',
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
    },
  });