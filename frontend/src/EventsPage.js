import React from 'react';
import {
  Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Chip
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const upcomingEvents = [
  {
    name: 'Seminario de Investigación',
    date: '2024-07-15',
    time: '10:00 AM',
    instructor: 'Dr. Elena Ramirez',
    curriculum: 'Ciencias de la Computación',
    status: 'Programado',
  },
  {
    name: 'Taller de Escritura Académica',
    date: '2024-07-20',
    time: '2:00 PM',
    instructor: 'Prof. Carlos Mendoza',
    curriculum: 'Humanidades',
    status: 'Confirmado',
  },
  {
    name: 'Clase de Matemáticas Avanzadas',
    date: '2024-08-05',
    time: '9:00 AM',
    instructor: 'Dr. Sofía Vargas',
    curriculum: 'Matemáticas',
    status: 'Pendiente',
  },
];

const draftEvents = [
  {
    name: 'Reunión de Planificación de Curso',
    date: '2024-09-10',
    time: '11:00 AM',
    instructor: 'Por Asignar',
    curriculum: 'Administración de Empresas',
    status: 'Borrador',
  },
];

const statusColor = (status) => {
  switch (status) {
    case 'Programado': return 'default';
    case 'Confirmado': return 'success';
    case 'Pendiente': return 'warning';
    case 'Borrador': return 'info';
    default: return 'default';
  }
};

function EventsPage() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Left Sidebar */}
      <Box sx={{ width: 250, p: 3, borderRight: '1px solid #f0f0f0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <List>
            <ListItem button sx={{ mb: 1 }}>
              <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
              <ListItemText primary="Calendario" />
            </ListItem>
            <ListItem button sx={{ mb: 1, bgcolor: '#f5f7fa', borderRadius: 1 }}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Eventos" />
            </ListItem>
            <ListItem button sx={{ mb: 1 }}>
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <ListItemText primary="Instructores" />
            </ListItem>
            <ListItem button sx={{ mb: 1 }}>
              <ListItemIcon><MenuBookIcon /></ListItemIcon>
              <ListItemText primary="Currículo" />
            </ListItem>
            <ListItem button sx={{ mb: 1 }}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Button variant="contained" fullWidth sx={{ bgcolor: '#0094ff', borderRadius: 2, fontWeight: 600, mb: 2 }}>
            Nuevo Evento
          </Button>
          <Button startIcon={<HelpOutlineIcon />} sx={{ color: '#222', justifyContent: 'flex-start', pl: 1 }} fullWidth>
            Ayuda y Feedback
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          Eventos
        </Typography>
        <Box>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Próximos Eventos
          </Typography>
          <Paper variant="outlined">
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr 1.5fr 1fr', fontWeight: 600, color: '#222', mb: 1 }}>
                <span>Nombre del Evento</span>
                <span>Fecha</span>
                <span>Hora</span>
                <span>Instructor</span>
                <span>Currículo</span>
                <span>Estado</span>
              </Box>
              {upcomingEvents.map((e, i) => (
                <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr 1.5fr 1fr', alignItems: 'center', py: 1, borderTop: i !== 0 ? '1px solid #f0f0f0' : 'none', fontSize: 16 }}>
                  <span>{e.name}</span>
                  <span>{e.date}</span>
                  <span>{e.time}</span>
                  <span style={{ color: '#0094ff', cursor: 'pointer' }}>{e.instructor}</span>
                  <span>{e.curriculum}</span>
                  <Chip label={e.status} color={statusColor(e.status)} variant="outlined" size="small" sx={{ fontWeight: 600, bgcolor: '#f5f7fa' }} />
                </Box>
              ))}
            </Box>
          </Paper>
          <Typography variant="h6" fontWeight={700} mb={2} mt={4}>
            Eventos en Borrador
          </Typography>
          <Paper variant="outlined">
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr 1.5fr 1fr', fontWeight: 600, color: '#222', mb: 1 }}>
                <span>Nombre del Evento</span>
                <span>Fecha</span>
                <span>Hora</span>
                <span>Instructor</span>
                <span>Currículo</span>
                <span>Estado</span>
              </Box>
              {draftEvents.map((e, i) => (
                <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr 1.5fr 1fr', alignItems: 'center', py: 1, borderTop: i !== 0 ? '1px solid #f0f0f0' : 'none', fontSize: 16 }}>
                  <span>{e.name}</span>
                  <span>{e.date}</span>
                  <span>{e.time}</span>
                  <span style={{ color: '#0094ff', cursor: 'pointer' }}>{e.instructor}</span>
                  <span>{e.curriculum}</span>
                  <Chip label={e.status} color={statusColor(e.status)} variant="outlined" size="small" sx={{ fontWeight: 600, bgcolor: '#f5f7fa' }} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default EventsPage;
