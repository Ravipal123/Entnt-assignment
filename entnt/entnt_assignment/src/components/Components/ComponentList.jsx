
import { useNavigate } from "react-router-dom";
import { useComponents } from "../../contexts/ComponentsContext";

export default function ComponentList() {
  const { components, deleteComponent } = useComponents();
  const navigate = useNavigate();

  return (
    <div className="bg-[#2a2a2a] min-h-screen px-4 py-8 sm:px-6 md:px-10 w-full text-gray-300">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center animate-fade-in">
        Component Management
      </h2>

      <div className="flex justify-center sm:justify-end mb-6">
        <button
          className="group relative h-12 rounded-full  bg-gradient-to-r from-green-500 to-green-800 text-white px-6 font-semibold shadow cursor-pointer shadow-white transition-transform transform hover:scale-110"
          onClick={() => navigate("/dashboard/components/new")}
        >
          <span className="relative inline-flex overflow-hidden">
            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[120%] group-hover:skew-y-9">
              Add Components
            </div>
            <div className="absolute translate-y-[120%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
              Add Components
            </div>
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {components.map((comp) => (
          <div
            key={comp.id}
            className="bg-black border border-gray-300 bg-cover p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 animate-slide-up"
          >
            <p className="text-lg font-bold text-white">{comp.name}</p>
            <p className="text-white">Serial : {comp.serialNumber}</p>
            <p className="text-white">Ship ID : {comp.shipId}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => navigate(`/dashboard/components/${comp.id}`)}
                className="text-white bg-gradient-to-r from-gray-400 via-gray-400 to-gray-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 transition-transform"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/dashboard/components/edit/${comp.id}`)}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 transition-transform"
              >
                Edit
              </button>
              <button
                onClick={() => deleteComponent(comp.id)}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 transition-transform"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}