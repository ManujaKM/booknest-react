import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import DeliveryDashboard from './pages/DeliveryDashboard.jsx';

const AdminDashboard = () => (
  <div className="min-h-screen bg-[#0d0d1a] text-white flex items-center justify-center text-2xl">
    Admin Dashboard — Coming Soon 🚧
  </div>
);

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
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default App;
