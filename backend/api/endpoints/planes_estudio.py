from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db import crud, schemas, models
from db.database import get_db

router = APIRouter()

@router.post("/planes-estudio/", response_model=schemas.PlanEstudio)
def create_plan_estudio(plan: schemas.PlanEstudioCreate, db: Session = Depends(get_db)):
    return db.execute(
        models.PlanEstudio.__table__.insert().values(**plan.dict())
    ).scalar()

@router.get("/planes-estudio/", response_model=List[schemas.PlanEstudio])
def read_planes_estudio(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    planes = db.query(models.PlanEstudio).offset(skip).limit(limit).all()
    return planes

@router.get("/planes-estudio/{plan_id}", response_model=schemas.PlanEstudio)
def read_plan_estudio(plan_id: int, db: Session = Depends(get_db)):
    plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == plan_id).first()
    if plan is None:
        raise HTTPException(status_code=404, detail="Plan de estudio no encontrado")
    return plan

@router.put("/planes-estudio/{plan_id}", response_model=schemas.PlanEstudio)
def update_plan_estudio(plan_id: int, plan: schemas.PlanEstudioCreate, db: Session = Depends(get_db)):
    db_plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == plan_id).first()
    if db_plan is None:
        raise HTTPException(status_code=404, detail="Plan de estudio no encontrado")
    
    for key, value in plan.dict().items():
        setattr(db_plan, key, value)
    
    db.commit()
    db.refresh(db_plan)
    return db_plan

@router.delete("/planes-estudio/{plan_id}")
def delete_plan_estudio(plan_id: int, db: Session = Depends(get_db)):
    db_plan = db.query(models.PlanEstudio).filter(models.PlanEstudio.id == plan_id).first()
    if db_plan is None:
        raise HTTPException(status_code=404, detail="Plan de estudio no encontrado")
    
    db.delete(db_plan)
    db.commit()
    return {"ok": True}
