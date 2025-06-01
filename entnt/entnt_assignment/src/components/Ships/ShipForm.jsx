import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";
import { v4 as uuidv4 } from "uuid";

export default function ShipForm() {
  const { ships, addShip, updateShip } = useShips();
  const navigate = useNavigate();
  const { id } = useParams();

  const editing = Boolean(id);
  const existing = ships.find((s) => s.id === id);

  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (editing && existing) setForm(existing);
  }, [editing, existing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateShip(form);
    } else {
      addShip({ ...form, id: uuidv4() });
    }
    navigate("/dashboard/ships");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-[#2a2a2a]"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full p-6 bg-black bg-opacity-80 rounded-lg shadow-black shadow-2xl backdrop-blur-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">
          {editing ? "Edit Ship" : "Add New Ship"}
        </h2>

        {["name", "imo", "flag"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.toUpperCase()}
            className="w-full mb-4 p-3 border border-gray-300 text-white rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 text-gray-300  rounded-xl focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active" className="bg-black">Active</option>
          <option value="Under Maintenance" className="bg-black">Under Maintenance</option>
          <option value="Inactive" className="bg-black">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition-transform transform hover:scale-105"
            
        >
          {editing ? "Update" : "Add"}
          
        </button>
      </form>
    </div>
  );
}