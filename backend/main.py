from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, SessionLocal, get_db
from db import models
from sqlalchemy.orm import Session
from sqlalchemy import text
from api.endpoints import (
    usuarios,
    docentes,
    planes_estudio,
    asignaturas,
    eventos,
    asignaciones,
    archivos_insumo
)
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Crear las tablas al iniciar
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Académica")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(usuarios.router, prefix="/api", tags=["usuarios"])
app.include_router(docentes.router, prefix="/api", tags=["docentes"])
app.include_router(planes_estudio.router, prefix="/api", tags=["planes_estudio"])
app.include_router(asignaturas.router, prefix="/api", tags=["asignaturas"])
app.include_router(eventos.router, prefix="/api", tags=["eventos"])
app.include_router(asignaciones.router, prefix="/api", tags=["asignaciones"])
app.include_router(archivos_insumo.router, prefix="/api", tags=["archivos_insumo"])

@app.get("/")
def read_root():
    return {"message": "API académica funcionando"}

@app.get("/db-test")
def test_db(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {"db_connection": "ok", "result": result}
    except Exception as e:
        return {"db_connection": "error", "detail": str(e)}
