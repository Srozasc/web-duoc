import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const PageTitle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  const handleClick = () => {
    if (!isLoginPage) {
      navigate('/dashboard');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        cursor: isLoginPage ? 'default' : 'pointer'
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          bgcolor: '#000',
          borderRadius: '4px',
          mr: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span role="img" aria-label="folder" style={{ color: '#fff', fontSize: 18 }}>
          4c1
        </span>
      </Box>
      <Typography variant="h6" fontWeight={700} color="#222">
        Planificación Académica
      </Typography>
    </Box>
  );
};

export default PageTitle;
