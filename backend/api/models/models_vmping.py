#===BASE MODELS FOR VM PINGING
from pydantic import BaseModel
from typing import Optional

class vmcreate(BaseModel):
    vm_name: str
    ipv4: str

class vmread(BaseModel):
    vm_id: int
    vm_name: str
    ipv4: str
    vm_status: str

class vmupdate(BaseModel):
    vm_name: Optional[str] = None
    ipv4: Optional[str] = None