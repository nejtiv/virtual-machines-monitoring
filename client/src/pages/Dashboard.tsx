//Components import
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";

//React import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Services and types import
import { getVMStatuses } from "../services/overviewService";
import type { VmProps } from "../services/overviewService";

//Main page
function Dashboard() {
  const [vmData, setVmData] = useState<VmProps>({ online: "0", offline: "0" });

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
  };
  const navigateRDP = () => {
    navigate("/rdp-sessions");
  };

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
              <PieChart />
            </div>
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white">
              <BarChart />
            </div>
          </div>
        </MainBoard>
      </Layout>
    </>
  );
}

export default Dashboard;
