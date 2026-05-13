import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', to: '/admin/inventory', icon: BookOpen },
  { label: 'User Management', to: '/admin/users', icon: Users },
  { label: 'Orders', to: '/admin/orders', icon: ClipboardList },
  { label: 'Reports', to: '/admin/reports', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] border-r border-[#2a2d42] bg-[#12141f] text-[#e2e4f0]">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7c3aed] text-white">
          <span className="text-lg font-semibold">B</span>
        </div>
        <span className="text-base font-semibold">BookNest</span>
      </div>

      <nav className="mt-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition ${isActive
                ? 'bg-[#1e1b3a] text-white border-l-[3px] border-[#7c3aed]'
                : 'text-[#8a8fa8] hover:text-white hover:bg-[#1a1d2e]'
                }`}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
