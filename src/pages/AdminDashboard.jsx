import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrders, updateOrder, STORE_EVENT } from '../store/bookStore.js';
import {
  Users,
  Book,
  ShoppingCart,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
  Check,
  X,
  Store
} from 'lucide-react';
import Sidebar from '../components/admin/Sidebar.jsx';
import Topbar from '../components/admin/Topbar.jsx';

const MOCK_INVENTORY = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', stock: 45, price: 15.99, category: 'Self Help' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', stock: 12, price: 18.50, category: 'Fiction' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 8, price: 12.00, category: 'Classic' },
  { id: 4, title: 'Steve Jobs', author: 'Walter Isaacson', stock: 24, price: 22.50, category: 'Biography' }
];

const MOCK_USERS = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'customer', status: 'active' },
  { id: 2, name: 'Bob Wilson', email: 'bob@delivery.com', role: 'delivery', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'customer', status: 'suspended' }
];

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  const loadOrders = () => setOrders(getOrders());

  useEffect(() => {
    loadOrders();
    window.addEventListener(STORE_EVENT, loadOrders);
    return () => window.removeEventListener(STORE_EVENT, loadOrders);
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/admin/users')) {
      setActiveTab('users');
    } else {
      setActiveTab('inventory');
    }
  }, [location.pathname]);

  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: BarChart3, color: 'text-blue-400' },
    { label: 'Total Books', value: '1,204', icon: Book, color: 'text-purple-400' },
    { label: 'Active Users', value: '450', icon: Users, color: 'text-emerald-400' },
    { label: 'Pending Orders', value: '28', icon: ShoppingCart, color: 'text-amber-400' }
  ];

  const navItems = [
    { id: 'inventory', label: 'Inventory', icon: Book },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'shopApplications', label: 'Shop Applications', icon: Store }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <Topbar />
      <Sidebar />
      <main className="pb-24 pt-20 lg:pl-64 px-4 sm:px-6 lg:px-8">
        <div className="p-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {activeTab === 'users' ? 'User Management' : 'Inventory'}
              </h1>
              <p className="text-sm text-[#8a8fa8]">
                {activeTab === 'users'
                  ? 'Manage customers and staff'
                  : 'Manage your book stock'}
              </p>
            </div>
            <button className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white">
              <Plus size={18} className="inline mr-2" />
              {activeTab === 'users' ? 'Add New User' : 'Add New'}
            </button>
          </div>

          <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
            <div className="relative w-full max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8fa8]" />
              <input
                type="text"
                placeholder={activeTab === 'users' ? 'Search users...' : 'Search books...'}
                className="w-full rounded-lg border border-[#2a2d42] bg-[#0f1322] py-2 pl-10 pr-4 text-sm text-[#e2e4f0] outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8a8fa8]">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-2xl bg-[#0f1322] p-3 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] overflow-hidden">
            {/* Panel Header */}
            <div className="border-b border-[#2a2d42] px-8 py-6 flex items-center justify-between">
              <h2 className="text-xl font-bold capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#2a2d42] bg-[#12141f] p-2 text-[#8a8fa8] hover:text-white transition">
                  <Edit size={18} />
                </button>
                <button className="rounded-lg border border-[#2a2d42] bg-[#12141f] p-2 text-[#f87171] hover:bg-red-500/10 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#2a2d42] text-xs font-bold uppercase tracking-wider text-[#8a8fa8]">
                      <th className="px-8 py-4">Book Title</th>
                      <th className="px-8 py-4">Stock</th>
                      <th className="px-8 py-4">Price</th>
                      <th className="px-8 py-4">Category</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2d42]">
                    {inventory.map((book) => (
                      <tr key={book.id} className="text-sm transition hover:bg-[#25283d]">
                        <td className="px-8 py-4">
                          <div className="font-semibold">{book.title}</div>
                          <div className="text-xs text-[#8a8fa8]">{book.author}</div>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`rounded-full px-2 py-1 text-[10px] font-bold border ${book.stock < 10 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                            {book.stock} in stock
                          </span>
                        </td>
                        <td className="px-8 py-4 font-medium text-emerald-400">${book.price.toFixed(2)}</td>
                        <td className="px-8 py-4 text-[#8a8fa8]">{book.category}</td>
                        <td className="px-8 py-4 text-right">
                          <button className="text-[#8a8fa8] hover:text-white transition">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#2a2d42] text-xs font-bold uppercase tracking-wider text-[#8a8fa8]">
                      <th className="px-8 py-4">User</th>
                      <th className="px-8 py-4">Role</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2d42]">
                    {users.map((user) => (
                      <tr key={user.id} className="text-sm transition hover:bg-[#25283d]">
                        <td className="px-8 py-4">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs text-[#8a8fa8]">{user.email}</div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="capitalize text-[#c0c4d8]">{user.role}</span>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {user.status === 'active' ? <Check size={10} /> : <X size={10} />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button className="text-[#8a8fa8] hover:text-white transition">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                {orders.length === 0 ? (
                  <div className="p-20 text-center text-[#8a8fa8]">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No orders placed yet.</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#2a2d42] text-xs font-bold uppercase tracking-wider text-[#8a8fa8]">
                        <th className="px-8 py-4">Order</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Shop</th>
                        <th className="px-8 py-4">Amount</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2d42]">
                      {orders.map(order => (
                        <tr key={order.id} className="text-sm transition hover:bg-[#25283d]">
                          <td className="px-8 py-4">
                            <div className="font-bold text-purple-400">{order.id}</div>
                            <div className="text-xs text-[#8a8fa8] truncate max-w-[140px]">{order.bookTitle}</div>
                          </td>
                          <td className="px-8 py-4">
                            <div className="font-semibold">{order.customer?.name}</div>
                            <div className="text-xs text-[#8a8fa8]">{order.customer?.city}</div>
                          </td>
                          <td className="px-8 py-4 text-[#8a8fa8]">{order.shopName}</td>
                          <td className="px-8 py-4 font-bold text-emerald-400">${parseFloat(order.amount).toFixed(2)}</td>
                          <td className="px-8 py-4">
                            <select
                              value={order.status}
                              onChange={e => updateOrder(order.id, { status: e.target.value })}
                              className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none bg-transparent ${
                                order.status === 'pending'    ? 'border-amber-500/30 text-amber-400' :
                                order.status === 'dispatched' ? 'border-blue-500/30 text-blue-400' :
                                                               'border-emerald-500/30 text-emerald-400'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="px-8 py-4 text-xs text-[#8a8fa8]">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Shop Applications Tab */}
            {activeTab === 'shopApplications' && (
              <div className="p-20 text-center text-[#8a8fa8]">
                <Store size={48} className="mx-auto mb-4 opacity-20" />
                <p>No shop applications yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
