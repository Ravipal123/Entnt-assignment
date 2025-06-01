import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SESSION_KEY } from "../../utils/localStorageUtils";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(SESSION_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="w-full bg-gray-900 shadow sticky top-0 z-20">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:h-16 py-2 sm:py-0 gap-3 sm:gap-0">

          {/* Search Input */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <div className="flex items-center group overflow-hidden rounded-full transition-all duration-300 w-full sm:w-64 shadow-sm border border-white px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="fill-white"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="hidden sm:block bg-transparent w-full px-3 py-1 text-sm text-white outline-none"
              />
            </div>
          </div>

          {/* Notification & Profile */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
            <button
              onClick={() => navigate("/dashboard/notifications")}
              className="relative hover:text-blue-600 transition-colors"
            >
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
            </button>

            {user && (
              <div className="flex flex-col items-center text-xs ">
                <FaUserCircle className="text-white text-3xl" />
                <span className="font-medium text-white mt-1">{user.role}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}