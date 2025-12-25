//Dependencies import
import axios from "axios"

//Props for online and ooffline virtual machines display
export type VmProps = {
    online: string,
    offline: string
}

//API communication to retrieve counted statuses of Virtual Machines
export const getVMStatuses = async () => {
    const response = await axios.get<VmProps>(
        "http://127.0.0.1:5000/api/analytics/vm/online_offline"
    )
    return response.data;
}