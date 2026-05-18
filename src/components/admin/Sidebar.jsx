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
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-black/20 pt-20 pb-6 px-4 backdrop-blur lg:flex">

      <div
        className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center"
        onClick={() => navigate('/admin/profile')}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            navigate('/admin/profile');
          }
        }}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-2xl font-semibold text-white">
          {initials}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">{admin?.name || 'Admin User'}</h3>
        <p className="text-xs text-gray-400">{admin?.email || 'admin@booknest.com'}</p>
        <span className="mt-3 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
          Admin
        </span>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive
              ? 'border border-purple-500/30 bg-purple-600/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`ti ${item.icon}`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 space-y-2 text-sm">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-white/5 hover:text-red-300"
        >
          <i className="ti ti-logout" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
