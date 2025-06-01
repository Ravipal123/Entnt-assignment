import { useEffect, useState } from "react";
import { getNotifications, removeNotification } from "../../utils/localStorageUtils";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const handleDismiss = (id) => {
    removeNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="border p-3 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{n.type}</p>
                <p className="text-sm text-gray-600">{n.message}</p>
              </div>
              <button
                onClick={() => handleDismiss(n.id)}
                className="text-red-500 hover:text-red-700"
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}