import { useNavigate } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";

export default function ShipList() {
  const { ships, deleteShip } = useShips();
  const navigate = useNavigate();

  return (  
    <div className="p-8  min-h-screen bg-[#2a2a2a] ">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-200">
        Ships
      </h2>

      <div className="flex justify-end mb-6  ">
        
        <button class="group relative h-12 rounded-full font-semibold bg-gradient-to-r from-green-500 to-green-800 px-4 text-white shadow cursor-pointer shadow-white " onClick={() => navigate("/dashboard/ships/new")} >
          <span class="relative inline-flex overflow-hidden">
            <div class="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[120%] group-hover:skew-y-10">
              Add Ship
            </div>
            <div class="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
              Add Ship
            </div>
          </span>
        </button>
      </div>

      <div className="grid gap-10 md:grid-cols-2  lg:grid-cols-3">
        {ships.map((ship) => (
          <div
            key={ship.id}
            className="relative p-10 w-80 pb-2 bg-black shadow-black rounded-xl shadow bg-cover bg-center brightness-100 text-white transition-transform transform duration-700 hover:scale-105 "          >
            <div className="relative ">
              <h3 className="font-bold text-xl">{ship.name}</h3>
              <p className="text-sm">IMO: {ship.imo}</p>
              <p className="text-sm">Flag: {ship.flag}</p>
              <p className="text-sm">Status: {ship.status}</p>

              <div className="flex gap-2 mt-3  ">
                <button
                  onClick={() => navigate(`/dashboard/ships/edit/${ship.id}`)}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 cursor-pointer hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  hover:bg-blue-700 hover:scale-105 transition-transform"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteShip(ship.id)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 cursor-pointer hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-red-700 hover:scale-105 transition-transform"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/dashboard/ships/${ship.id}`)}
                  className="text-white bg-gradient-to-r from-gray-400 via-gray-400 to-gray-500 cursor-pointer hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-gray-800 hover:scale-105 transition-transform"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}