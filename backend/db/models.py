from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Time
from sqlalchemy.orm import relationship
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255))
    email = Column(String(255), unique=True)
    password_hash = Column(String(255))
    rol = Column(String(255))
    activo = Column(Boolean, default=True)

    archivos_insumo = relationship("ArchivoInsumo", back_populates="usuario")

class Docente(Base):
    __tablename__ = "docentes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255))
    rut = Column(String(255))
    email = Column(String(255))
    estado = Column(String(255))

    asignaciones = relationship("Asignacion", back_populates="docente")

class PlanEstudio(Base):
    __tablename__ = "planes_estudio"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255))
    codigo = Column(String(255))
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    estado = Column(String(255))

    asignaturas = relationship("Asignatura", back_populates="plan_estudio")
    eventos = relationship("Evento", back_populates="plan_estudio")

class Asignatura(Base):
    __tablename__ = "asignaturas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255))
    codigo = Column(String(255))
    nivel = Column(Integer)
    plan_estudios_id = Column(Integer, ForeignKey("planes_estudio.id"))

    plan_estudio = relationship("PlanEstudio", back_populates="asignaturas")
    eventos = relationship("Evento", back_populates="asignatura")

class Evento(Base):
    __tablename__ = "eventos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255))
    fecha = Column(Date)
    hora_inicio = Column(Time)
    hora_fin = Column(Time)
    asignatura_id = Column(Integer, ForeignKey("asignaturas.id"))
    plan_estudios_id = Column(Integer, ForeignKey("planes_estudio.id"))
    vacantes = Column(Integer)
    nivel = Column(Integer)

    asignatura = relationship("Asignatura", back_populates="eventos")
    plan_estudio = relationship("PlanEstudio", back_populates="eventos")
    asignaciones = relationship("Asignacion", back_populates="evento")

class Asignacion(Base):
    __tablename__ = "asignaciones"

    id = Column(Integer, primary_key=True, index=True)
    evento_id = Column(Integer, ForeignKey("eventos.id"))
    docente_id = Column(Integer, ForeignKey("docentes.id"))
    horas_asignadas = Column(Integer)

    evento = relationship("Evento", back_populates="asignaciones")
    docente = relationship("Docente", back_populates="asignaciones")

class ArchivoInsumo(Base):
    __tablename__ = "archivos_insumo"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(255))
    nombre_archivo = Column(String(255))
    fecha_carga = Column(Date)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))

    usuario = relationship("Usuario", back_populates="archivos_insumo")
