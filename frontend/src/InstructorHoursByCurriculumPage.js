import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const InstructorHoursByCurriculumPage = () => {
  const [curriculum, setCurriculum] = useState('');
  const [course, setCourse] = useState('');
  const [instructor, setInstructor] = useState('');
  const [period, setPeriod] = useState('');

  const handleGenerateReport = () => {
    // Aquí irá la lógica para generar el reporte Excel
    console.log('Generating report with filters:', { curriculum, course, instructor, period });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Reporte de Horas de Instructor por Currículo y Curso
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Exporta un reporte detallado en formato Excel con las horas de instructor asignadas por currículo y curso,
        incluyendo totales y distribución mensual. El reporte incluye los colores corporativos de la institución:
        amarillo, negro y celeste.
      </Typography>

      {/* Generate Report Button */}
      <Button
        variant="contained"
        startIcon={<FileDownloadIcon />}
        onClick={handleGenerateReport}
        sx={{
          mb: 4,
          bgcolor: '#0094ff',
          '&:hover': { bgcolor: '#0077cc' },
        }}
      >
        Generar Reporte
      </Button>

      {/* Filters */}
      <Typography variant="h6" fontWeight={600} mb={3}>
        Filtros
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, maxWidth: 800 }}>
        <FormControl fullWidth>
          <InputLabel>Currículo</InputLabel>
          <Select value={curriculum} onChange={(e) => setCurriculum(e.target.value)} label="Currículo">
            <MenuItem value="curriculum1">Currículo 1</MenuItem>
            <MenuItem value="curriculum2">Currículo 2</MenuItem>
            <MenuItem value="curriculum3">Currículo 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Curso</InputLabel>
          <Select value={course} onChange={(e) => setCourse(e.target.value)} label="Curso">
            <MenuItem value="course1">Curso 1</MenuItem>
            <MenuItem value="course2">Curso 2</MenuItem>
            <MenuItem value="course3">Curso 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Instructor</InputLabel>
          <Select value={instructor} onChange={(e) => setInstructor(e.target.value)} label="Instructor">
            <MenuItem value="instructor1">Instructor 1</MenuItem>
            <MenuItem value="instructor2">Instructor 2</MenuItem>
            <MenuItem value="instructor3">Instructor 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Período</InputLabel>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)} label="Período">
            <MenuItem value="2024-1">2024-1</MenuItem>
            <MenuItem value="2024-2">2024-2</MenuItem>
            <MenuItem value="2025-1">2025-1</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default InstructorHoursByCurriculumPage;
