#===REGISTER BACKGROUND JOBS
from .. import scheduler
from ..database.db_connection import sa, engine
from ..models.models_hardwareinfo import hardwareupdate
from ..database.registered_tables import hardwareinfo
from ..services.vm_ping import vm_ping
from ..services.hardware_check import check_hardware

#Virtual Machine Online/Offline check job
@scheduler.task(trigger='interval', id='vm_ping', seconds=1)
def vm_ping_job():
    vm_ping()

#Check hardware parameters of each Virtual Machine job
@scheduler.task(trigger='interval', id='hardware_check', seconds=2)
def hardware_check_job():
    #List of Virtual Machines to append
    results = []
    try:
        #Query to select all registered Virtual Machines for monitoring
        select_query = sa.select(hardwareinfo.c.ipv4, hardwareinfo.c.vm_id)
        with engine.begin() as connection:
            result = connection.execute(select_query).fetchall()
        for vm in result:
            vm_id = vm.vm_id
            ipv4 = vm.ipv4
            try:
                #Call the service to check the hardware for each vm
                check_info = check_hardware(ipv4= ipv4)
                dto = hardwareupdate(**check_info)
                #Query to update the hardware info for Virtual Machine
                update_query = sa.update(hardwareinfo).where(hardwareinfo.c.vm_id == vm_id).values(**dto.model_dump())
                with engine.begin() as connection:
                    connection.execute(update_query)
                results.append(
                    {
                        "vm_id": vm_id,
                        "status": "success!"
                    }
                )
            except Exception as e:
                results.append(
                    {
                        "vm_id": vm_id,
                        "status": "failed!"
                    }
                )
            return results
    except Exception as e: 
        return e