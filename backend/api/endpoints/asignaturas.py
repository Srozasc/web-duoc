# Endpoints de asignaturas

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db import crud, schemas, models
from db.database import get_db

router = APIRouter()

@router.post("/asignaturas/", response_model=schemas.Asignatura)
def create_asignatura(asignatura: schemas.AsignaturaCreate, db: Session = Depends(get_db)):
    # Verificar que existe el plan de estudios
    plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == asignatura.plan_estudios_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan de estudios no encontrado")
    
    return db.execute(
        models.Asignatura.__table__.insert().values(**asignatura.dict())
    ).scalar()

@router.get("/asignaturas/", response_model=List[schemas.Asignatura])
def read_asignaturas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    asignaturas = db.query(models.Asignatura).offset(skip).limit(limit).all()
    return asignaturas

@router.get("/asignaturas/{asignatura_id}", response_model=schemas.Asignatura)
def read_asignatura(asignatura_id: int, db: Session = Depends(get_db)):
    asignatura = db.query(models.Asignatura).filter(models.Asignatura.id == asignatura_id).first()
    if asignatura is None:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    return asignatura

@router.get("/planes-estudio/{plan_id}/asignaturas/", response_model=List[schemas.Asignatura])
def read_asignaturas_by_plan(plan_id: int, db: Session = Depends(get_db)):
    asignaturas = db.query(models.Asignatura).filter(models.Asignatura.plan_estudios_id == plan_id).all()
    return asignaturas

@router.put("/asignaturas/{asignatura_id}", response_model=schemas.Asignatura)
def update_asignatura(asignatura_id: int, asignatura: schemas.AsignaturaCreate, db: Session = Depends(get_db)):
    db_asignatura = db.query(models.Asignatura).filter(models.Asignatura.id == asignatura_id).first()
    if db_asignatura is None:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    
    # Verificar que existe el plan de estudios
    plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == asignatura.plan_estudios_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan de estudios no encontrado")
    
    for key, value in asignatura.dict().items():
        setattr(db_asignatura, key, value)
    
    db.commit()
    db.refresh(db_asignatura)
    return db_asignatura

@router.delete("/asignaturas/{asignatura_id}")
def delete_asignatura(asignatura_id: int, db: Session = Depends(get_db)):
    db_asignatura = db.query(models.Asignatura).filter(models.Asignatura.id == asignatura_id).first()
    if db_asignatura is None:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    
    db.delete(db_asignatura)
    db.commit()
    return {"ok": True}
