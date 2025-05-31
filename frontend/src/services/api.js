import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configuración del cliente axios
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

// Interceptor para añadir el token a las peticiones
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Restaurar el Content-Type por defecto para otras peticiones
        if (!config.url.includes('/token')) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    login: async (email, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await apiClient.post('/token', formData);
            
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
            }
            return response.data;
        } catch (error) {
            console.error('Login error details:', error.response?.data);
            if (error.response?.data?.detail) {
                throw new Error(error.response.data.detail);
            }
            throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};

// Docentes services
export const docentesService = {
    getAll: async () => {
        const response = await apiClient.get('/docentes/');
        return response.data;
    },
    getById: async (id) => {
        const response = await apiClient.get(`/docentes/${id}`);
        return response.data;
    },
    create: async (docente) => {
        const response = await apiClient.post('/docentes/', docente);
        return response.data;
    },
    update: async (id, docente) => {
        const response = await apiClient.put(`/docentes/${id}`, docente);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/docentes/${id}`);
        return response.data;
    }
};

// Eventos services
export const eventosService = {
    getAll: async () => {
        const response = await apiClient.get('/eventos/');
        return response.data;
    },
    getById: async (id) => {
        const response = await apiClient.get(`/eventos/${id}`);
        return response.data;
    },
    create: async (evento) => {
        const response = await apiClient.post('/eventos/', evento);
        return response.data;
    },
    update: async (id, evento) => {
        const response = await apiClient.put(`/eventos/${id}`, evento);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/eventos/${id}`);
        return response.data;
    }
};

// Asignaciones services
export const asignacionesService = {
    getAll: async () => {
        const response = await apiClient.get('/asignaciones/');
        return response.data;
    },
    getByEvento: async (eventoId) => {
        const response = await apiClient.get(`/eventos/${eventoId}/asignaciones/`);
        return response.data;
    },
    create: async (asignacion) => {
        const response = await apiClient.post('/asignaciones/', asignacion);
        return response.data;
    },
    update: async (id, asignacion) => {
        const response = await apiClient.put(`/asignaciones/${id}`, asignacion);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/asignaciones/${id}`);
        return response.data;
    }
};

// Reportes services
export const reportesService = {
    getHorasPorDocente: async (fechaInicio, fechaFin) => {
        const response = await apiClient.get('/reportes/horas-por-docente', {
            params: { fecha_inicio: fechaInicio, fecha_fin: fechaFin }
        });
        return response.data;
    },
    getHorasPorAsignatura: async (planEstudiosId, fechaInicio, fechaFin) => {
        const response = await apiClient.get('/reportes/horas-por-asignatura', {
            params: { plan_estudios_id: planEstudiosId, fecha_inicio: fechaInicio, fecha_fin: fechaFin }
        });
        return response.data;
    }
};
