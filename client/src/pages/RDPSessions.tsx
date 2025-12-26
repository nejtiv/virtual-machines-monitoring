//Components import
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";

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

  //Navigation between sites
  const navigateHome = () => {
    navigate("/");
  };
  const navigateVM = () => {
    navigate("/virtual-machines");
  };
  const navigateRDP = () => {
    navigate("/rdp-sessions");
  };
  return (
    <>
      <Layout>
        <SideMenu>
          <h1
            className="p-1 text-2xl text-blue-700 font-bold border-b border-gray-200 cursor-pointer"
            onClick={navigateHome}
          >
            Lileye Monitor
          </h1>
          <div className="flex flex-col mt-5 gap-3">
            <a
              className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={navigateHome}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              Overview
            </a>
            <a
              className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={navigateVM}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                />
              </svg>
              Virtual Machines
            </a>
            <a
              className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={navigateRDP}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                />
              </svg>
              RDP Sessions
            </a>
          </div>
        </SideMenu>
        <MainBoard>
          <h1 className="p-1 pl-3 text-2xl font-bold border-b border-gray-200 bg-white">
            Virtual Machines
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
                              className="bg-indigo-600 text-white rounded"
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
