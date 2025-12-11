#===CREATING RDP SESSIONS FILE
import os
from pathlib import Path
from random import randint

def create_rdp_session(id: int, result: tuple):
    home_dir = Path.home()
    destinated_dir = home_dir / "Sessions"
    destinated_dir.mkdir(exist_ok=True)
    vm_name, ipv4 = result
    content = (
        f"full address:s:{ipv4}\n"
        "screen modeid:i:2\n"
        "desktopwidth:i:1920\n"
        "desktopheight:i:1080\n"
        f"username:s:{vm_name}\n"
        "prompt for credentials:i:0"
    )
    filename = f"session{randint(1, 999)}.rdp"
    filepath = destinated_dir / filename
    with open(filepath, "w", encoding="utf-8") as rdp:
        rdp.write(content)

    return {
        "vm_id": id,
        "rdp_file": str(filepath)
    }