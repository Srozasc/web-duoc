from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db import crud, schemas, models
from db.database import get_db

router = APIRouter()

# Endpoints de eventos

@router.post("/eventos/", response_model=schemas.Evento)
def create_evento(evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    # Verificar que existen la asignatura y el plan de estudios
    asignatura = db.query(models.Asignatura).filter(models.Asignatura.id == evento.asignatura_id).first()
    if not asignatura:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    
    plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == evento.plan_estudios_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan de estudios no encontrado")
    
    return db.execute(
        models.Evento.__table__.insert().values(**evento.dict())
    ).scalar()

@router.get("/eventos/", response_model=List[schemas.Evento])
def read_eventos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    eventos = db.query(models.Evento).offset(skip).limit(limit).all()
    return eventos

@router.get("/eventos/{evento_id}", response_model=schemas.Evento)
def read_evento(evento_id: int, db: Session = Depends(get_db)):
    evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    if evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return evento

@router.get("/asignaturas/{asignatura_id}/eventos/", response_model=List[schemas.Evento])
def read_eventos_by_asignatura(asignatura_id: int, db: Session = Depends(get_db)):
    eventos = db.query(models.Evento).filter(models.Evento.asignatura_id == asignatura_id).all()
    return eventos

@router.get("/planes-estudio/{plan_id}/eventos/", response_model=List[schemas.Evento])
def read_eventos_by_plan(plan_id: int, db: Session = Depends(get_db)):
    eventos = db.query(models.Evento).filter(models.Evento.plan_estudios_id == plan_id).all()
    return eventos

@router.put("/eventos/{evento_id}", response_model=schemas.Evento)
def update_evento(evento_id: int, evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    db_evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    # Verificar que existen la asignatura y el plan de estudios
    asignatura = db.query(models.Asignatura).filter(models.Asignatura.id == evento.asignatura_id).first()
    if not asignatura:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    
    plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == evento.plan_estudios_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan de estudios no encontrado")
    
    for key, value in evento.dict().items():
        setattr(db_evento, key, value)
    
    db.commit()
    db.refresh(db_evento)
    return db_evento

@router.delete("/eventos/{evento_id}")
def delete_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    db.delete(db_evento)
    db.commit()
    return {"ok": True}
