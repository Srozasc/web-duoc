import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';

const instructors = [
  'Dra. Sofía Ramírez',
  'Dr. Carlos Mendoza',
  'Dra. Ana Torres',
  'Dr. Javier Castro',
  'Ing. Elena Vargas',
];

const events = [
  'Matemáticas Avanzadas',
  'Física Cuántica',
  'Química Orgánica',
  'Biología Celular',
  'Ingeniería de Software',
];

const curriculos = [
  'Ciencias de la Computación',
  'Matemáticas',
  'Física',
  'Química',
  'Biología',
];

const handleGenerateReport = () => {
  // Aquí iría la lógica para generar el PDF o Excel
  console.log('Generando reporte...');
};

const InstructorHoursReportPage = () => {
  const [instructor, setInstructor] = useState('');
  const [event, setEvent] = useState('');
  const [curriculo, setCurriculo] = useState('');

  return (
    <Box sx={{ p: 6, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Reporte de Horas de Instructor
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Genera un reporte detallado en PDF de las horas asignadas a cada instructor, incluyendo información sobre el evento y el currículo.
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e5e7eb',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
          }}
          renderValue={(value) => value || "Seleccionar Instructor"}
        >
          {instructors.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e5e7eb',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
          }}
          renderValue={(value) => value || "Seleccionar Evento"}
        >
          {events.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <Select
          value={curriculo}
          onChange={(e) => setCurriculo(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e5e7eb',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
          }}
          renderValue={(value) => value || "Seleccionar Currículo"}
        >
          {curriculos.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        onClick={handleGenerateReport}
        sx={{
          bgcolor: '#0094ff',
          color: '#fff',
          py: 1.5,
          fontWeight: 600,
          '&:hover': {
            bgcolor: '#0077cc',
          },
        }}
      >
        Generar Reporte PDF
      </Button>
    </Box>
  );
};

export default InstructorHoursReportPage;
