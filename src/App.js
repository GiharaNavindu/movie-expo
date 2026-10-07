import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Snackbar, Button, Alert } from '@mui/material';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider, useMovies } from './context/MovieContext';
import { Navbar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LoginPage } from './pages/LoginPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useOnlineStatus } from './hooks/useOnlineStatus';

const GlobalNotifications = () => {
  const { snackbar, undoSnackbar, closeSnackbar } = useMovies();
  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline && (
        <Alert
          severity="warning"
          sx={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            zIndex: 9999,
            borderRadius: 1.5,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          }}
        >
          You are currently offline. Check your network connection.
        </Alert>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={snackbar.message}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={undoSnackbar}
            sx={{ fontWeight: 700, textTransform: 'none' }}
          >
            Undo
          </Button>
        }
      />
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <AuthProvider>
          <MovieProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
              <GlobalNotifications />
            </BrowserRouter>
          </MovieProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;
