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
        "CPU Usage Percentage": psutil.cpu_percent(1),
        "Memory Total": get_size(memory.total),
        "Memory Used": get_size(memory.used),
        "Memory Available": get_size(memory.available),
        "Disk Total Size": get_size(disks.total),
        "Disk Used": get_size(disks.used),
        "Disk Used Percentage": disks.percent,
        "Disk Free": get_size(disks.free),
    }
    return info