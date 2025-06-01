import { createContext, useContext, useEffect, useState } from "react";

const ComponentsContext = createContext();
const COMPONENTS_KEY = "components";

const sampleComponents = [
  {
    id: "comp1",
    name: "Engine Filter",
    shipId: "s1",
    serialNumber: "EF1234",
    installDate: "2024-01-10",
    lastMaintenanceDate: "2024-04-10", // adjust date so some overdue
  },
  {
    id: "comp2",
    name: "Radar System",
    shipId: "s2",
    serialNumber: "RS5678",
    installDate: "2023-12-05",
    lastMaintenanceDate: "2024-05-01",
  },
];

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(COMPONENTS_KEY);
    if (stored) {
      setComponents(JSON.parse(stored));
    } else {
      localStorage.setItem(COMPONENTS_KEY, JSON.stringify(sampleComponents));
      setComponents(sampleComponents);
    }
  }, []);

  const save = (data) => {
    localStorage.setItem(COMPONENTS_KEY, JSON.stringify(data));
    setComponents(data);
  };

  const addComponent = (comp) => save([...components, comp]);
  const updateComponent = (updated) =>
    save(components.map(c => c.id === updated.id ? updated : c));
  const deleteComponent = (id) =>
    save(components.filter(c => c.id !== id));

  return (
    <ComponentsContext.Provider value={{ components, addComponent, updateComponent, deleteComponent }}>
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);