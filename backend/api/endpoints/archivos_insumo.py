# Endpoints de archivos insumo
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import date
from db import crud, schemas, models
from db.database import get_db

router = APIRouter()

# Configurar directorio para archivos
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/archivos-insumo/", response_model=schemas.ArchivoInsumo)
async def create_archivo_insumo(
    file: UploadFile = File(...),
    tipo: str = None,
    usuario_id: int = None,
    db: Session = Depends(get_db)
):
    # Verificar que existe el usuario
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Guardar archivo físicamente
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar archivo: {str(e)}")
    
    # Crear registro en base de datos
    archivo_insumo = schemas.ArchivoInsumoCreate(
        tipo=tipo,
        nombre_archivo=file.filename,
        fecha_carga=date.today(),
        usuario_id=usuario_id
    )
    
    return db.execute(
        models.ArchivoInsumo.__table__.insert().values(**archivo_insumo.dict())
    ).scalar()

@router.get("/archivos-insumo/", response_model=List[schemas.ArchivoInsumo])
def read_archivos_insumo(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    archivos = db.query(models.ArchivoInsumo).offset(skip).limit(limit).all()
    return archivos

@router.get("/archivos-insumo/{archivo_id}", response_model=schemas.ArchivoInsumo)
def read_archivo_insumo(archivo_id: int, db: Session = Depends(get_db)):
    archivo = db.query(models.ArchivoInsumo).filter(models.ArchivoInsumo.id == archivo_id).first()
    if archivo is None:
        raise HTTPException(status_code=404, detail="Archivo insumo no encontrado")
    return archivo

@router.delete("/archivos-insumo/{archivo_id}")
def delete_archivo_insumo(archivo_id: int, db: Session = Depends(get_db)):
    db_archivo = db.query(models.ArchivoInsumo).filter(models.ArchivoInsumo.id == archivo_id).first()
    if db_archivo is None:
        raise HTTPException(status_code=404, detail="Archivo insumo no encontrado")
    
    # Eliminar archivo físico
    file_path = os.path.join(UPLOAD_DIR, db_archivo.nombre_archivo)
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail=f"Error al eliminar archivo físico: {str(e)}"
            )
    
    # Eliminar registro de base de datos
    db.delete(db_archivo)
    db.commit()
    return {"ok": True}

@router.get("/usuarios/{usuario_id}/archivos-insumo/", response_model=List[schemas.ArchivoInsumo])
def read_archivos_by_usuario(usuario_id: int, db: Session = Depends(get_db)):
    archivos = db.query(models.ArchivoInsumo).filter(models.ArchivoInsumo.usuario_id == usuario_id).all()
    return archivos
