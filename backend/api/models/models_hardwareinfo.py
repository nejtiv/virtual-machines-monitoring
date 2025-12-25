#===BASE MODELS FOR HARDWARE INFO RETRIEVAL
from pydantic import BaseModel
from typing import Optional

class hardwareread(BaseModel):
    machine_id: int
    vm_id: int
    cpu_used: float
    disk_total_size: str
    disk_free: str
    disk_used: str
    disk_used_percent: str
    memory_total: str
    memory_used: str
    memory_free: str
    memory_used_percent: float

class hardwareupdate(BaseModel):
    cpu_used: Optional[float] = None
    disk_total_size: Optional[str] = None
    disk_free: Optional[str] = None
    disk_used: Optional[str] = None
    disk_used_percent: Optional[float] = None
    memory_total: Optional[str] = None
    memory_used: Optional[str] = None
    memory_free: Optional[str] = None 
    memory_used_percent: Optional[float] = None