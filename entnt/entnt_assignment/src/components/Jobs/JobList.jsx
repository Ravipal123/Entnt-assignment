import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useShips } from "../../contexts/ShipsContext";
import { getSession } from "../../utils/localStorageUtils";
import { canEditJobs } from "../../utils/roleUtils";

const JobList = () => {
  const { updateJobStatus, filterJobs } = useJobs();
  const { ships } = useShips();

  const user = getSession();
  const canEdit = user && canEditJobs(user.role);

  const [filters, setFilters] = useState({
    shipId: "",
    status: "",
    priority: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusUpdate = (jobId, newStatus) => {
    updateJobStatus(jobId, newStatus);
  };

  const filteredJobs = filterJobs(
    filters.shipId,
    filters.status,
    filters.priority
  );

  return (
    <div className="bg-[#2a2a2a] min-h-screen">
      <h2 className="text-lg font-bold mb-2 text-white">Maintenance Jobs</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <select
          name="shipId"
          onChange={handleFilterChange}
          className="border text-white p-2 rounded-xl cursor-pointer"
        >
          <option value="">All Ships</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id} className="bg-[#2a2a2a]">
              {ship.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          onChange={handleFilterChange}
          className="border p-2 text-white rounded-xl cursor-pointer"
        >
          <option value="" className="bg-[#2a2a2a]">All Statuses</option>
          <option className="bg-[#2a2a2a]">Open</option>
          <option className="bg-[#2a2a2a]">In Progress</option>
          <option className="bg-[#2a2a2a]">Completed</option>
        </select>

        <select
          name="priority"
          onChange={handleFilterChange}
          className="border p-2 text-white rounded-xl cursor-pointer"
        >
          <option value="">All Priorities</option>
          <option className="bg-[#2a2a2a]">High</option>
          <option className="bg-[#2a2a2a]">Medium</option>
          <option className="bg-[#2a2a2a]">Low</option>
        </select>
      </div>

      {filteredJobs.map((job) => (
        <div
          key={job.id}
          className="relative flex flex-col my-6 bg-black shadow-sm border border-slate-200 rounded-2xl w-[400px]  p-6"
        >
          <div class="flex items-center mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <h5 class="ml-3 text-slate-300 text-xl font-semibold">
              JOB DETAILS
            </h5>
          </div>
          <p className="text-white">
            <p>
              <strong>Type:</strong> {job.type}
            </p>
            <p>
              <strong>Priority:</strong> {job.priority}
            </p>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
            <p>
              <strong>Scheduled:</strong> {job.scheduledDate}
            </p>
            <p>
              <strong>Engineer ID:</strong> {job.assignedEngineerId}
            </p>
          </p>
          {canEdit && (
            <select
              name="priority"
              value={job.status}
              onChange={(e) => handleStatusUpdate(job.id, e.target.value)}
              class="bg-gray-300 border border-black text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option className="text-white">Open</option>
              <option className="text-white">In Progress</option>
              <option className="text-white">Completed</option>
            </select>
          )}
        </div>
      ))}

      {filteredJobs.length === 0 && <p className="text-red-500">No jobs found for selected filters.</p>}
    </div>
  );
};

export default JobList;