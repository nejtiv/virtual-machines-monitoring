//Components import
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";
import Button from "../components/Button";

//React import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Services and types import
import {getVMStatuses, getHealthMonitor} from "../services/overviewService";
import type {HealthMonitorProps, VmProps} from "../services/overviewService";

//Main page
function Dashboard() {
  const [vmData, setVmData] = useState<VmProps>({ online: "0", offline: "0" });
  const [healthMonitor, setHealthMonitor] = useState<HealthMonitorProps[]>([])
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const formatNumber = (value: number | string | undefined | null, suffix = "") => {
    if (value === null || value === undefined) return "-"
    const raw = typeof value === "number" ? value : String(value).replace(/\s/g, "")
    const parsed = parseFloat(String(raw).replace('%', '').replace(',', '.'))
    if (Number.isNaN(parsed)) return String(value)
    return `${parsed.toFixed(2)}${suffix}`
  }

  //declare navigate
  const navigate = useNavigate()

  //Navigation between sites
  const navigateHome = () => {
    navigate("/")
  }
  const navigateVM = () => {
    navigate("/virtual-machines")
  }
  const navigateRDP = () => {
    navigate("/rdp-sessions")
  }

  //Get Health Monitor
  useEffect(() => {
    const fetchHealthMonitor = async () => {
      try{
        const result = await getHealthMonitor()
        if (result !== null && result !== undefined){
          setHealthMonitor(Array.isArray(result) ? result : [result])
        }
      }catch(error){
        console.error(error);
      }
    };
    fetchHealthMonitor();
  }, [])

  //Get VM Statuses Call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getVMStatuses();
        setVmData(result);
      } catch (error) {
        console.error("Error fetching VM statuses:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <SideMenu>
          <h1 className="p-1 text-2xl text-blue-700 font-bold border-b border-gray-200 cursor-pointer" onClick={navigateHome}>
            Lileye Monitor
          </h1>
          <div className="flex flex-col mt-5 gap-3">
            <a className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors cursor-pointer" onClick={navigateHome}>
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
            <a className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors cursor-pointer" onClick={navigateVM}>
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
            <a className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors cursor-pointer" onClick={navigateRDP}>
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
            Monitoring Overview
          </h1>
          <div className="m-5 h-auto flex gap-3">
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white">
              <a className="block font-semibold text-green-800">
                Virtual Machines Online: {vmData.online}
              </a>
              <a className="block font-semibold text-red-800">
                Virtual Machines Offline: {vmData.offline}
              </a>
            </div>
          </div>
          <div className="m-5 h-auto flex gap-3">
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white">
              <PieChart/>
            </div>
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white">
              <BarChart/>
            </div>
          </div>
          <div className="m-5 h-auto border-gray-200 flex gap-3">
          <div className="container mx-auto px-4 m-4 rounded-md border-gray-200 bg-white">
            <h2 className="p-1 pl-3 text-xl font-semibold border-b border-gray-200 bg-white">
              Virtual Machines Health Monitor
            </h2>
            <div className="m-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VM ID</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CPU Used (%)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Disk Used (%)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Memory Used (%)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {healthMonitor.map((data) => (
                    <>
                      <tr key={data.machine_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{data.machine_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.vm_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.cpu_used, "%")}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.disk_used_percent, "%")}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.memory_used_percent, "%")}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <Button
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-800 text-white text-sm rounded transition-colors"
                            onClick={() => toggleRow(data.machine_id)}
                          >
                            {expandedRows[data.machine_id] ? "Hide" : "Details"}
                          </Button>
                        </td>
                      </tr>
                      {expandedRows[data.machine_id] && (
                        <tr key={`${data.machine_id}-details`} className="bg-gray-50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                              <div>
                                <div className="font-semibold">Disk Total</div>
                                <div>{data.disk_total_size}</div>
                              </div>
                              <div>
                                <div className="font-semibold">Disk Free</div>
                                <div>{data.disk_free}</div>
                              </div>
                              <div>
                                <div className="font-semibold">Disk Used</div>
                                <div>{data.disk_used}</div>
                              </div>
                              <div>
                                <div className="font-semibold">Memory Total</div>
                                <div>{data.memory_total}</div>
                              </div>
                              <div>
                                <div className="font-semibold">Memory Used</div>
                                <div>{data.memory_used}</div>
                              </div>
                              <div>
                                <div className="font-semibold">Memory Free</div>
                                <div>{data.memory_free}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </MainBoard>
      </Layout>
    </>
  );
}

export default Dashboard;
