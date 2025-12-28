//Dependencies import
import axios from "axios"

//Props for online and ooffline virtual machines display
export type VmProps = {
    online: string,
    offline: string
}

//Props for displaying health monitor
export type HealthMonitorProps = {
    machine_id: number
    vm_id: number
    cpu_used: number
    disk_total_size: string
    disk_free: string
    disk_used: string
    disk_used_percent: string
    memory_total: string
    memory_used: string
    memory_free: string
    memory_used_percent: number
}

//API communication to retrieve counted statuses of Virtual Machines
export const getVMStatuses = async () => {
    const response = await axios.get<VmProps>(
        "http://127.0.0.1:5000/api/analytics/vm/online_offline"
    )
    return response.data;
}

//API communication to retrieve health monitor of Virtual machines
export const getHealthMonitor = async () =>{
    const response = await axios.get<HealthMonitorProps>(
        "http://127.0.0.1:5000/api/analytics/vm/health_monitor"
    )
    await axios.put('http://127.0.0.1:5000/api/hardware_check/check')
    return response.data;
}