#===REGISTERED SQL TABLES
from .db_connection import engine, sa

metadata = sa.MetaData()
#===REGISTER TABLES HERE
virtualmachines = sa.Table("VirtualMachines", metadata, autoload_with=engine, schema="dbo")
hardwareinfo = sa.Table("HardwareInfo", metadata, autoload_with=engine, schema="dbo")