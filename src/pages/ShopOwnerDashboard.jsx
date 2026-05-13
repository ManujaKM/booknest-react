import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  BookOpen,
  ShoppingBag,
  Settings,
  LogOut,
  LayoutDashboard,
  HardHat,
  Bell,
  ChevronDown,
  Truck,
  BarChart3,
  Star
} from 'lucide-react';

// ─── Under Construction Banner ────────────────────────────────────────────────
const UnderConstruction = ({ section }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
    {/* Animated construction sign */}
    <div className="relative mb-8">
      <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 shadow-xl shadow-amber-500/10 animate-pulse">
        <HardHat size={52} className="text-amber-400" />
      </div>
      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black animate-bounce">
        !
      </span>
    </div>

    <div className="space-y-3 max-w-md">
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-wider">
        🚧 Under Construction
      </div>
      <h2 className="text-2xl font-bold text-white">
        {section} is coming soon
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        This feature is actively being built and will be available shortly.
      </p>
    </div>

    {/* Credit note */}
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur text-center">
      <p className="text-xs text-gray-500 mb-1">Designed & developed by</p>
      <p className="text-lg font-bold text-purple-300 tracking-wide">✨ Tharushi</p>
    </div>

    {/* Decorative dashes */}
    <div className="mt-8 flex items-center gap-1.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-8 rounded-full"
          style={{
            backgroundColor: i % 2 === 0 ? '#f59e0b' : '#1f2937',
            opacity: 0.7
          }}
        />
      ))}
    </div>
  </div>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'mybooks', label: 'My Books', icon: BookOpen },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const ShopOwnerSidebar = ({ user, activeSection, onSectionChange, onLogout }) => (
  <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-[#0f0f1f] lg:flex z-40">
    {/* Logo */}
    <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30">
        <Store size={20} className="text-amber-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">BookNest</p>
        <p className="text-xs text-amber-400 font-medium">Shop Owner</p>
      </div>
    </div>

    {/* Shop info */}
    <div className="mx-4 mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-gray-500 mb-1">Your Shop</p>
      <p className="font-semibold text-white text-sm truncate">{user?.shopName || 'My Bookshop'}</p>
      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
    </div>

    {/* Nav */}
    <nav className="mt-6 flex-1 space-y-1 px-4">
      {navItems.map(({ id, label, icon: Icon }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSectionChange(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              active
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        );
      })}
    </nav>

    {/* Logout */}
    <div className="border-t border-white/10 p-4">
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  </aside>
);

// ─── Topbar ───────────────────────────────────────────────────────────────────
const ShopOwnerTopbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0d0d1a]/80 px-6 backdrop-blur-md lg:left-64">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 lg:hidden">
          <Store size={16} className="text-amber-400" />
        </div>
        <span className="text-sm font-semibold text-white lg:hidden">Shop Owner</span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
        </button>

        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/30 text-amber-300 font-bold text-xs">
            {(user?.name || 'S')[0].toUpperCase()}
          </div>
          <span className="hidden sm:block max-w-[120px] truncate">{user?.name || 'Shop Owner'}</span>
          <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />

          {open && (
            <div className="absolute right-0 top-12 w-48 rounded-xl border border-white/10 bg-[#131325] p-2 shadow-2xl">
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

// ─── Dashboard Overview ───────────────────────────────────────────────────────
const DashboardOverview = ({ user }) => {
  const stats = [
    { label: 'Books Listed', value: '0', icon: BookOpen, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Total Orders', value: '0', icon: ShoppingBag, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Revenue', value: '$0.00', icon: BarChart3, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Rating', value: '—', icon: Star, color: 'text-amber-400 bg-amber-500/10' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-purple-600/10 p-8 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30">
            <Store size={28} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Welcome, {user?.name || 'Shop Owner'}! 👋</h1>
            <p className="text-sm text-gray-400">{user?.shopName || 'Your Bookshop'}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-white/20 transition">
            <div className={`mb-3 inline-flex rounded-xl p-2.5 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <UnderConstruction section="Dashboard Analytics" />
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const ShopOwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('bn_user');
    if (!stored) {
      navigate('/login');
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.role !== 'shopowner') {
        navigate(`/${parsed.role}/dashboard`);
        return;
      }
      setUser(parsed);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bn_user');
    navigate('/login');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview user={user} />;
      case 'mybooks':
        return (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">My Books</h1>
              <p className="text-sm text-gray-400 mt-1">Manage your book listings</p>
            </div>
            <UnderConstruction section="Book Management" />
          </>
        );
      case 'orders':
        return (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Orders</h1>
              <p className="text-sm text-gray-400 mt-1">Track and manage customer orders</p>
            </div>
            <UnderConstruction section="Order Management" />
          </>
        );
      case 'delivery':
        return (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Delivery</h1>
              <p className="text-sm text-gray-400 mt-1">Configure your delivery preferences</p>
            </div>
            <UnderConstruction section="Delivery Management" />
          </>
        );
      case 'analytics':
        return (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Analytics</h1>
              <p className="text-sm text-gray-400 mt-1">Sales and performance insights</p>
            </div>
            <UnderConstruction section="Analytics" />
          </>
        );
      case 'settings':
        return (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-sm text-gray-400 mt-1">Manage your shop profile and preferences</p>
            </div>
            <UnderConstruction section="Shop Settings" />
          </>
        );
      default:
        return <DashboardOverview user={user} />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Inter']">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <ShopOwnerSidebar
        user={user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      <ShopOwnerTopbar user={user} onLogout={handleLogout} />

      <main className="relative z-10 pt-16 lg:pl-64">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          {renderSection()}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/50 backdrop-blur lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map(({ id, label, icon: Icon }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className="flex flex-col items-center gap-1 px-3 py-1"
              >
                <Icon size={20} className={active ? 'text-amber-400' : 'text-gray-500'} />
                <span className={`text-[10px] font-medium ${active ? 'text-amber-300' : 'text-gray-600'}`}>{label}</span>
                {active && <span className="h-1 w-1 rounded-full bg-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
