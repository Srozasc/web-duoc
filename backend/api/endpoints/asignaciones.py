# Endpoints de asignaciones

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db import crud, schemas, models
from db.database import get_db

router = APIRouter()

@router.post("/asignaciones/", response_model=schemas.Asignacion)
def create_asignacion(asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)):
    # Verificar que existen el evento y el docente
    evento = db.query(models.Evento).filter(models.Evento.id == asignacion.evento_id).first()
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    docente = db.query(models.Docente).filter(models.Docente.id == asignacion.docente_id).first()
    if not docente:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    
    return db.execute(
        models.Asignacion.__table__.insert().values(**asignacion.dict())
    ).scalar()

@router.get("/asignaciones/", response_model=List[schemas.Asignacion])
def read_asignaciones(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    asignaciones = db.query(models.Asignacion).offset(skip).limit(limit).all()
    return asignaciones

@router.get("/asignaciones/{asignacion_id}", response_model=schemas.Asignacion)
def read_asignacion(asignacion_id: int, db: Session = Depends(get_db)):
    asignacion = db.query(models.Asignacion).filter(models.Asignacion.id == asignacion_id).first()
    if asignacion is None:
        raise HTTPException(status_code=404, detail="Asignación no encontrada")
    return asignacion

@router.get("/eventos/{evento_id}/asignaciones/", response_model=List[schemas.Asignacion])
def read_asignaciones_by_evento(evento_id: int, db: Session = Depends(get_db)):
    asignaciones = db.query(models.Asignacion).filter(models.Asignacion.evento_id == evento_id).all()
    return asignaciones

@router.get("/docentes/{docente_id}/asignaciones/", response_model=List[schemas.Asignacion])
def read_asignaciones_by_docente(docente_id: int, db: Session = Depends(get_db)):
    asignaciones = db.query(models.Asignacion).filter(models.Asignacion.docente_id == docente_id).all()
    return asignaciones

@router.put("/asignaciones/{asignacion_id}", response_model=schemas.Asignacion)
def update_asignacion(asignacion_id: int, asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)):
    db_asignacion = db.query(models.Asignacion).filter(models.Asignacion.id == asignacion_id).first()
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignación no encontrada")
    
    # Verificar que existen el evento y el docente
    evento = db.query(models.Evento).filter(models.Evento.id == asignacion.evento_id).first()
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    docente = db.query(models.Docente).filter(models.Docente.id == asignacion.docente_id).first()
    if not docente:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    
    for key, value in asignacion.dict().items():
        setattr(db_asignacion, key, value)
    
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

@router.delete("/asignaciones/{asignacion_id}")
def delete_asignacion(asignacion_id: int, db: Session = Depends(get_db)):
    db_asignacion = db.query(models.Asignacion).filter(models.Asignacion.id == asignacion_id).first()
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignación no encontrada")
    
    db.delete(db_asignacion)
    db.commit()
    return {"ok": True}
