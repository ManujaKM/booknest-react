import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, updateOrder, STORE_EVENT } from '../store/bookStore.js';
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
  BookOpen,
  Store,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// ─── Leaflet (OpenStreetMap) ─────────────────────────────────────────────────
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons broken by webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom coloured markers
const shopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const customerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Auto-fit map bounds to show both markers
// positions must be stable (useMemo at call-site) to avoid infinite effect loop
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [map, bounds]);
  return null;
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_DELIVERIES = [
  {
    id: 'ORD-7721',
    customer: 'Alex Johnson',
    phone: '+44 7911 123456',
    address: '123 Baker St, London, UK',
    customerCoords: [51.5237, -0.1585],
    shopName: 'BookNest Central Store',
    shopAddress: '221B Oxford St, London, UK',
    shopCoords: [51.5154, -0.1418],
    items: ['The Great Gatsby', 'Sapiens'],
    status: 'pending',
    time: '20 mins ago',
    amount: 38.50,
  },
  {
    id: 'ORD-8812',
    customer: 'Sarah Smith',
    phone: '+44 7922 654321',
    address: '45 High Street, Manchester, UK',
    customerCoords: [53.4808, -2.2426],
    shopName: 'BookNest Manchester',
    shopAddress: '10 Deansgate, Manchester, UK',
    shopCoords: [53.4779, -2.2451],
    items: ['Atomic Habits'],
    status: 'picked_up',
    time: '1 hour ago',
    amount: 15.99,
  },
  {
    id: 'ORD-9905',
    customer: 'Michael Brown',
    phone: '+44 7933 987654',
    address: '78 Queen Road, Birmingham, UK',
    customerCoords: [52.4862, -1.8904],
    shopName: 'BookNest Birmingham',
    shopAddress: '35 New St, Birmingham, UK',
    shopCoords: [52.4800, -1.8975],
    items: ['Deep Work', 'Dune'],
    status: 'delivered',
    time: '3 hours ago',
    amount: 42.00,
  },
];

// ─── Route Map Component ───────────────────────────────────────────────────
const RouteMap = ({ delivery }) => {
  const sc = delivery?.shopCoords;
  const cc = delivery?.customerCoords;

  // Guard: bail out early if coords are missing or invalid
  const valid =
    Array.isArray(sc) && Array.isArray(cc) &&
    sc.length === 2 && cc.length === 2 &&
    !isNaN(sc[0]) && !isNaN(sc[1]) &&
    !isNaN(cc[0]) && !isNaN(cc[1]);

  // Stable references — prevents FitBounds from looping
  const positions = useMemo(() => (valid ? [sc, cc] : []), [valid, sc, cc]);
  const center    = useMemo(() => (valid ? [(sc[0] + cc[0]) / 2, (sc[1] + cc[1]) / 2] : [0, 0]), [valid, sc, cc]);
  const bounds    = useMemo(() => (valid ? L.latLngBounds([sc, cc]) : null), [valid, sc, cc]);

  if (!valid) {
    return (
      <div
        style={{ height: '340px' }}
        className="flex items-center justify-center bg-[#0f1020] text-gray-500 gap-2"
      >
        <MapPin size={20} />
        <span>Location data unavailable</span>
      </div>
    );
  }

  return (
    // key=delivery.id forces a full remount when switching deliveries,
    // preventing Leaflet from receiving stale / NaN centre values.
    <MapContainer
      key={delivery.id}
      center={center}
      zoom={13}
      style={{ height: '340px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Shop marker — purple */}
      <Marker position={sc} icon={shopIcon}>
        <Popup>
          <div style={{ fontWeight: 700, color: '#7c3aed' }}>📦 Pickup Point</div>
          <div style={{ fontWeight: 600 }}>{delivery.shopName}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{delivery.shopAddress}</div>
        </Popup>
      </Marker>

      {/* Customer marker — green */}
      <Marker position={cc} icon={customerIcon}>
        <Popup>
          <div style={{ fontWeight: 700, color: '#059669' }}>🏠 Drop-off Point</div>
          <div style={{ fontWeight: 600 }}>{delivery.customer}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{delivery.address}</div>
        </Popup>
      </Marker>

      {/* Dashed route line */}
      <Polyline
        positions={positions}
        pathOptions={{ color: '#7c3aed', weight: 3, dashArray: '8 6', opacity: 0.85 }}
      />

      {/* Auto-fit to show both markers */}
      <FitBounds bounds={bounds} />
    </MapContainer>
  );
};

// ─── Main Dashboard ────────────────────────────────────────────────────────
const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]   = useState('active');
  const [rawOrders, setRawOrders]   = useState([]);
  const [expandedMap, setExpandedMap] = useState(null);
  const [user, setUser] = useState(null);

  // Read delivery user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('bn_user');
    if (!stored) { navigate('/login'); return; }
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.role !== 'delivery') {
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

  // Load orders that have a shopAddress (i.e. came through checkout)
  const loadOrders = () => {
    const all = getOrders();
    setRawOrders(all.filter(o => o.status !== 'delivered' || activeTab === 'completed'));
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener(STORE_EVENT, loadOrders);
    return () => window.removeEventListener(STORE_EVENT, loadOrders);
  }, [activeTab]);

  // Map order shape → delivery shape expected by the UI
  const deliveries = useMemo(() => rawOrders.map(o => ({
    id:              o.id,
    customer:        o.customer?.name  || 'Unknown',
    phone:           o.customer?.phone || '',
    address:         `${o.customer?.address || ''}, ${o.customer?.city || ''} ${o.customer?.postcode || ''}`.trim(),
    customerCoords:  null,          // geocoding skipped for simplicity
    shopName:        o.shopName     || 'BookNest Shop',
    shopAddress:     o.shopAddress  || '',
    shopCoords:      null,
    items:           [o.bookTitle]  || ['Book'],
    status:          o.status,
    time:            o.createdAt ? new Date(o.createdAt).toLocaleTimeString() : '',
    amount:          o.amount       || 0,
    _raw:            o,
  })), [rawOrders]);

  const updateStatus = (id, newStatus) => {
    updateOrder(id, { status: newStatus });
  };

  const toggleMap = (id) => setExpandedMap(prev => prev === id ? null : id);

  const openInMaps = (delivery) => {
    if (!delivery.shopAddress && !delivery.address) return;
    const origin = encodeURIComponent(delivery.shopAddress || '');
    const destination = encodeURIComponent(delivery.address || '');
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, '_blank');
  };

  const stats = [
    { label: 'Total Earnings', value: '$420.50', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Completed', value: '12', icon: CheckCircle, color: 'text-blue-400' },
    { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Inter']">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/10 bg-[#131325] lg:block">
        <div className="flex h-20 items-center gap-3 px-8 border-b border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-500/20">
            <Package size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            BookNest <span className="text-xs text-purple-400 font-normal">Delivery</span>
          </span>
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
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-64">
        {/* Topbar */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0d0d1a]/80 px-8 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-xl font-bold">Delivery Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{user?.name || 'Delivery Driver'}</p>
              <p className="text-xs text-purple-400">ID: {user?.email?.split('@')[0]?.toUpperCase() || 'DRV'}</p>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-purple-500/30 bg-purple-600/20 flex items-center justify-center">
              <User size={20} className="text-purple-400" />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats */}
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
                  <div key={delivery.id} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-purple-500/30 overflow-hidden">
                    <div className="p-6">
                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/20 shrink-0">
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
                              <MapPin size={14} className="text-purple-400 shrink-0" />
                              {delivery.address}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="text-xl font-bold text-emerald-400">${delivery.amount.toFixed(2)}</p>
                          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                            delivery.status === 'pending'   ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                            delivery.status === 'picked_up' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' :
                                                              'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {delivery.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Route summary strip */}
                      <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600/30 border border-purple-500/30">
                              <Store size={12} className="text-purple-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Pickup — Shop</p>
                              <p className="text-xs text-gray-300 font-medium truncate">{delivery.shopName}</p>
                              <p className="text-xs text-gray-500 truncate">{delivery.shopAddress}</p>
                            </div>
                          </div>

                          <div className="hidden sm:flex items-center gap-1 text-gray-600 shrink-0">
                            <div className="h-px w-6 bg-gray-700" />
                            <Navigation size={14} className="text-purple-500 rotate-90" />
                            <div className="h-px w-6 bg-gray-700" />
                          </div>

                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/30 border border-emerald-500/30">
                              <User size={12} className="text-emerald-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Drop-off — Customer</p>
                              <p className="text-xs text-gray-300 font-medium truncate">{delivery.customer}</p>
                              <p className="text-xs text-gray-500 truncate">{delivery.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-5">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} />
                            {delivery.items.length} {delivery.items.length === 1 ? 'Book' : 'Books'}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <a
                            href={`tel:${delivery.phone}`}
                            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10"
                          >
                            <Phone size={16} />
                            Call
                          </a>

                          <button
                            onClick={() => toggleMap(delivery.id)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                              expandedMap === delivery.id
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <Navigation size={16} />
                            {expandedMap === delivery.id ? 'Hide Map' : 'View Route'}
                            {expandedMap === delivery.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          <button
                            onClick={() => openInMaps(delivery)}
                            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10"
                          >
                            <MapPin size={16} />
                            Open Maps
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

                    {/* ── Leaflet Map Panel ── */}
                    {expandedMap === delivery.id && (
                      <div className="border-t border-white/10">
                        {/* Legend bar */}
                        <div className="flex items-center justify-between bg-[#0f1020] px-6 py-3">
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                              <span className="text-gray-400">Pickup: <span className="text-white font-medium">{delivery.shopName}</span></span>
                            </div>
                            <span className="text-gray-700">→</span>
                            <div className="flex items-center gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                              <span className="text-gray-400">Drop-off: <span className="text-white font-medium">{delivery.customer}</span></span>
                            </div>
                            <span className="text-[10px] text-gray-600 hidden sm:block">© OpenStreetMap contributors</span>
                          </div>
                          <button
                            onClick={() => setExpandedMap(null)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white transition"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Map */}
                        <div style={{ position: 'relative', zIndex: 0 }}>
                          <RouteMap delivery={delivery} />
                          {/* Open in Google Maps overlay */}
                          <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 1000 }}>
                            <button
                              onClick={() => openInMaps(delivery)}
                              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-500"
                            >
                              <Navigation size={15} />
                              Open in Google Maps
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── Inline SVG icon for dashboard nav ────────────────────────────────────
const LayoutDashboard = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

export default DeliveryDashboard;
