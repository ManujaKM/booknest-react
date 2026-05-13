import { Bell, ChevronDown, LogOut, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const admin = {
    name: 'Admin User',
    email: 'admin@booknest.com'
  };
  const initials = admin.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#2a2d42] bg-[#0d0f1a] px-6">
      <div className="flex items-center gap-3 text-[#e2e4f0]">
        <h1 className="text-lg font-semibold">Admin Console</h1>
        <span className="rounded-full border border-[#2a2d42] bg-[#1a1d2e] px-3 py-1 text-xs text-[#8a8fa8]">
          BookNest
        </span>
      </div>

      <div className="hidden w-full max-w-md items-center gap-2 rounded-full border border-[#2a2d42] bg-[#1a1d2e] px-4 py-2 text-sm text-[#8a8fa8] md:flex">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search inventory, orders, users..."
          className="w-full bg-transparent text-sm text-[#e2e4f0] outline-none placeholder:text-[#8a8fa8]"
        />
      </div>

      <div className="relative flex items-center gap-3">
        <button type="button" className="relative rounded-full bg-[#1a1d2e] p-2 text-[#8a8fa8]">
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#f87171] px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-[#1a1d2e] px-2 py-1 text-sm text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7c3aed] text-xs font-semibold">
            {initials}
          </span>
          <span className="hidden text-sm text-[#e2e4f0] md:inline">{admin.name}</span>
          <ChevronDown size={14} className="text-[#8a8fa8]" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-[#2a2d42] bg-[#12141f] p-2 shadow-xl">
            <div className="px-3 py-2">
              <p className="text-sm text-white">{admin.name}</p>
              <p className="text-xs text-[#8a8fa8]">{admin.email}</p>
            </div>
            <div className="my-2 h-px bg-[#2a2d42]" />
            <Link
              to="/admin/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#e2e4f0] transition hover:bg-[#1a1d2e]"
              onClick={() => setMenuOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#f87171] transition hover:bg-[#1a1d2e]"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
