// Components import
import Layout from "../components/Layout";
import SideMenu from "../components/SideMenu";
import MainBoard from "../components/MainBoard";
import Button from "../components/Button";
import AsideContent from "../components/AsideContent";

// React import
import { useEffect, useState } from "react";

// overviewService import
import { getHealthMonitor } from "../services/overviewService";
import type { HealthMonitorProps } from "../services/overviewService";
import React from "react";

// Main Page
function HealthMonitor() {
  const [healthMonitor, setHealthMonitor] = useState<HealthMonitorProps[]>([]);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatNumber = (
    value: number | string | undefined | null,
    suffix = ""
  ) => {
    if (value === null || value === undefined) return "-";
    const raw =
      typeof value === "number" ? value : String(value).replace(/\s/g, "");
    const parsed = parseFloat(String(raw).replace("%", "").replace(",", "."));
    if (Number.isNaN(parsed)) return String(value);
    return `${parsed.toFixed(2)}${suffix}`;
  };

  // Get Health Monitor with refresh every 2 seconds
  useEffect(() => {
    let isMounted = true;

    const fetchHealthMonitor = async () => {
      try {
        const result = await getHealthMonitor();
        if (isMounted && result !== null && result !== undefined) {
          setHealthMonitor(Array.isArray(result) ? result : [result]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // initial fetch
    fetchHealthMonitor();

    // interval refresh
    const interval = setInterval(fetchHealthMonitor, 5000);

    // cleanup
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <SideMenu>
        <AsideContent/>
      </SideMenu>
      <MainBoard>
        <h1 className="p-1 pl-3 text-md font-bold border-b border-gray-200 bg-white">
          Virtual Machines Health Monitor
        </h1>
        <div className="m-5 h-auto">
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Machine ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    VM ID
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    CPU Used (%)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Disk Used (%)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Memory Used (%)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {healthMonitor.map((data) => (
                  <React.Fragment key={data.machine_id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.machine_id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {data.vm_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {formatNumber(data.cpu_used, "%")}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {formatNumber(data.disk_used_percent, "%")}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {formatNumber(data.memory_used_percent, "%")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-800 transition-colors text-white text-sm rounded"
                          onClick={() => toggleRow(data.machine_id)}
                        >
                          {expandedRows[data.machine_id] ? "Hide" : "Details"}
                        </Button>
                      </td>
                    </tr>

                    {expandedRows[data.machine_id] && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Disk Total:</strong>{" "}
                              {data.disk_total_size}
                            </div>
                            <div>
                              <strong>Disk Free:</strong> {data.disk_free}
                            </div>
                            <div>
                              <strong>Disk Used:</strong> {data.disk_used}
                            </div>
                            <div>
                              <strong>Memory Total:</strong> {data.memory_total}
                            </div>
                            <div>
                              <strong>Memory Used:</strong> {data.memory_used}
                            </div>
                            <div>
                              <strong>Memory Free:</strong> {data.memory_free}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainBoard>
    </Layout>
  );
}

export default HealthMonitor;
