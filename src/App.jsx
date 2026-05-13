import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminDashboardOverview from './pages/admin/Dashboard.jsx';
import AdminInventory from './pages/admin/Inventory.jsx';
import DeliveryDashboard from './pages/DeliveryDashboard.jsx';
import AdminProfile from './pages/admin/AdminProfile.jsx';
import Orders from './pages/admin/Orders.jsx';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove('page-fade-out');
    document.body.classList.add('page-fade-in');
    const timer = setTimeout(() => document.body.classList.remove('page-fade-in'), 250);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboardOverview />} />
      <Route path="/admin/inventory" element={<AdminInventory />} />
      <Route path="/admin/users" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
      <Route path="/shopowner/apply" element={<ShopOwnerApplyPage />} />
      <Route path="/shopowner/register" element={<ShopOwnerRegisterPage />} />
      <Route path="/shopowner/dashboard" element={<ShopOwnerDashboard />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default App;
