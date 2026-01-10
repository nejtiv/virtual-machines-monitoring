// Components
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";
import AsideContent from "../components/AsideContent";
import Modal from "../components/Modal";
import VMForm from "../components/VMForm";
import Button from "../components/Button";

// React
import { useEffect, useState } from "react";

// Services
import {
  getVirtualMachinesList,
  createVirtualMachine,
  updateVirtualMachine,
  deleteVirtualMachine,
  type VMDisplayProps,
  type VMCreateProps,
  type VMUpdateProps,
} from "../services/virtualMachinesService";
import { createRDPSession } from "../services/rdpSessionsService";

function VirtualMachines() {
  const [vmList, setVmList] = useState<VMDisplayProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVm, setSelectedVm] = useState<VMDisplayProps | null>(null);

  // ===== FETCH =====
  const fetchVMList = async () => {
    try {
      const result = await getVirtualMachinesList();
      setVmList(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVMList();
  }, []);

  // ===== MODAL =====
  const openAddModal = () => {
    setSelectedVm(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vm: VMDisplayProps) => {
    setSelectedVm(vm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVm(null);
    setIsModalOpen(false);
  };

  // ===== CREATE / UPDATE =====
  const handleFormSubmit = async (data: VMCreateProps | VMUpdateProps) => {
    try {
      if (selectedVm) {
        await updateVirtualMachine(selectedVm.vm_id, data);
      } else {
        await createVirtualMachine(data as VMCreateProps);
      }

      closeModal();
      await fetchVMList();
    } catch (err) {
      console.error(err);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (vm: VMDisplayProps) => {
    const ok = window.confirm(`Delete VM ${vm.vm_name} (${vm.vm_id})?`);
    if (!ok) return;

    try {
      await deleteVirtualMachine(vm.vm_id);
      await fetchVMList();
    } catch (err) {
      console.error(err);
    }
  };

  //Handle creating RDP Session
  const handleCreateSession = async (id: number) =>{
    try{
       await createRDPSession(id)
    }
    catch(error){
      console.error(error)
    }
  }

  return (
    <Layout>
      <SideMenu>
        <AsideContent />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    IPv4
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {vmList.map((vm) => (
                  <tr key={vm.vm_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {vm.vm_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {vm.ipv4}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          vm.vm_status === "running"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {vm.vm_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center justify-center text-sm">
                      <div className="flex justify-center gap-3">
                        <Button
                          className="bg-black hover:bg-gray-500 text-white transition-colors rounded cursor-pointer"
                          onClick={() => openEditModal(vm)}
                        >
                          Edit
                        </Button>

                        <Button
                          className="bg-black hover:bg-gray-500 text-white transition-colors rounded cursor-pointer"
                          onClick={() => handleDelete(vm)}
                        >
                          Delete
                        </Button>
                        <Button
                        className="bg-black hover:bg-gray-500 text-white transition-colors rounded cursor-pointer"
                        onClick={() =>handleCreateSession(vm.vm_id)}
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

          <div className="flex justify-end mt-4">
            <Button
              className= "bg-black hover:bg-gray-500 text-white rounded cursor-pointer"
              onClick={openAddModal}
            >
              Add
            </Button>
          </div>

          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              title={selectedVm ? "Edit Virtual Machine" : "Add Virtual Machine"}
              onClose={closeModal}
            >
              <VMForm
                initialData={
                  selectedVm
                    ? {
                        vm_name: selectedVm.vm_name,
                        ipv4: selectedVm.ipv4,
                      }
                    : undefined
                }
                submitLabel={selectedVm ? "Update" : "Create"}
                onSubmit={handleFormSubmit}
                onCancel={closeModal}
              />
            </Modal>
          )}
        </div>
      </MainBoard>
    </Layout>
  );
}

export default VirtualMachines;