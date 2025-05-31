import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  {
    title: 'Calendario',
    description: 'Vista mensual y gestión de eventos académicos',
    icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
    path: '/calendar',
    color: '#4CAF50'
  },
  {
    title: 'Eventos',
    description: 'Administración de eventos y actividades',
    icon: <EventNoteIcon sx={{ fontSize: 40 }} />,
    path: '/events',
    color: '#2196F3'
  },
  {
    title: 'Asignación de Instructores',
    description: 'Gestión de asignaciones y horarios',
    icon: <PeopleAltIcon sx={{ fontSize: 40 }} />,
    path: '/instructors-assignment',
    color: '#9C27B0'
  },
  {
    title: 'Reporte de Horas',
    description: 'Informes de horas por instructor',
    icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
    path: '/instructor-hours-report',
    color: '#FF9800'
  },
  {
    title: 'Reporte por Currículo',
    description: 'Análisis de horas por currículo y curso',
    icon: <BarChartIcon sx={{ fontSize: 40 }} />,
    path: '/instructor-hours-by-curriculum',
    color: '#E91E63'
  },
  {
    title: 'Administración',
    description: 'Carga de insumos y gestión de usuarios',
    icon: <SettingsIcon sx={{ fontSize: 40 }} />,
    path: '/admin',
    color: '#607d8b'
  }
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Bienvenido/a
      </Typography>
      <Typography color="text.secondary" mb={6}>
        Selecciona una opción para comenzar a trabajar
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
              elevation={1}
              onClick={() => navigate(item.path)}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  color: item.color,
                  bgcolor: `${item.color}15`,
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="h6" fontWeight={600} mb={1}>
                {item.title}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
