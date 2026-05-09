import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  User, 
  LogOut, 
  Navigation,
  Phone,
  BookOpen
} from 'lucide-react';

const MOCK_DELIVERIES = [
  {
    id: 'ORD-7721',
    customer: 'Alex Johnson',
    address: '123 Baker St, London',
    items: ['The Great Gatsby', 'Sapiens'],
    status: 'pending',
    time: '20 mins ago',
    amount: 38.50
  },
  {
    id: 'ORD-8812',
    customer: 'Sarah Smith',
    address: '45 High Street, Manchester',
    items: ['Atomic Habits'],
    status: 'picked_up',
    time: '1 hour ago',
    amount: 15.99
  },
  {
    id: 'ORD-9905',
    customer: 'Michael Brown',
    address: '78 Queen Road, Birmingham',
    items: ['Deep Work', 'Dune'],
    status: 'delivered',
    time: '3 hours ago',
    amount: 42.00
  }
];

const DeliveryDashboard = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);

  const updateStatus = (id, newStatus) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const stats = [
    { label: 'Total Earnings', value: '$420.50', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Completed', value: '12', icon: CheckCircle, color: 'text-blue-400' },
    { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Inter']">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/10 bg-[#131325] lg:block">
        <div className="flex h-20 items-center gap-3 px-8 border-b border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-500/20">
            <Package size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">BookNest <span className="text-xs text-purple-400 font-normal">Delivery</span></span>
        </div>
        
        <nav className="mt-8 space-y-2 px-4">
          <button className="flex w-full items-center gap-3 rounded-xl bg-purple-600/10 px-4 py-3 text-sm font-medium text-purple-400">
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white">
            <Clock size={20} />
            History
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white">
            <User size={20} />
            Profile
          </button>
        </nav>

        <div className="absolute bottom-8 w-full px-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64">
        {/* Topbar */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0d0d1a]/80 px-8 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-xl font-bold">Delivery Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">David Miller</p>
              <p className="text-xs text-gray-400 text-purple-400">ID: DRV-9921</p>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-purple-500/30 bg-purple-600/20 flex items-center justify-center">
              <User size={20} className="text-purple-400" />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-2xl bg-white/5 p-3 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Active Deliveries</h2>
              <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
                <button 
                  onClick={() => setActiveTab('active')}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${activeTab === 'active' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setActiveTab('completed')}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${activeTab === 'completed' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {deliveries
                .filter(d => activeTab === 'active' ? d.status !== 'delivered' : d.status === 'delivered')
                .map((delivery) => (
                <div key={delivery.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-purple-500/30 group">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/20">
                        <Package size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{delivery.id}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-600" />
                          <span className="text-xs text-gray-400">{delivery.time}</span>
                        </div>
                        <h3 className="mt-1 text-lg font-bold">{delivery.customer}</h3>
                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                          <MapPin size={14} className="text-purple-400" />
                          {delivery.address}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-xl font-bold text-emerald-400">${delivery.amount.toFixed(2)}</p>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                        delivery.status === 'pending' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                        delivery.status === 'picked_up' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' :
                        'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {delivery.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        {delivery.items.length} Books
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10">
                        <Phone size={16} />
                        Call
                      </button>
                      <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10">
                        <Navigation size={16} />
                        Map
                      </button>
                      {delivery.status === 'pending' && (
                        <button 
                          onClick={() => updateStatus(delivery.id, 'picked_up')}
                          className="rounded-xl bg-purple-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-500"
                        >
                          Confirm Pickup
                        </button>
                      )}
                      {delivery.status === 'picked_up' && (
                        <button 
                          onClick={() => updateStatus(delivery.id, 'delivered')}
                          className="rounded-xl bg-emerald-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const LayoutDashboard = ({ size }) => <LayoutDashboardIcon size={size} />;
const LayoutDashboardIcon = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

export default DeliveryDashboard;
