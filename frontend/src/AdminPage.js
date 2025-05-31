import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const tabLabels = [
  'Estructura Académica',
  'Nómina de Docentes',
  'Cursables',
  'Usuarios'
];

const AdminPage = () => {
  const [tab, setTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Simulación de datos cargados
  const [data, setData] = useState({
    'Estructura Académica': [],
    'Nómina de Docentes': [],
    'Cursables': [],
    'Usuarios': [
      { nombre: 'admin@duoc.cl', rol: 'Administrador' },
      { nombre: 'director@duoc.cl', rol: 'Director' }
    ]
  });

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setSelectedFile(null);
    setFileName('');
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleUpload = () => {
    // Aquí iría la lógica real de carga al backend
    setSnackbar({ open: true, message: 'Archivo cargado exitosamente', severity: 'success' });
    setSelectedFile(null);
    setFileName('');
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Renderizado de tabla de ejemplo
  const renderTable = () => {
    if (tabLabels[tab] === 'Usuarios') {
      return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data['Usuarios'].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.rol}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    // Para las otras pestañas, solo muestra un mensaje de ejemplo
    return (
      <Paper sx={{ mt: 3, p: 3, textAlign: 'center', color: '#888' }}>
        No hay datos cargados aún.
      </Paper>
    );
  };

  return (
    <Box sx={{ p: 6, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Administración
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Carga y gestión de insumos del sistema. Solo usuarios administradores pueden acceder a esta sección.
      </Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        {tabLabels.map((label, idx) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      {/* Carga de archivos para las primeras 3 pestañas */}
      {tab < 3 && (
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ bgcolor: '#0094ff', '&:hover': { bgcolor: '#0077cc' } }}
          >
            Seleccionar archivo Excel
            <input type="file" accept=".xlsx,.xls" hidden onChange={handleFileChange} />
          </Button>
          <Typography sx={{ flex: 1 }}>
            {fileName || 'Ningún archivo seleccionado'}
          </Typography>
          <Button
            variant="contained"
            color="success"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Cargar
          </Button>
        </Paper>
      )}
      {/* Tabla o mensaje de datos */}
      {renderTable()}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
