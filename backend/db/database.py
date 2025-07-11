import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import logging
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Debug de variables de entorno
logger.info("=== Variables de entorno ===")
logger.info(f"DB_USER: {os.getenv('DB_USER')}")
logger.info(f"DB_PASSWORD: {'*' * len(os.getenv('DB_PASSWORD', '')) if os.getenv('DB_PASSWORD') else 'No establecido'}")
logger.info(f"DB_HOST: {os.getenv('DB_HOST')}")
logger.info(f"DB_PORT: {os.getenv('DB_PORT')}")
logger.info(f"DB_NAME: {os.getenv('DB_NAME')}")
logger.info("========================")

# Configuración de la base de datos
MYSQL_USER = os.getenv('DB_USER', 'avnadmin')
MYSQL_PASSWORD = os.getenv('DB_PASSWORD')  # Solo desde variable de entorno
MYSQL_HOST = os.getenv('DB_HOST', 'modelo-academico-modelo-academico.k.aivencloud.com')
MYSQL_PORT = os.getenv('DB_PORT', '12305')
MYSQL_DB = os.getenv('DB_NAME', 'defaultdb')

# Ruta al certificado CA
MYSQL_SSL_CA = os.path.abspath(os.path.join(os.path.dirname(__file__), 'ca.pem'))
logger.info(f"Usando certificado CA en: {MYSQL_SSL_CA}")

# Crear URL de conexión
SQLALCHEMY_DATABASE_URL = (
    f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
)

print("URL de conexión generada:", SQLALCHEMY_DATABASE_URL)

# Configuración SSL
ssl_args = {
    "ssl_ca": MYSQL_SSL_CA,
    "ssl_verify_cert": True
}

# Crear engine con SSL
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args=ssl_args
)

# Crear sesión y base para modelos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependencia para obtener sesión en endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
