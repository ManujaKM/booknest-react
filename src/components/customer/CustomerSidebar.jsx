import {
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'profile', label: 'Profile', icon: User }
];

const CustomerSidebar = ({ user, activeSection, onSectionChange, onLogout }) => {
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'R';

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-black/20 pt-20 pb-6 px-4 backdrop-blur lg:flex">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-2xl font-semibold text-white">
          {initial}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">{user?.name || 'Riley'}</h3>
        <p className="text-xs text-gray-400">{user?.email || 'riley@example.com'}</p>
        <span className="mt-3 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
          Customer
        </span>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-300">
          <div className="rounded-xl bg-white/5 px-2 py-2">📚 24 Books</div>
          <div className="rounded-xl bg-white/5 px-2 py-2">❤️ 12 Wishlist</div>
          <div className="rounded-xl bg-white/5 px-2 py-2">👥 8 Friends</div>
        </div>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive
                ? 'border border-purple-500/30 bg-purple-600/20 text-purple-300'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-6 space-y-2 text-sm">
        <button
          type="button"
          onClick={() => onSectionChange('settings')}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${activeSection === 'settings'
            ? 'border border-purple-500/30 bg-purple-600/20 text-purple-300'
            : 'text-gray-500 hover:bg-white/5 hover:text-white'
            }`}
        >
          <Settings size={18} />
          Settings
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-white/5 hover:text-red-300"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
