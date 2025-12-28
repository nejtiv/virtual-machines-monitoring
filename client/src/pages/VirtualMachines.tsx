//Components import
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";

//React import
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//virtualMachinesService import
import type { VMDisplayProps, VMCreateProps, VMUpdateProps } from "../services/virtualMachinesService";
import { getVirtualMachinesList, createVirtualMachine, updateVirtualMachine, deleteVirtualMachine } from "../services/virtualMachinesService";
import Modal from "../components/Modal";
import VMForm from "../components/VMForm";
import Button from "../components/Button";

//Main page
function VirtualMachines() {
  //useState initialization
  const [vmList, setVmList] = useState<VMDisplayProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVm, setSelectedVm] = useState<VMDisplayProps | null>(null);
  
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

  const openModal = (vm: VMDisplayProps | null) => {
    setSelectedVm(vm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVm(null);
    setIsModalOpen(false);
  };

  //Handling the edit of the Virtual Machine
  const handleVMUpdate = (id: number) =>{
    const vmToEdit = vmList.find(vm => vm.vm_id === id);
    if (vmToEdit) {
      openModal(vmToEdit);
    }
  }

  const handleFormSubmit = async (data: VMCreateProps | VMUpdateProps) => {
    // capture selected VM id before closing modal
    const editingId = selectedVm?.vm_id;
    // close modal immediately on submit
    closeModal();

    try {
      if (editingId) {
        const resp = await updateVirtualMachine(editingId, data);
        // try optimistic update if response contains updated VM
        if (resp && typeof resp === 'object' && 'vm_id' in resp) {
          setVmList((prev) => prev.map((v) => (v.vm_id === editingId ? (resp as VMDisplayProps) : v)));
        } else {
          await fetchVMList();
        }
      } else {
        const resp = await createVirtualMachine(data as VMCreateProps);
        // if API returned created VM, prepend it; otherwise refetch
        if (resp && typeof resp === 'object' && 'vm_id' in resp) {
          setVmList((prev) => [resp as VMDisplayProps, ...prev]);
        } else {
          await fetchVMList();
        }
      }
    } catch (error) {
      console.error(error);
      // on error, ensure list is refreshed to reflect server state
      await fetchVMList();
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
  const navigateHM = () => {
    navigate("/health-monitor");
  }
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
              onClick={navigateHM}
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
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Health Monitor
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
                            <Button className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-white rounded" onClick={() => handleVMUpdate(vm.vm_id)}>Edit</Button>
                              <Button
                                className="bg-red-500 hover:bg-red-700 transition-colors text-white rounded"
                                onClick={async () => {
                                  const ok = window.confirm(`Delete VM ${vm.vm_name} (${vm.vm_id})?`);
                                  if (!ok) return;
                                  try {
                                    await deleteVirtualMachine(vm.vm_id);
                                    await fetchVMList();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                Delete
                              </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors" onClick={() => openModal(null)}>Add</Button>
            </div>
            {isModalOpen && (
              <Modal isOpen={isModalOpen} title={selectedVm ? "Edit Virtual Machine" : "Add Virtual Machine"} onClose={closeModal}>
                <VMForm
                  initialData={selectedVm ? { vm_name: selectedVm.vm_name, ipv4: selectedVm.ipv4 } : undefined}
                  submitLabel={selectedVm ? "Update" : "Create"}
                  onSubmit={handleFormSubmit}
                  onCancel={closeModal}
                />
              </Modal>
            )}
          </div>
        </MainBoard>
      </Layout>
    </>
  );
}

export default VirtualMachines;
