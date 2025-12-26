//Dependencies import
import axios from "axios"

//API communication to create RDP session for Virtual Machine
export const createRDPSession = async (id: number) => {
    const response = await axios.post(`http://127.0.0.1:5000/api/rdp/create_session/${id}`)
    return response.data;
}