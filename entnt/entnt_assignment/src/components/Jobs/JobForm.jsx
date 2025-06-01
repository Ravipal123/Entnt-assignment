import { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { getSession } from "../../utils/localStorageUtils";
import { canEditJobs } from "../../utils/roleUtils";

const JobForm = () => {
  const { addJob } = useJobs();
  const { components } = useComponents();

  const user = getSession();
  const canEdit = user && canEditJobs(user.role?.toLowerCase?.());

  console.log("Session User:", user);
  console.log("User Role:", user?.role);
  console.log("Can Edit Jobs:", canEdit);

  const [form, setForm] = useState({
    componentId: "",
    shipId: "",
    type: "",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleComponentChange = (e) => {
    const componentId = e.target.value;
    const selectedComponent = components.find((c) => c.id === componentId);
    setForm((prev) => ({
      ...prev,
      componentId,
      shipId: selectedComponent?.shipId || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.componentId || !form.assignedEngineerId || !form.scheduledDate) {
      alert("Please fill all required fields");
      return;
    }
    addJob(form);
    setForm({
      componentId: "",
      shipId: "",
      type: "",
      priority: "Medium",
      status: "Open",
      assignedEngineerId: "",
      scheduledDate: "",
    });
  };

//   if (!canEdit) {
//     return (
//       <div className="p-4 text-red-600 font-semibold">
//         You do not have permission to create maintenance jobs.
//       </div>
//     );
//   }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto rounded-2xl border border-gray-200 space-y-2 mx-auto bg-black p-4"
    >
      <h2 className="text-lg font-bold text-white">Add Maintenance Job</h2>

      <select
        name="componentId"
        value={form.componentId}
        onChange={handleComponentChange}
        required
        className="bg-black border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="" className="bg-black">Select Component</option>
        {components.map((comp) => (
          <option key={comp.id} value={comp.id}>
            {comp.name} ({comp.serialNumber})
          </option>
        ))}
      </select>

      <input
        type="text"
        name="type"
        placeholder="Job Type (e.g., Inspection)"
        value={form.type}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        required
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="text"
        name="assignedEngineerId"
        placeholder="Engineer ID (e.g., 3)"
        value={form.assignedEngineerId}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        required
      />

      <input
        type="date"
        name="scheduledDate"
        value={form.scheduledDate}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        required
      />

      <button
        type="submit"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 cursor-pointer hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform hover:scale-105"
      >
        Create Job
      </button>
    </form>
  );
};

export default JobForm;
