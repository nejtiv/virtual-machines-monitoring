#===hardware monitoring for vm
import psutil

memory = psutil.virtual_memory()
disks = psutil.disk_usage('/')
usr = psutil.users()

def get_size(bytes, suffix="B"):
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

def get_hardware():
    info = {
        "cpu_used": psutil.cpu_percent(1),
        "memory_total": get_size(memory.total),
        "memory_used": get_size(memory.used),
        "memory_free": get_size(memory.available),
        "disk_total_size": get_size(disks.total),
        "disk_used": get_size(disks.used),
        "disk_used_percent": disks.percent,
        "disk_free": get_size(disks.free),
    }
    return info