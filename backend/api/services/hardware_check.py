#===HARDWARE CHECK FROM AGENT
import requests

def check_hardware(id: int, result: tuple):
    ipv4 = result
    #Formatting the result from tuple to string
    ipv4 = ''.join(ipv4)
    #Request to the agent to retrieve its response
    response = requests.post(f"http://{ipv4}:5000/", timeout=5)
    if response.status_code == 200:
        return response.json()
    else:
        return response.status_code()