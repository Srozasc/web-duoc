import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from './contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.detail || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      {/* Navbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          py: 2,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700} color="#222">
            Planificación Académica
          </Typography>
        </Box>
      </Box>

      {/* Login Form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={4} mt={2}>
          Inicia sesión en tu cuenta
        </Typography>
        <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8f9fa', width: '100%', maxWidth: 400, borderRadius: 2 }}>
          <Box component="form" noValidate onSubmit={handleLogin}>
            <Typography fontWeight={600} mb={1}>
              Correo electrónico
            </Typography>
            <TextField
              fullWidth
              placeholder="ejemplo@universidad.edu"
              variant="outlined"
              sx={{ mb: 3, bgcolor: '#fff' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Typography fontWeight={600} mb={1}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              placeholder="Ingresa tu contraseña"
              variant="outlined"
              sx={{ mb: 1, bgcolor: '#fff' }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link href="#" underline="hover" fontSize={14} color="#6b7280">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ 
                bgcolor: '#0094ff', 
                borderRadius: 2, 
                fontWeight: 600, 
                fontSize: 16, 
                py: 1.5,
                mb: 2,
                '&:hover': {
                  bgcolor: '#0077cc'
                },
                '&:disabled': {
                  bgcolor: '#0094ff80',
                  color: 'white'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
