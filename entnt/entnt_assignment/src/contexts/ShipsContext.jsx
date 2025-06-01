import { createContext, useContext, useState, useEffect } from "react";

const ShipsContext = createContext();
const SHIPS_KEY = "ships";

const sampleShips = [
  { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
  { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
];

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(SHIPS_KEY));
    if (saved?.length) {
      setShips(saved);
    } else {
      localStorage.setItem(SHIPS_KEY, JSON.stringify(sampleShips));
      setShips(sampleShips);
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem(SHIPS_KEY, JSON.stringify(data));
    setShips(data);
  };

  const addShip = (ship) => {
    const newShips = [...ships, ship];
    saveToStorage(newShips);
  };

  const updateShip = (updatedShip) => {
    const newShips = ships.map(s => s.id === updatedShip.id ? updatedShip : s);
    saveToStorage(newShips);
  };

  const deleteShip = (id) => {
    const newShips = ships.filter(s => s.id !== id);
    saveToStorage(newShips);
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);