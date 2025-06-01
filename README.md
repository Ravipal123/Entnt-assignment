# 🚢 Ship Maintenance Dashboard

A **React-based dashboard application** for managing ship maintenance tasks, components, and job assignments. This single-page application simulates user authentication, supports dynamic in-app notifications, and stores persistent data using `localStorage`.

### 🔗 Live Demo
👉 [View Live App](https://ship-maintenance-dashboard-seven.vercel.app)

---

## 📦 Features

- 🛠 **Component & Job Management**  
  Add, edit, and delete components and job tasks linked to ships.

- 🧭 **Ship Registry**  
  Manage ship records and associated maintenance data.

- 🔐 **Simulated Authentication**  
  User login and route protection (mocked auth logic).

- 🧠 **In-App Notifications**  
  Dynamic toast notifications on create, update, and delete actions.

- 💾 **Persistent State**  
  Data stored using `localStorage`. No backend required.

- ⚡ **Built with Modern Tools**  
  Developed using **Vite**, **React**, and **Tailwind CSS** for a fast, responsive experience.

---

## 📁 Project Structure

```bash
src/
│
├── components/        # Reusable UI components
├── contexts/          # Global state providers (e.g., Jobs, Auth)
├── pages/             # Route-level components (Dashboard, Login, etc.)
├── utils/             # Utility functions (e.g., localStorage handlers)
├── App.jsx            # Main app entry
├── main.jsx           # Vite app bootstrap
└── index.css          # Tailwind base styles
