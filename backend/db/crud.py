from sqlalchemy.orm import Session
from . import models, schemas
from core.security import get_password_hash, verify_password

def get_user(db: Session, user_id: int):
    return db.query(models.Usuario).filter(models.Usuario.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Usuario).filter(models.Usuario.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.Usuario).filter(models.Usuario.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Usuario).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UsuarioCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.Usuario(
        email=user.email,
        nombre=user.nombre,
        password_hash=hashed_password,
        rol=user.rol,
        activo=user.activo
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

def update_user_password(db: Session, user_id: int, hashed_password: str):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        db_user.password_hash = hashed_password
        db.commit()
        db.refresh(db_user)
    return db_user
