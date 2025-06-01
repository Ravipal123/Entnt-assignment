import { useParams } from "react-router-dom";
import { useComponents } from "../../contexts/ComponentsContext";

export default function ComponentDetail() {
  const { id } = useParams();
  const { components } = useComponents();
  const comp = components.find((c) => c.id === id);

  if (!comp)
    return (
      <p className="p-4 text-center text-red-600 text-lg font-semibold animate-fade-in">
        Component not found
      </p>
    );

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-[#2a2a2a] px-4"
      
    >
      <div className="bg-black bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-md animate-slide-up">
        <h2 className="text-3xl font-bold text-gray-300 mb-6 text-center">
          {comp.name}
        </h2>
        <div className="space-y-4 text-white">
          <p>
            <strong className="text-white">Serial Number:</strong>{" "}
            {comp.serialNumber}
          </p>
          <p>
            <strong className="text-white">Ship ID:</strong> {comp.shipId}
          </p>
          <p>
            <strong className="text-white">Install Date:</strong>{" "}
            {comp.installDate}
          </p>
          <p>
            <strong className="text-white">Last Maintenance:</strong>{" "}
            {comp.lastMaintenanceDate}
          </p>
        </div>
      </div>
    </div>
  );
}