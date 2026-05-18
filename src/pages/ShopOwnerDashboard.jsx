import { useEffect, useState } from 'react';
import ShopOwnerMyBooks from '../components/shopowner/ShopOwnerMyBooks.jsx';
import ShopOwnerOrders from '../components/shopowner/ShopOwnerOrders.jsx';
import CustomerTopbar from '../components/customer/CustomerTopbar.jsx';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  BookOpen,
  ShoppingBag,
  Settings,
  LogOut,
  LayoutDashboard,
  HardHat,
  Truck,
  BarChart3,
  Star
} from 'lucide-react';

// ─── Under Construction Banner ────────────────────────────────────────────────
const UnderConstruction = ({ section }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
    {/* Animated construction sign */}
    <div className="relative mb-8">
      <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-purple-500/10 border-2 border-purple-500/30 shadow-xl shadow-purple-500/10 animate-pulse">
        <HardHat size={52} className="text-purple-300" />
      </div>
      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-[10px] font-black text-white animate-bounce">
        !
      </span>
    </div>

    <div className="space-y-3 max-w-md">
      <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 uppercase tracking-wider">
        🚧 Not Included in Demo
      </div>
      <h2 className="text-2xl font-bold text-white">
        {section} is intentionally out of scope
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        This section is not part of the current frontend preview. It remains a placeholder for future feature work such as delivery management, analytics, or settings configuration.
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
            backgroundColor: i % 2 === 0 ? '#7c3aed' : '#1f2937',
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
  <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-white/10 bg-black/20 pt-20 pb-6 px-4 backdrop-blur lg:flex z-40">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-2xl font-semibold text-white">
        {(user?.shopName || 'S')[0].toUpperCase()}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{user?.shopName || 'My Bookshop'}</h3>
      <p className="text-xs text-gray-400">{user?.email}</p>
      <span className="mt-3 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
        Shop Owner
      </span>
    </div>

    <nav className="mt-6 flex flex-1 flex-col gap-2">
      {navItems.map(({ id, label, icon: Icon }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSectionChange(id)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              active
                ? 'border border-purple-500/30 bg-purple-600/20 text-purple-300'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        );
      })}
    </nav>

    <div className="mt-auto space-y-2 text-sm pt-6">
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

// ─── Dashboard Overview ───────────────────────────────────────────────────────
const DashboardOverview = ({ user }) => {
  const navigate = useNavigate();
  const [stats] = useState({
    booksListed: 24,
    totalOrders: 156,
    revenue: 2840.0,
    rating: 4.8,
  });

  const statCards = [
    { label: 'Books Listed', value: stats.booksListed, trend: '+3 this month', icon: BookOpen, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Total Orders', value: stats.totalOrders, trend: '+12 this week', icon: ShoppingBag, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, trend: '+$340 this month', icon: BarChart3, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Rating', value: `${stats.rating} ⭐`, trend: 'Based on 48 reviews', icon: Star, color: 'text-purple-300 bg-purple-500/10' }
  ];

  const recentOrders = [
    { id: '#SO-1041', customer: 'Alice J.', book: 'Atomic Habits', amount: '15.99', status: 'Delivered', date: 'May 15' },
    { id: '#SO-1038', customer: 'Bob S.', book: 'Dune', amount: '18.50', status: 'Processing', date: 'May 14' },
    { id: '#SO-1035', customer: 'Carol W.', book: 'Steve Jobs', amount: '22.50', status: 'Pending', date: 'May 13' },
    { id: '#SO-1032', customer: 'David L.', book: 'The Great Gatsby', amount: '12.00', status: 'Delivered', date: 'May 11' },
    { id: '#SO-1029', customer: 'Eva G.', book: 'Deep Work', amount: '16.50', status: 'Cancelled', date: 'May 10' },
  ];

  const getStatusStyle = (status) => {
    const colors = {
      Delivered: { background: 'rgba(16,185,129,0.15)', color: '#34d399' },
      Processing: { background: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
      Pending: { background: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
      Cancelled: { background: 'rgba(239,68,68,0.12)', color: '#f87171' },
    };
    return colors[status] || colors.Pending;
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-500/30">
            <Store size={28} className="text-purple-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Welcome, {user?.name || 'Shop Owner'}! 👋</h1>
            <p className="text-sm text-gray-400">{user?.shopName || 'Your Bookshop'}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-white/20 transition">
            <div className={`mb-3 inline-flex rounded-xl p-2.5 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            <p style={{ fontSize: '11px', color: '#8a8fa8', marginTop: '4px' }}>{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:border-white/20 transition">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Recent Orders</h3>
          <span
            onClick={() => navigate('/shopowner/orders')}
            style={{ fontSize: '12px', color: '#7c3aed', cursor: 'pointer' }}
          >
            View All →
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-500">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Book</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-white/5">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.book}</td>
                  <td className="py-2">${order.amount}</td>
                  <td className="py-2">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={getStatusStyle(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const ShopOwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications] = useState(3);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
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
        return <ShopOwnerMyBooks user={user} />;
      case 'orders':
        return <ShopOwnerOrders user={user} />;
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
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <ShopOwnerSidebar
        user={user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      <CustomerTopbar
        user={user}
        notifications={notifications}
        showNotifDropdown={showNotifDropdown}
        showAvatarDropdown={showAvatarDropdown}
        onToggleNotifications={() => setShowNotifDropdown((prev) => !prev)}
        onToggleAvatar={() => setShowAvatarDropdown((prev) => !prev)}
        onSignOut={handleLogout}
        showSearch={false}
        onNavigate={(section) => {
          if (section === 'profile') setActiveSection('settings');
        }}
        onOpenSettings={() => setActiveSection('settings')}
      />

      <main className="relative z-10 pt-20 lg:pl-64">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          {renderSection()}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur lg:hidden">
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
                <Icon size={20} className={active ? 'text-purple-400' : 'text-gray-500'} />
                <span className={`text-[10px] font-medium ${active ? 'text-purple-300' : 'text-gray-600'}`}>{label}</span>
                {active && <span className="h-1 w-1 rounded-full bg-purple-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
