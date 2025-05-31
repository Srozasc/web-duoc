from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from db import crud, schemas, models
from db.database import get_db

router = APIRouter()

@router.post("/docentes/", response_model=schemas.Docente)
def create_docente(docente: schemas.DocenteCreate, db: Session = Depends(get_db)):
    return db.execute(
        models.Docente.__table__.insert().values(**docente.dict())
    ).scalar()

@router.get("/docentes/", response_model=List[schemas.Docente])
def read_docentes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    docentes = db.query(models.Docente).offset(skip).limit(limit).all()
    return docentes

@router.get("/docentes/{docente_id}", response_model=schemas.Docente)
def read_docente(docente_id: int, db: Session = Depends(get_db)):
    docente = db.query(models.Docente).filter(models.Docente.id == docente_id).first()
    if docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    return docente

@router.put("/docentes/{docente_id}", response_model=schemas.Docente)
def update_docente(docente_id: int, docente: schemas.DocenteCreate, db: Session = Depends(get_db)):
    db_docente = db.query(models.Docente).filter(models.Docente.id == docente_id).first()
    if db_docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    
    for key, value in docente.dict().items():
        setattr(db_docente, key, value)
    
    db.commit()
    db.refresh(db_docente)
    return db_docente

@router.delete("/docentes/{docente_id}")
def delete_docente(docente_id: int, db: Session = Depends(get_db)):
    db_docente = db.query(models.Docente).filter(models.Docente.id == docente_id).first()
    if db_docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    
    db.delete(db_docente)
    db.commit()
    return {"ok": True}
