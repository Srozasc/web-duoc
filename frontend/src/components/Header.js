import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  NotificationsNone as NotificationsNoneIcon,
  Key as KeyIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from './PageTitle';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const handleChangePassword = () => {
    handleClose();
    navigate('/change-password');
  };

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        py: 2,
        borderBottom: '1px solid #f0f0f0',
        bgcolor: '#fff'
      }}
    >
      <PageTitle />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ bgcolor: '#f5f7fa' }}>
          <NotificationsNoneIcon />
        </IconButton>
        
        <IconButton
          onClick={handleClick}
          sx={{ 
            p: 0.5,
            border: '2px solid #f0f0f0',
            '&:hover': { bgcolor: '#f5f7fa' }
          }}
        >
          <Avatar
            alt="Usuario"
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.08))',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 200,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Administrador
            </Typography>
            <Typography variant="body2" color="text.secondary">
              admin@duoc.cl
            </Typography>
          </Box>
          
          <Divider />

          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mi Perfil</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleChangePassword}>
            <ListItemIcon>
              <KeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cambiar Contraseña</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Configuración</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Cerrar Sesión</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
