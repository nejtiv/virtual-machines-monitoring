#===PRODUCTION DATABASE CONNECTION
import os
from dotenv import load_dotenv
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker

load_dotenv()

SERVER_IP = os.environ.get("SERVER_IP")
DATABASE_NAME = os.environ.get("DATABASE_NAME")
SQL_USER = os.environ.get("SQL_USER")
SQL_PASS = os.environ.get("SQL_PASS")
ODBC_DRIVER = "ODBC Driver 18 for SQL Server"

connection_string = (
    f"DRIVER={{{ODBC_DRIVER}}};"
    f"SERVER={{{SERVER_IP}}};"
    f"DATABASE={{{DATABASE_NAME}}};"
    f"UID={{{SQL_USER}}};"
    f"PWD={{{SQL_PASS}}};"
    "Encrypt=yes;"
    "TrustServerCertificate=yes;"
)

connection_url = sa.engine.URL.create(
    "mssql+pyodbc",
    query={"odbc_connect": connection_string}
)

engine = sa.create_engine(connection_url)

engine.dialect.server_version_info = ((17, 0, 1000, 7))