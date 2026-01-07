#===HARDWARE CHECK FROM AGENT
import requests

def check_hardware(ipv4: str):
    #Request to the agent to retrieve its response
    response = requests.post(f"http://{ipv4}:5000/", timeout=5)
    if response.status_code == 200:
        return response.json()
    else:
        return response.status_code()
    
def check_online(ipv4: str):
    #Request to the agent to check if the agent is online [TEST PURPOSE]
    response = requests.post(f"http://{ipv4}:5000/check_online", timeout=5)
    if response.status_code == 200:
        return response.json()
    else:
        return response.status_code()
    
def cyclic_restart(ipv4: str):
    #Request to the agent to perform cyclic reboot of all Virtual Machines
    response = requests.post(f"http://{ipv4}:5000/reboot", timeout=5)
    if response.status_code == 200:
        return response.json()
    else:
        return response.status_code()