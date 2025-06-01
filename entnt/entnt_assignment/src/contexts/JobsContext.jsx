import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addNotification } from "../utils/localStorageUtils";

const JobsContext = createContext();
const JOBS_KEY = "jobs";

const sampleJobs = [
  {
    id: uuidv4(),
    shipId: "s1",
    status: "in-progress",
    priority: "High",
    description: "Engine repair",
  },
  {
    id: uuidv4(),
    shipId: "s2",
    status: "completed",
    priority: "Low",
    description: "Radar calibration",
  },
];

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(JOBS_KEY);
    if (stored) {
      setJobs(JSON.parse(stored));
    } else {
      localStorage.setItem(JOBS_KEY, JSON.stringify(sampleJobs));
      setJobs(sampleJobs);
    }
  }, []);

  const save = (updated) => {
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    setJobs(updated);
  };

  const addJob = (job) => {
    const newJob = { ...job, id: uuidv4() };
    save([...jobs, newJob]);
    addNotification("Job Created", `Job ${newJob.id} has been created.`);
  };

  const updateJobStatus = (jobId, newStatus) => {
    const updatedJobs = jobs.map((j) =>
      j.id === jobId ? { ...j, status: newStatus } : j
    );
    save(updatedJobs);

    if (newStatus.toLowerCase() === "completed") {
      addNotification("Job Completed", `Job ${jobId} has been completed.`);
    } else {
      addNotification("Job Updated", `Job ${jobId} updated to ${newStatus}.`);
    }
  };

  const filterJobs = (shipId, status, priority) => {
    return jobs.filter((job) => {
      return (
        (!shipId || job.shipId === shipId) &&
        (!status || job.status === status) &&
        (!priority || job.priority === priority)
      );
    });
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJobStatus, filterJobs }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);