import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import SidebarMenu from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { getRoutesByRole } from '../routes/getRoutesByRole';

const DashboardLayout = () => {
  const {} = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = () => {
    // Menu click is handled by Link navigation in Sidebar
  };

  // Get all routes (admin-only portal, no role checking needed)
  const routes = getRoutesByRole();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <SidebarMenu isCollapsed={isSidebarCollapsed} onMenuClick={handleMenuClick} />
        <Routes>
          {routes}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;

