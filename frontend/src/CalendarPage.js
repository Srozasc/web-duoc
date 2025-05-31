import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Badge
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Configurar dayjs para usar español
dayjs.locale('es');

const WEEKDAY_NAMES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

const CalendarPage = () => {
  const [date, setDate] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Reunión de Proyecto',
      description: 'Revisión de avances del proyecto semestral',
      date: '2025-05-30',
      startTime: '10:00',
      endTime: '11:00'
    },
    {
      id: 2,
      title: 'Clase de Matemáticas',
      description: 'Cálculo diferencial - Aula 201',
      date: '2025-05-30',
      startTime: '14:00',
      endTime: '15:30'
    }
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setSelectedEvent(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id 
          ? { ...eventData, id: selectedEvent.id }
          : e
      ));
    } else {
      const newEvent = {
        ...eventData,
        id: Math.max(...events.map(e => e.id), 0) + 1,
        date: date.format('YYYY-MM-DD')
      };
      setEvents([...events, newEvent]);
    }
    handleCloseDialog();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const shouldHighlightDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    return events.some(event => event.date === dateStr);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      p: 4, 
      bgcolor: '#f5f5f5' 
    }}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: 1200, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography variant="h4" fontWeight={700}>
          Calendario
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            bgcolor: '#0096FF',
            '&:hover': { bgcolor: '#0077cc' },
            textTransform: 'none',
            px: 3,
            py: 1
          }}
        >
          Nuevo Evento
        </Button>
      </Box>

      <Box sx={{ 
        width: '100%',
        maxWidth: 1200,
        display: 'flex',
        gap: 4,
        alignItems: 'flex-start'
      }}>
        {/* Calendario */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: 3, flex: '0 0 auto' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <StaticDatePicker
              value={date}
              onChange={handleDateChange}
              slotProps={{
                day: {
                  children: (props) => {
                    const shouldHighlight = shouldHighlightDate(props.day);
                    return (
                      <Badge
                        key={props.day.toString()}
                        overlap="circular"
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            bgcolor: '#0096FF',
                            bottom: 5,
                            height: 4,
                            width: 4,
                            minWidth: 4
                          }
                        }}
                        invisible={!shouldHighlight}
                      >
                        {props.children}
                      </Badge>
                    );
                  }
                }
              }}
              dayOfWeekFormatter={(day) => WEEKDAY_NAMES[day]}
              sx={{ minWidth: 340, minHeight: 400 }}
            />
          </LocalizationProvider>
        </Box>

        {/* Lista de Eventos */}
        <Box sx={{ flex: 1, bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={3}>
            Eventos para {date.format('DD/MM/YYYY')}
          </Typography>
          {events
            .filter(event => event.date === date.format('YYYY-MM-DD'))
            .map((event) => (
              <Box 
                key={event.id} 
                sx={{ 
                  mb: 2, 
                  p: 2.5, 
                  bgcolor: '#f8f9fa',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  '&:hover': {
                    bgcolor: '#f0f2f5',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <Box>
                  <Typography fontWeight={600} fontSize={16}>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary" fontSize={14} mt={0.5}>
                    {event.startTime} - {event.endTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {event.description}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => handleEditEvent(event)}
                    sx={{ color: '#666' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={() => handleDeleteEvent(event.id)}
                    sx={{ color: '#666' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          {events.filter(event => event.date === date.format('YYYY-MM-DD')).length === 0 && (
            <Typography color="text.secondary" align="center">
              No hay eventos programados para este día
            </Typography>
          )}
        </Box>
      </Box>

      {/* Diálogo para crear/editar eventos */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            {selectedEvent ? 'Editar Evento' : 'Nuevo Evento'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EventForm 
            event={selectedEvent}
            onSubmit={handleSaveEvent}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    startTime: event ? dayjs(event.date + 'T' + event.startTime) : dayjs(),
    endTime: event ? dayjs(event.date + 'T' + event.endTime) : dayjs().add(1, 'hour')
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      startTime: formData.startTime.format('HH:mm'),
      endTime: formData.endTime.format('HH:mm')
    });
  };

  return (
    <Box sx={{ pt: 2 }}>
      <TextField
        autoFocus
        label="Título del evento"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descripción"
        fullWidth
        multiline
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        sx={{ mb: 2 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TimePicker
            label="Hora de inicio"
            value={formData.startTime}
            onChange={(newValue) => setFormData({ ...formData, startTime: newValue })}
            slotProps={{ textField: { fullWidth: true } }}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label="Hora de fin"
            value={formData.endTime}
            onChange={(newValue) => setFormData({ ...formData, endTime: newValue })}
            slotProps={{ textField: { fullWidth: true } }}
            sx={{ flex: 1 }}
          />
        </Box>
      </LocalizationProvider>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel} sx={{ color: '#666' }}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            bgcolor: '#0096FF',
            '&:hover': { bgcolor: '#0077cc' }
          }}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default CalendarPage;
