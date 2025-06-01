//User and Session Keys
export const USER_KEY = "users";
export const SESSION_KEY = "session";

//Default User
const DefaultUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
  { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
];

//Initialize default users in localStorage
export const initializeUsers = () =>{
    const users = localStorage.getItem(USER_KEY);
    if(!users){
        localStorage.setItem(USER_KEY, JSON.stringify(DefaultUsers));
    }
};

//get users from localstorage
export const getUsers = () => {
    const users = localStorage.getItem(USER_KEY);
    return users ? JSON.parse(users) : [];
};

//save logged in user to session storage
export const saveSession = (user) => {
    const session = localStorage.getItem(SESSION_KEY);
    if(session) {
        const sessions = JSON.parse(session);
        sessions.push(user);
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
    }
};

//get session from localstorage
export const getSession = () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : [];
};

//clear session storage
export const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
};


export const NOTIFICATIONS_KEY = "notifications";

// Get notifications from localStorage
export const getNotifications = () => {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  return data ? JSON.parse(data) : [];
};

// Add a new notification
export const addNotification = (type, message) => {
  const notifications = getNotifications();
  const newNotification = {
    id: Date.now().toString(),
    type, // e.g., "created", "updated", "completed"
    message,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([newNotification, ...notifications]));
};

// Remove notification by id
export const removeNotification = (id) => {
  const notifications = getNotifications();
  const updated = notifications.filter((n) => n.id !== id);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
};