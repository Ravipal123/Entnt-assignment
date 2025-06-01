import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { useAuth } from "./contexts/AuthContext";
import ShipsPage from "./pages/ShipsPage.jsx";
import ShipDetailPage from "./pages/ShipDetailPage.jsx";
import ShipForm from "./components/Ships/ShipForm.jsx";
import ComponentsPage from "./pages/ComponentsPage";
import ComponentForm from "./components/Components/ComponentForm";
import ComponentDetail from "./components/Components/ComponentDetail";
import JobsPage from "./pages/JobsPage.jsx";
import JobCalendar from "./components/Jobs/JobCalendar";
import DashboardHome from "./pages/DashboardHome"; 
import NotificationCenter from "./components/Notifications/NotificationCenter.jsx";


export default function App() {
  const { user } = useAuth();

  return (
    
    
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage/>}>
              <Route index element={<DashboardHome />} />
              <Route path="ships" element={<ShipsPage />} />
              <Route path="components" element={<ComponentsPage />} />
              <Route path="ships/new" element={<ShipForm />} />
              <Route path="ships/edit/:id" element={<ShipForm />} />
              <Route path="ships/:id" element={<ShipDetailPage />} />
              <Route path="components/new" element={<ComponentForm />} />
              <Route path="components/edit/:id" element={<ComponentForm />} />
              <Route path="components/:id" element={<ComponentDetail />} />
              <Route path="jobs" element={<JobsPage/>} /> 
              <Route path="calendar" element={<JobCalendar />} />
              <Route path="notifications" element={<NotificationCenter />} />
           </Route>
        
       </Routes>
   
  );
}