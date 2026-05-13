import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Sidebar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const initials = admin?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AU';

  const navItems = [
    { to: '/admin/dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard' },
    { to: '/admin/inventory', icon: 'ti-packages', label: 'Inventory' },
    { to: '/admin/users', icon: 'ti-users', label: 'User Management' },
    { to: '/admin/orders', icon: 'ti-shopping-cart', label: 'Orders' },
    { to: '/admin/profile', icon: 'ti-user-circle', label: 'My Profile' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="ti ti-book-2" />
        </div>
        <div>
          <div className="logo-text">BookNest</div>
          <div className="logo-sub">Admin</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <i className={`ti ${item.icon}`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div
          className="admin-mini-card"
          onClick={() => navigate('/admin/profile')}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              navigate('/admin/profile');
            }
          }}
        >
          <div className="admin-avatar">{initials}</div>
          <div>
            <div className="admin-name">{admin?.name || 'Admin User'}</div>
            <div className="admin-role">{admin?.role || 'Super Admin'}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={logout}>
          <i className="ti ti-logout" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
