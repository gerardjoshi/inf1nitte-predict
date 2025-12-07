import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E10600',
      light: '#FF1E1E',
      dark: '#B30500',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D2D2D',
      light: '#404040',
      dark: '#1A1A1A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0D0D0D',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    error: {
      main: '#FF4444',
    },
    warning: {
      main: '#FFD700',
    },
    success: {
      main: '#00E676',
    },
    info: {
      main: '#29B6F6',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Rajdhani", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 800,
      letterSpacing: '0.05em',
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.04em',
    },
    h3: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.03em',
    },
    h4: {
      fontFamily: '"Exo 2", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Exo 2", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Exo 2", sans-serif',
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    subtitle2: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Exo 2", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 400,
    },
    overline: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.3)',
    '0 4px 8px rgba(0,0,0,0.3)',
    '0 6px 12px rgba(0,0,0,0.3)',
    '0 8px 16px rgba(0,0,0,0.4)',
    '0 10px 20px rgba(0,0,0,0.4)',
    '0 12px 24px rgba(0,0,0,0.4)',
    '0 14px 28px rgba(0,0,0,0.5)',
    '0 16px 32px rgba(0,0,0,0.5)',
    '0 18px 36px rgba(0,0,0,0.5)',
    '0 20px 40px rgba(0,0,0,0.5)',
    '0 22px 44px rgba(0,0,0,0.6)',
    '0 24px 48px rgba(0,0,0,0.6)',
    '0 26px 52px rgba(0,0,0,0.6)',
    '0 28px 56px rgba(0,0,0,0.6)',
    '0 30px 60px rgba(0,0,0,0.7)',
    '0 32px 64px rgba(0,0,0,0.7)',
    '0 34px 68px rgba(0,0,0,0.7)',
    '0 36px 72px rgba(0,0,0,0.7)',
    '0 38px 76px rgba(0,0,0,0.8)',
    '0 40px 80px rgba(0,0,0,0.8)',
    '0 42px 84px rgba(0,0,0,0.8)',
    '0 44px 88px rgba(0,0,0,0.8)',
    '0 46px 92px rgba(0,0,0,0.9)',
    '0 48px 96px rgba(0,0,0,0.9)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#E10600 #1A1A1A',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: '#1A1A1A',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            background: '#E10600',
            borderRadius: 4,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
          boxShadow: '0 4px 20px rgba(225, 6, 0, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF1E1E 0%, #E10600 100%)',
            boxShadow: '0 6px 30px rgba(225, 6, 0, 0.6)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: '#E10600',
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            borderColor: '#FF1E1E',
            background: 'rgba(225, 6, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, rgba(45, 45, 45, 0.9) 0%, rgba(26, 26, 26, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(225, 6, 0, 0.3)',
            boxShadow: '0 8px 32px rgba(225, 6, 0, 0.15)',
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
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Exo 2", sans-serif',
          fontWeight: 500,
        },
        filled: {
          background: 'rgba(225, 6, 0, 0.2)',
          border: '1px solid rgba(225, 6, 0, 0.3)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #E10600 0%, #FF1E1E 100%)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 8,
          fontSize: '0.875rem',
          fontFamily: '"Rajdhani", sans-serif',
        },
      },
    },
  },
});

export default theme;

