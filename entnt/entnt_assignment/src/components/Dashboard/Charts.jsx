import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useJobs } from "../../contexts/JobsContext";

export default function Charts() {
  const chartRef = useRef(null);
  const { jobs } = useJobs();

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = echarts.init(chartRef.current);

    // Helper to normalize status strings
    const normalizeStatus = (status) =>
      status?.toLowerCase().trim().replace(/\s+/g, "-");

    // Count jobs by normalized status
    const openCount = jobs.filter(j => normalizeStatus(j.status) === "open").length;
    const inProgressCount = jobs.filter(j => normalizeStatus(j.status) === "in-progress").length;
    const completedCount = jobs.filter(j => normalizeStatus(j.status) === "completed").length;

    // Debug log (remove in production)
    console.log("Jobs statuses:", jobs.map(j => j.status));
    console.log({ openCount, inProgressCount, completedCount });

    const statusData = [
      { name: "Open", value: openCount },
      { name: "In Progress", value: inProgressCount },
      { name: "Completed", value: completedCount },
    ];

    const option = {
      title: {
        text: "Jobs by Status",
        left: "center",
        textStyle: { fontSize: 18,  color: "#ffffff",},
      },
      tooltip: { trigger: "item"  },
      legend: { 
        bottom: 0,  
        textStyle: {
            color: "#ffffff", 
        }, 
      },
      series: [
        {
          name: "Jobs",
          type: "pie",
          radius: "50%",
          data: statusData,
          label: { 
            show: true, 
            formatter: "{b}: {c}",  
            textStyle: {
                color: "#ffffff", 
            }, },
          animationType: "scale",
          animationDuration: 1000,
          animationEasing: "elasticOut",
          emphasis: {
            scale: true,
          },
          itemStyle: {
            borderWidth: 2,
            // borderColor: "#fff",
            shadowBlur: 5,
          },
        },
      ],
    };

    chartInstance.setOption(option);

    chartInstance.on("click", (params) => {
      chartInstance.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });

    return () => {
      chartInstance.dispose();
    };
  }, [jobs]);

  return (
    <div className="p-4 bg-black rounded-2xl transition-transform duration-500 hover:scale-95">
      <div ref={chartRef} className="w-full" style={{ height: "300px" }}></div>
    </div>
  );

}  