import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Badge
} from '@mui/material';
import { LocalizationProvider, DateCalendar, TimePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import updateLocale from 'dayjs/plugin/updateLocale';

// Configurar dayjs para usar español
dayjs.extend(updateLocale);
dayjs.locale('es');
dayjs.updateLocale('es', { weekStart: 0 });

const CalendarPage = () => {
  const [date, setDate] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);  const [events, setEvents] = useState([
    { id: 1, title: 'Reunión de Proyecto', description: 'Revisión de avances del proyecto semestral', date: '2025-06-15', startTime: '10:00', endTime: '11:00' },
    { id: 2, title: 'Clase de Matemáticas', description: 'Cálculo diferencial - Aula 201', date: '2025-06-15', startTime: '14:00', endTime: '15:30' },
    { id: 3, title: 'Examen Final', description: 'Examen final de Programación Web', date: '2025-06-20', startTime: '09:00', endTime: '11:00' }
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = (newDate) => setDate(newDate);
  const handleOpenDialog = () => { setOpenDialog(true); setSelectedEvent(null); };
  const handleCloseDialog = () => { setOpenDialog(false); setSelectedEvent(null); };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? { ...eventData, id: selectedEvent.id } : e));
    } else {
      const newEvent = { ...eventData, id: Math.max(...events.map(e => e.id), 0) + 1, date: date.format('YYYY-MM-DD') };
      setEvents([...events, newEvent]);
    }
    handleCloseDialog();
  };

  const handleDeleteEvent = (id) => setEvents(events.filter(e => e.id !== id));
  const handleEditEvent = (e) => { setSelectedEvent(e); setOpenDialog(true); };
  const shouldHighlightDate = (d) => events.some(ev => dayjs(ev.date).isSame(d, 'day'));

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: '#f5f5f5' }}>
      <Box sx={{ width: '100%', maxWidth: 1200, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>Calendario</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ bgcolor: '#0096FF', '&:hover': { bgcolor: '#0077cc' }, textTransform: 'none', px: 3, py: 1 }}>Nuevo Evento</Button>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1200, display: 'flex', gap: 4, alignItems: 'flex-start' }}>        <Box sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: 3, flex: '0 0 auto' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">            <DateCalendar
              value={date}
              onChange={handleDateChange}              slots={{
                day: (dayProps) => {
                  const { day, outsideCurrentMonth, ...other } = dayProps;
                  const highlight = shouldHighlightDate(day);
                  
                  return (
                    <Badge 
                      overlap="circular" 
                      variant="dot" 
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          bgcolor: '#0096FF', 
                          right: 8, 
                          top: 8,
                          height: 6, 
                          width: 6, 
                          minWidth: 6,
                          borderRadius: '50%'
                        } 
                      }} 
                      invisible={!highlight || outsideCurrentMonth}
                    >
                      <PickersDay
                        {...other}
                        day={day}
                        outsideCurrentMonth={outsideCurrentMonth}
                        sx={{
                          ...(day.isSame(date, 'day') && {
                            backgroundColor: '#0096FF',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#0077cc',
                            },
                          }),
                        }}
                      />
                    </Badge>
                  );
                }
              }}
              sx={{ 
                minWidth: 340, 
                minHeight: 400,
                '& .MuiPickersCalendarHeader-root': {
                  paddingLeft: 1,
                  paddingRight: 1,
                  marginTop: 0,
                },
                '& .MuiDayCalendar-header': {
                  justifyContent: 'space-around',
                  '& .MuiTypography-root': {
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'text.secondary'
                  }
                },                '& .MuiDayCalendar-weekContainer': {
                  margin: 0,
                  justifyContent: 'space-around'
                },
              }}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ flex: 1, bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={3}>Eventos para {date.format('DD/MM/YYYY')}</Typography>
          {events.filter(ev => ev.date === date.format('YYYY-MM-DD')).map(ev => (
            <Box key={ev.id} sx={{ mb: 2, p: 2.5, bgcolor: '#f8f9fa', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', '&:hover': { bgcolor: '#f0f2f5', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' } }}>
              <Box>
                <Typography fontWeight={600} fontSize={16}>{ev.title}</Typography>
                <Typography color="text.secondary" fontSize={14} mt={0.5}>{ev.startTime} - {ev.endTime}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>{ev.description}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" onClick={() => handleEditEvent(ev)} sx={{ color: '#666' }}><EditIcon fontSize="small"/></IconButton>
                <IconButton size="small" onClick={() => handleDeleteEvent(ev.id)} sx={{ color: '#666' }}><DeleteIcon fontSize="small"/></IconButton>
              </Box>
            </Box>
          ))}
          {events.filter(ev => ev.date === date.format('YYYY-MM-DD')).length === 0 && (<Typography color="text.secondary" align="center">No hay eventos programados para este día</Typography>)}
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedEvent ? 'Editar Evento' : 'Nuevo Evento'}</DialogTitle>
        <DialogContent>
          <EventForm event={selectedEvent} onSubmit={handleSaveEvent} onCancel={handleCloseDialog}/>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ title: event?.title||'', description: event?.description||'', startTime: event ? dayjs(event.date+'T'+event.startTime) : dayjs(), endTime: event ? dayjs(event.date+'T'+event.endTime) : dayjs().add(1,'hour') });
  const handleSubmit = () => onSubmit({ ...formData, startTime: formData.startTime.format('HH:mm'), endTime: formData.endTime.format('HH:mm') });
  return (<Box sx={{ pt:2 }}>
    <TextField autoFocus label="Título del evento" fullWidth value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} sx={{mb:2}}/>
    <TextField label="Descripción" fullWidth multiline rows={3} value={formData.description} onChange={e=>setFormData({...formData,description:e.target.value})} sx={{mb:2}}/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{display:'flex',gap:2,mb:3}}>
        <TimePicker label="Hora de inicio" value={formData.startTime} onChange={newV=>setFormData({...formData,startTime:newV})} slotProps={{textField:{fullWidth:true}}} sx={{flex:1}}/>
        <TimePicker label="Hora de fin" value={formData.endTime} onChange={newV=>setFormData({...formData,endTime:newV})} slotProps={{textField:{fullWidth:true}}} sx={{flex:1}}/>
      </Box>
    </LocalizationProvider>
    <Box sx={{display:'flex',justifyContent:'flex-end',gap:2}}>
      <Button onClick={onCancel} sx={{color:'#666'}}>Cancelar</Button>
      <Button onClick={handleSubmit} variant="contained" sx={{bgcolor:'#0096FF','&:hover':{bgcolor:'#0077cc'}}}>Guardar</Button>
    </Box>
  </Box>);
};

export default CalendarPage;
