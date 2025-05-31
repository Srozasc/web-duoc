# Endpoints de reportes

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from db import models
from db.database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/reportes/horas-por-docente")
def reporte_horas_por_docente(
    fecha_inicio: datetime = None,
    fecha_fin: datetime = None,
    db: Session = Depends(get_db)
):
    query = db.query(
        models.Docente.nombre,
        models.Docente.rut,
        func.sum(models.Asignacion.horas_asignadas).label('total_horas')
    ).join(models.Asignacion).join(models.Evento)
    
    if fecha_inicio:
        query = query.filter(models.Evento.fecha >= fecha_inicio)
    if fecha_fin:
        query = query.filter(models.Evento.fecha <= fecha_fin)
    
    resultados = query.group_by(models.Docente.id).all()
    
    return [
        {
            "nombre_docente": r.nombre,
            "rut": r.rut,
            "total_horas": float(r.total_horas or 0)
        }
        for r in resultados
    ]

@router.get("/reportes/horas-por-asignatura")
def reporte_horas_por_asignatura(
    plan_estudios_id: int = None,
    fecha_inicio: datetime = None,
    fecha_fin: datetime = None,
    db: Session = Depends(get_db)
):
    query = db.query(
        models.Asignatura.nombre,
        models.Asignatura.codigo,
        func.sum(models.Asignacion.horas_asignadas).label('total_horas')
    ).join(models.Evento).join(models.Asignacion)
    
    if plan_estudios_id:
        query = query.filter(models.Asignatura.plan_estudios_id == plan_estudios_id)
    if fecha_inicio:
        query = query.filter(models.Evento.fecha >= fecha_inicio)
    if fecha_fin:
        query = query.filter(models.Evento.fecha <= fecha_fin)
    
    resultados = query.group_by(models.Asignatura.id).all()
    
    return [
        {
            "nombre_asignatura": r.nombre,
            "codigo": r.codigo,
            "total_horas": float(r.total_horas or 0)
        }
        for r in resultados
    ]

@router.get("/reportes/eventos-por-periodo")
def reporte_eventos_por_periodo(
    fecha_inicio: datetime = None,
    fecha_fin: datetime = None,
    plan_estudios_id: int = None,
    db: Session = Depends(get_db)
):
    query = db.query(
        models.Evento.fecha,
        func.count(models.Evento.id).label('total_eventos'),
        func.sum(models.Evento.vacantes).label('total_vacantes')
    )
    
    if plan_estudios_id:
        query = query.filter(models.Evento.plan_estudios_id == plan_estudios_id)
    if fecha_inicio:
        query = query.filter(models.Evento.fecha >= fecha_inicio)
    if fecha_fin:
        query = query.filter(models.Evento.fecha <= fecha_fin)
    
    resultados = query.group_by(models.Evento.fecha).all()
    
    return [
        {
            "fecha": r.fecha,
            "total_eventos": r.total_eventos,
            "total_vacantes": int(r.total_vacantes or 0)
        }
        for r in resultados
    ]

@router.get("/reportes/docentes-por-plan-estudio")
def reporte_docentes_por_plan(
    plan_estudios_id: int,
    fecha_inicio: datetime = None,
    fecha_fin: datetime = None,
    db: Session = Depends(get_db)
):
    query = db.query(
        models.PlanEstudio.nombre.label('plan_estudio'),
        models.Docente.nombre.label('docente'),
        models.Asignatura.nombre.label('asignatura'),
        func.sum(models.Asignacion.horas_asignadas).label('horas')
    ).join(models.Evento, models.PlanEstudio.id == models.Evento.plan_estudios_id)\
     .join(models.Asignacion)\
     .join(models.Docente)\
     .join(models.Asignatura)
    
    query = query.filter(models.PlanEstudio.id == plan_estudios_id)
    
    if fecha_inicio:
        query = query.filter(models.Evento.fecha >= fecha_inicio)
    if fecha_fin:
        query = query.filter(models.Evento.fecha <= fecha_fin)
    
    resultados = query.group_by(
        models.PlanEstudio.id,
        models.Docente.id,
        models.Asignatura.id
    ).all()
    
    return [
        {
            "plan_estudio": r.plan_estudio,
            "docente": r.docente,
            "asignatura": r.asignatura,
            "horas": float(r.horas or 0)
        }
        for r in resultados
    ]
