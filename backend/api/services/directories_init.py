#===DIRECTORIES INITIALIZATION FOR ENTIRE APP TO WORK
import os
from pathlib import Path

#Define application directorites regardless of used OS
home_dir = Path.home()
app_dir = home_dir / "aura"
logs_path = app_dir / "Logs"
rdp_sessions = app_dir / "Sessions"

def directory_initialization():
    try:
        #Make the directories
        app_dir.mkdir(exist_ok=True)
        logs_path.mkdir(exist_ok=True)
        rdp_sessions.mkdir(exist_ok=True)
        return{
            "status": "OK",
            "logs_path": logs_path,
            "rdp_sessions": rdp_sessions
        }
    except Exception as e:
        return{
            "status": "ERROR",
            "details": str(e)
        }