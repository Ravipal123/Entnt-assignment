import { useParams } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";

export default function ShipDetail() {
  const { ships } = useShips();
  const { id } = useParams();

  const ship = ships.find((s) => s.id === id);

  if (!ship)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2a2a2a]">
        <p className="p-4 text-lg font-semibold bg-black text-red-600 rounded-lg shadow-md">
          🚢 Ship not found
        </p>
      </div>
    );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#2a2a2a] px-4"
    
    >
      <div className="max-w-lg w-full bg-black shadow-black  bg-opacity-80 rounded-lg shadow-lg backdrop-blur-md p-6" >
        <h2 className="text-3xl font-bold lg-6 text-gray-200">{ship.name} Details</h2>
        <p className="text-lg text-gray-300"><strong>IMO:</strong> {ship.imo}</p>
        <p className="text-lg text-gray-300"><strong>Flag:</strong> {ship.flag}</p>
        <p className="text-lg text-gray-300"><strong>Status:</strong> {ship.status}</p>
      </div>
    </div>
  );
}