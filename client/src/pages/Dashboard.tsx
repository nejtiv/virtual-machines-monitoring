//Components import
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import Layout from "../components/Layout";
import MainBoard from "../components/MainBoard";
import SideMenu from "../components/SideMenu";
import AsideContent from "../components/AsideContent";

//React import
import { useEffect, useState } from "react";

//Services and types import
import { getVMStatuses } from "../services/overviewService";
import type { VmProps } from "../services/overviewService";

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
          <AsideContent/>
        </SideMenu>
        <MainBoard>
          <h1 className="p-1 pl-3 text-md font-bold border-b border-gray-200 bg-white">
            Monitoring Overview
          </h1>
          <div className="m-5 h-auto md:h-auto lg:h-auto xl:h-auto 2xl:h-auto flex gap-3">
            <div className="container mx-auto md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white">
              <a className="block font-semibold">
                Virtual Machines Online: {vmData.online}
              </a>
              <a className="block font-semibold">
                Virtual Machines Offline: {vmData.offline}
              </a>
            </div>
          </div>
          <div className="m-5 h-auto md:h-auto lg:h-auto xl:h-auto 2xl:h-auto flex gap-3">
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white h-96">
              <PieChart
                endpoint="http://127.0.0.1:5000/api/analytics/vm/online_offline"
                dataMapper={(data) => ({
                  labels: [
                    "Virtual Machines Online",
                    "Virtual Machines Offline",
                  ],
                  data: [data.online, data.offline],
                  backgroundColor: ["#36A2EB", "#FF6384"],
                  hoverBackgroundColor: ["#36A2EB", "#FF6384"],
                })}
                title="VM Status Overview"
                refreshInterval={60000}
              />
            </div>
            <div className="container mx-auto px-4 m-4 border rounded-md border-gray-200 bg-white h-96">
              <BarChart
                endpoint="http://127.0.0.1:5000/api/analytics/vm/ram_cpu_usage"
                dataMapper={(data) => ({
                  labels: data.labels,
                  datasets: [
                    {
                      label: "CPU Usage (%)",
                      data: data.cpuUsage,
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 1,
                    },
                    {
                      label: "RAM Usage (%)",
                      data: data.ramUsage,
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderWidth: 1,
                    },
                  ],
                })}
                title="CPU & RAM Usage"
                refreshInterval={2000}
              />
            </div>
          </div>
        </MainBoard>
      </Layout>
    </>
  );
}

export default Dashboard;
