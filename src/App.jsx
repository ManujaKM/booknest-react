import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminDashboardOverview from './pages/admin/Dashboard.jsx';
import AdminInventory from './pages/admin/Inventory.jsx';
import DeliveryDashboard from './pages/DeliveryDashboard.jsx';
import AdminProfile from './pages/admin/AdminProfile.jsx';
import Orders from './pages/admin/Orders.jsx';
import ShopOwnerApplyPage from './pages/ShopOwnerApplyPage.jsx';
import ShopOwnerRegisterPage from './pages/ShopOwnerRegisterPage.jsx';
import ShopOwnerDashboard from './pages/ShopOwnerDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/shopowner/apply" element={<ShopOwnerApplyPage />} />
      <Route path="/shopowner/register" element={<ShopOwnerRegisterPage />} />

      {/* Protected — Customer */}
      <Route path="/customer/dashboard" element={
        <ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>
      } />

      {/* Protected — Admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="admin"><AdminDashboardOverview /></ProtectedRoute>
      } />
      <Route path="/admin/inventory" element={
        <ProtectedRoute role="admin"><AdminInventory /></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/orders" element={
        <ProtectedRoute role="admin"><Orders /></ProtectedRoute>
      } />
      <Route path="/admin/profile" element={
        <ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>
      } />

      {/* Protected — Delivery */}
      <Route path="/delivery/dashboard" element={
        <ProtectedRoute role="delivery"><DeliveryDashboard /></ProtectedRoute>
      } />

      {/* Protected — Shop Owner */}
      <Route path="/shopowner/dashboard" element={
        <ProtectedRoute role="shopowner"><ShopOwnerDashboard /></ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
