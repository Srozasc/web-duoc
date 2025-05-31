import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const assignments = [
  {
    event: 'Matemáticas Avanzadas',
    date: '2024-03-15',
    time: '10:00 AM',
    instructor: 'Dra. Sofía Ramírez',
  },
  {
    event: 'Física Cuántica',
    date: '2024-03-16',
    time: '2:00 PM',
    instructor: 'Dr. Carlos Mendoza',
  },
  {
    event: 'Química Orgánica',
    date: '2024-03-17',
    time: '9:00 AM',
    instructor: 'Dra. Ana Torres',
  },
  {
    event: 'Biología Celular',
    date: '2024-03-18',
    time: '11:00 AM',
    instructor: 'Dr. Javier Castro',
  },
  {
    event: 'Ingeniería de Software',
    date: '2024-03-19',
    time: '3:00 PM',
    instructor: 'Ing. Elena Vargas',
  },
];

const InstructorsAssignmentPage = () => {
  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Asignación de Instructores a Eventos
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Evento</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hora</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Instructores</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.event}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Chip
                    label={row.instructor}
                    sx={{
                      bgcolor: '#f5f7fa',
                      color: '#222',
                      fontWeight: 500,
                      '&:hover': { bgcolor: '#e5e7f0' }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InstructorsAssignmentPage;