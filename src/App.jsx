import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DeliveryDashboard from './pages/DeliveryDashboard.jsx';
import ShopOwnerApplyPage from './pages/ShopOwnerApplyPage.jsx';
import ShopOwnerRegisterPage from './pages/ShopOwnerRegisterPage.jsx';
import ShopOwnerDashboard from './pages/ShopOwnerDashboard.jsx';

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
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
      <Route path="/shopowner/apply" element={<ShopOwnerApplyPage />} />
      <Route path="/shopowner/register" element={<ShopOwnerRegisterPage />} />
      <Route path="/shopowner/dashboard" element={<ShopOwnerDashboard />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default App;
