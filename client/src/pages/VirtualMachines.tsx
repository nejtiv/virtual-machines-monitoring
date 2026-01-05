//Components import
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";
import AsideContent from "../components/AsideContent";
import Modal from "../components/Modal";
import VMForm from "../components/VMForm";
import Button from "../components/Button";

//React import
import { useState, useEffect } from "react";

//virtualMachinesService import
import type { VMDisplayProps, VMCreateProps, VMUpdateProps } from "../services/virtualMachinesService";
import { getVirtualMachinesList, createVirtualMachine, updateVirtualMachine, deleteVirtualMachine } from "../services/virtualMachinesService";


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
  return (
    <>
      <Layout>
        <SideMenu>
          <AsideContent/>
        </SideMenu>
        <MainBoard>
          <h1 className="p-1 pl-3 text-md font-bold border-b border-gray-200 bg-white">
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
