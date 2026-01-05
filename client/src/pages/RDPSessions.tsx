//Components import
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";
import AsideContent from "../components/AsideContent";

//React import
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//virtualMachinesService import
import type { VMDisplayProps } from "../services/virtualMachinesService";
import { getVirtualMachinesList } from "../services/virtualMachinesService";
import { createRDPSession } from "../services/rdpSessionsService";
import Button from "../components/Button";

//Main page
function RDPSessions() {
  //useState initialization
  const [vmList, setVmList] = useState<VMDisplayProps[]>([]);
  
  
  const fetchVMList = async () => {
    try{
        const result = await getVirtualMachinesList();
        if (result !== undefined && result !== null) {
            setVmList(Array.isArray(result) ? result : [result]);
        }
    }
    catch(error){
        console.error(error);
    }
  }
  //Using the service to get the virtual machine list
  useEffect(() =>{
    fetchVMList();
  },[])

  // create RDP session for a VM and navigate to RDP sessions view
  const handleCreateSession = async (id: number) => {
    try {
      await createRDPSession(id);
      navigateRDP();
    } catch (err) {
      console.error(err);
    }
  };

  //declare navigate
  const navigate = useNavigate();
  const navigateRDP = () => {
    navigate("/rdp-sessions");
  };
  return (
    <>
      <Layout>
        <SideMenu>
          <AsideContent/>
        </SideMenu>
        <MainBoard>
          <h1 className="p-1 pl-3 text-md font-bold border-b border-gray-200 bg-white">
            RDP Sessions
          </h1>
          <div className="m-5 h-auto">
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IPv4</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {vmList.map((vm) => (
                      <tr key={vm.vm_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vm.vm_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vm.vm_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{vm.ipv4}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vm.vm_status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {vm.vm_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <div className="flex justify-center gap-2">
                            <Button
                              className="bg-indigo-600 hover:bg-indigo-800 transition-colors text-white rounded"
                              onClick={async () => handleCreateSession(vm.vm_id)}
                            >
                              Create Session
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </MainBoard>
      </Layout>
    </>
  );
}

export default RDPSessions;
