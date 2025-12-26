//Dependencies import
import axios from "axios";

//Props for displaying Virtual Machines list
export type VMDisplayProps = {
    vm_id: number
    vm_name: string
    ipv4: string
    vm_status: string
}

//Props for registering Virtual Machine
export type VMCreateProps = {
    vm_name: string
    ipv4: string
}

//Props for updating Virtual Machine
export type VMUpdateProps = {
    vm_name: string
    ipv4: string
}

//API communication to retrieve the Virtual Machine list
export const getVirtualMachinesList = async () =>{
    const response = await axios.get<VMDisplayProps>(
        "http://127.0.0.1:5000/api/vm/display"
    )
    return response.data;
}

//API communication to register the Virtual Machine
export const createVirtualMachine = async (data: VMCreateProps) =>{
    const response = await axios.post("http://127.0.0.1:5000/api/vm/add", data)
    return response.data;
}

//API communication to update the Virtual Machine
export const updateVirtualMachine = async (id: number, data: VMUpdateProps) => {
    const response = await axios.put(`http://127.0.0.1:5000/api/vm/update/${id}`,data)
    return response.data;
}

//API communication to delete the Virtual Machine
export const deleteVirtualMachine = async (id: number) =>{
    const response = await axios.delete(`http://127.0.0.1:5000/api/vm/delete/${id}`)
    return response.data;
}