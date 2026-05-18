import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopbar from '../customer/CustomerTopbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const Topbar = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [notifications] = useState(3);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  return (
    <CustomerTopbar
      user={admin || { name: 'Admin User', email: 'admin@booknest.com', role: 'admin' }}
      notifications={notifications}
      showNotifDropdown={showNotifDropdown}
      showAvatarDropdown={showAvatarDropdown}
      onToggleNotifications={() => setShowNotifDropdown((prev) => !prev)}
      onToggleAvatar={() => setShowAvatarDropdown((prev) => !prev)}
      onSignOut={logout}
      showSearch={false}
      onNavigate={(section) => {
        if (section === 'profile') navigate('/admin/profile');
      }}
      onOpenSettings={() => navigate('/admin/profile')}
    />
  );
};

export default Topbar;
