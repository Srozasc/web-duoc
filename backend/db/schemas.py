from pydantic import BaseModel
from datetime import date, time
from typing import Optional, List

# Usuario schemas
class UsuarioBase(BaseModel):
    nombre: str
    email: str
    rol: str
    activo: bool = True

class UsuarioCreate(UsuarioBase):
    password: str

class Usuario(UsuarioBase):
    id: int

    class Config:
        from_attributes = True

# Docente schemas
class DocenteBase(BaseModel):
    nombre: str
    rut: str
    email: str
    estado: str

class DocenteCreate(DocenteBase):
    pass

class Docente(DocenteBase):
    id: int

    class Config:
        from_attributes = True

# Plan de Estudio schemas
class PlanEstudioBase(BaseModel):
    nombre: str
    codigo: str
    fecha_inicio: date
    fecha_fin: date
    estado: str

class PlanEstudioCreate(PlanEstudioBase):
    pass

class PlanEstudio(PlanEstudioBase):
    id: int

    class Config:
        from_attributes = True

# Asignatura schemas
class AsignaturaBase(BaseModel):
    nombre: str
    codigo: str
    nivel: int
    plan_estudios_id: int

class AsignaturaCreate(AsignaturaBase):
    pass

class Asignatura(AsignaturaBase):
    id: int

    class Config:
        from_attributes = True

# Evento schemas
class EventoBase(BaseModel):
    nombre: str
    fecha: date
    hora_inicio: time
    hora_fin: time
    asignatura_id: int
    plan_estudios_id: int
    vacantes: int
    nivel: int

class EventoCreate(EventoBase):
    pass

class Evento(EventoBase):
    id: int

    class Config:
        from_attributes = True

# Asignación schemas
class AsignacionBase(BaseModel):
    evento_id: int
    docente_id: int
    horas_asignadas: int

class AsignacionCreate(AsignacionBase):
    pass

class Asignacion(AsignacionBase):
    id: int

    class Config:
        from_attributes = True

# Archivo Insumo schemas
class ArchivoInsumoBase(BaseModel):
    tipo: str
    nombre_archivo: str
    fecha_carga: date
    usuario_id: int

class ArchivoInsumoCreate(ArchivoInsumoBase):
    pass

class ArchivoInsumo(ArchivoInsumoBase):
    id: int

    class Config:
        from_attributes = True
