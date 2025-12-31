#===CREATING RDP SESSIONS FILE
import os
from .directories_init import rdp_sessions
from random import randint

def create_rdp_session(id: int, result: tuple):
    #Search for the home directory of the system
    #home_dir = Path.home()
    #app_dir = home_dir / "aura"
    #Assign the Sessions folder inside home directory
    #destinated_dir = app_dir / "Sessions"
    vm_name, ipv4 = result
    #Assign the content of the RDP file
    content = (
        f"full address:s:{ipv4}\n"
        "screen modeid:i:2\n"
        "desktopwidth:i:1920\n"
        "desktopheight:i:1080\n"
        f"username:s:{vm_name}\n"
        "prompt for credentials:i:0"
    )
    #Create file name, write its content and save it
    filename = f"session{randint(1, 999)}.rdp"
    filepath = rdp_sessions / filename
    with open(filepath, "w", encoding="utf-8") as rdp:
        rdp.write(content)

    return {
        "vm_id": id,
        "rdp_file": str(filepath)
    }