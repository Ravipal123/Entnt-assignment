import { createContext, useContext, useState, useEffect } from "react";
import { getUsers, getSession, saveSession, clearSession, initializeUsers } from "../utils/localStorageUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initializeUsers();
    const session = getSession();
    if (session) setUser(session);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      saveSession(foundUser);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);