import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { getSession } from "../../utils/localStorageUtils";
import { canEditJobs } from "../../utils/roleUtils";

const JobForm = () => {
  const { addJob } = useJobs();
  const { components } = useComponents();

  const user = getSession();
  const canEdit = user && canEditJobs(user.role);

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

  if (!canEdit) {
    return (
      <div className="p-4 text-red-600 font-semibold">
        You do not have permission to create maintenance jobs.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded space-y-2 max-w-sm mx-auto bg-[#2a2a2a]"
    >
      <h2 className="text-lg font-bold">Add Maintenance Job</h2>
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="componentId"
        value={form.componentId}
        onChange={handleComponentChange}
        required
      >
        <option value="">Select Component</option>
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
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="w-full border p-2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <input
        type="date"
        name="scheduledDate"
        value={form.scheduledDate}
        onChange={handleChange}
        className="w-full border p-2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <button
        type="submit"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  hover:bg-blue-700 hover:scale-105 transition-transform"
      >
        Create Job
      </button>
    </form>
  );
};

export default JobForm;