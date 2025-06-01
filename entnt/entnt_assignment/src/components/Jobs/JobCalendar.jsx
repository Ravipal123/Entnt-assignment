// 

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useJobs } from "../../contexts/JobsContext";
import { useNavigate } from "react-router-dom";

const JobCalendar = () => {
  const { jobs } = useJobs();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const getJobsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return jobs.filter((job) => job.scheduledDate === dateStr);
  };

  const tileContent = ({ date, view }) => {
    const jobsOnDate = getJobsForDate(date);
    if (view === "month" && jobsOnDate.length > 0) {
      return <span className="text-xs text-red-500">● {jobsOnDate.length}</span>;
    }
  };

  const jobsForSelected = getJobsForDate(selectedDate);

  return (
    <div className="p-4 bg-[#2a2a2a] min-h-screen">
      <h2 className="text-xl text-gray-300 font-bold mb-4 text-center md:text-left">Maintenance Calendar</h2>

      {/* Responsive container: flex-col on mobile, flex-row on md+ */}
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-8 md:gap-12">

        {/* Calendar container */}
        <div className="rounded-lg shadow-md p-2">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className="bg-black"
          />
        </div>

        {/* Jobs list container */}
        <div className="relative flex flex-col bg-black shadow-sm border border-slate-200 rounded-lg p-6 w-full max-w-md md:max-w-lg">

          {/* Header */}
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <h5 className="ml-3 text-slate-300 text-xl font-semibold">
              Jobs on {selectedDate.toDateString()}
            </h5>
          </div>

          {/* Jobs list */}
          {jobsForSelected.length === 0 ? (
            <p className="text-gray-200 pl-2">No jobs scheduled.</p>
          ) : (
            <ul className="space-y-3 mt-2 max-h-64 overflow-y-auto pr-2">
              {jobsForSelected.map((job) => (
                <li
                  key={job.id}
                  className="flex flex-col sm:flex-row justify-between gap-2 border-b border-slate-200 pb-2"
                >
                  <p>
                    <strong>Type:</strong> {job.type}
                  </p>
                  <p>
                    <strong>Priority:</strong> {job.priority}
                  </p>
                  <p>
                    <strong>Status:</strong> {job.status}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Learn More link */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/jobs")} // Or wherever you want to navigate
              className="inline-flex items-center text-blue-500 hover:text-blue-600 cursor-pointer font-semibold"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCalendar;