#===PINGING VIRTUAL MACHINES FOR RESPONSE
import os
import sys
from ..registered_tables import virtualmachines
from ..db_connection import sa, engine

def vm_ping():
    #Query to read the all virtual machines id and ipv4
    read_query = sa.select(virtualmachines.c.vm_id, virtualmachines.c.ipv4)
    #Assign param for each operating system [windows preffered]
    param = '-n' if sys.platform.lower()=='win32' else '-c'
    with engine.begin() as connection:
        result = connection.execute(read_query)
        rows = result.fetchall()
    
    #Mapping result to destinated rows, perform the ping operation and assign its status
    for row in rows:
        vm_id = row[0]
        vm_ip = row[1]
        ping = os.system(f"ping {param} 1 {vm_ip}")
        status = "aviable" if ping == 0 else "offline"

        #Query to update 
        update_query = sa.update(virtualmachines).where(virtualmachines.c.vm_id == vm_id).values(vm_status=status)
        with engine.begin() as connection:
           connection.execute(update_query)