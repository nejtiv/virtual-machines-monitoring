#===REGISTER BACKGROUND JOBS
from .. import scheduler
from ..services.vm_ping import vm_ping

#Virtual Machine Online/Offline check job
@scheduler.task(trigger='interval', id='vm_ping', seconds=1)
def vm_ping_job():
    vm_ping()