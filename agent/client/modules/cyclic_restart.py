#===CYCLIC RESTART FUNCTION
import os

#command to restart all Virtual Machines
def cyclic_restart():
    os.system("shutdown /r /t 0")
    return{
        "message": "Cyclic Rebooting..."
    }