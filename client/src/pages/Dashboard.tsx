//Components import
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";

//React import
import { useEffect, useState } from "react";

//Services import
import {getVMStatuses} from "../services/overviewService";
import type {VmProps} from "../services/overviewService";

//Main page
function Dashboard() {
  const [vmData, setVmData] = useState<VmProps>({ online: "0", offline: "0" });

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
          <h1 className="p-1 text-2xl text-blue-700 font-bold border-b border-gray-200">
            Lileye Monitor
          </h1>
          <div className="flex flex-col mt-5 gap-3">
            <a className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors">
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
            <a className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors">
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
            <a className="p-1 flex bg-white items-center font-semibold text-blue-700 text-left hover:text-blue-900 hover:bg-gray-200 transition-colors">
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
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white">
              <a className="block font-semibold">CPU Usage per VM:</a>
              <a className="block font-semibold">RAM Usage per VM:</a>
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
        </MainBoard>
      </Layout>
    </>
  );
}

export default Dashboard;
