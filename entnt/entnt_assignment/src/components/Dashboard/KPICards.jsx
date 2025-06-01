import { useShips } from "../../contexts/ShipsContext";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";

function KPICards() {
  const { ships } = useShips();
  const { jobs } = useJobs();
  const { components } = useComponents();

  const totalShips = ships.length;

  const jobsInProgress = jobs.filter(
    (j) => j.status?.toLowerCase() === "in-progress"
  ).length;

  const jobsCompleted = jobs.filter(
    (j) => j.status?.toLowerCase() === "completed"
  ).length;

  const maintenanceCycleDays = 30;
  const today = new Date();

  const overdueComponents = components.filter((c) => {
    const lastDate = new Date(c.lastMaintenanceDate);
    const dueDate = new Date(lastDate);
    dueDate.setDate(dueDate.getDate() + maintenanceCycleDays);
    return dueDate < today;
  }).length;

  const cards = [
    {
      label: "Total Ships",
      value: totalShips,
      bg: "bg-gradient-to-l from-blue-300 to-blue-500  text-white backdrop-blur-md",
    },
    {
      label: "Overdue Components",
      value: overdueComponents,
      bg: "bg-gradient-to-l from-yellow-200 to-yellow-500  text-white backdrop-blur-md",
    },
    {
      label: "Jobs In Progress",
      value: jobsInProgress,
      bg: "bg-gradient-to-l from-green-300 to-green-500  text-white backdrop-blur-md",
    },
    {
      label: "Jobs Completed",
      value: jobsCompleted,
      bg: "bg-gradient-to-l from-orange-300 to-orange-500 text-white backdrop-blur-md",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`rounded-2xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 animate-fade-in p-6 h-44 flex flex-col justify-between ${card.bg}`}
        >
          <p className="text-lg font-medium drop-shadow-md">{card.label}</p>
          <p className="text-5xl font-extrabold drop-shadow-md">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default KPICards;