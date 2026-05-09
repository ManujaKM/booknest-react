import React, { useState } from 'react';
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
  X
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: BarChart3, color: 'text-blue-400' },
    { label: 'Total Books', value: '1,204', icon: Book, color: 'text-purple-400' },
    { label: 'Active Users', value: '450', icon: Users, color: 'text-emerald-400' },
    { label: 'Pending Orders', value: '28', icon: ShoppingCart, color: 'text-amber-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Inter']">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-white/10 bg-[#131325] lg:block">
        <div className="flex h-20 items-center gap-3 px-8 border-b border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-500/20">
            <BarChart3 size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">BookNest <span className="text-xs text-purple-400 font-normal">Admin</span></span>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${activeTab === 'inventory' ? 'bg-purple-600/10 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Book size={20} />
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${activeTab === 'users' ? 'bg-purple-600/10 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={20} />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${activeTab === 'orders' ? 'bg-purple-600/10 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <ShoppingCart size={20} />
            Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64">
        {/* Topbar */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0d0d1a]/80 px-8 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search database..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold shadow-lg shadow-purple-500/20 transition hover:bg-purple-500">
              <Plus size={18} className="inline mr-2" />
              Add New
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

          {/* Content Area */}
          <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur">
            <div className="border-b border-white/10 bg-white/5 px-8 py-6 flex items-center justify-between">
              <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
              <div className="flex gap-2">
                <button className="rounded-lg bg-white/5 p-2 text-gray-400 hover:text-white">
                  <Edit size={18} />
                </button>
                <button className="rounded-lg bg-white/5 p-2 text-red-400 hover:bg-red-500/10">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {activeTab === 'inventory' && (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-500">
                      <th className="px-8 py-4">Book Title</th>
                      <th className="px-8 py-4">Stock</th>
                      <th className="px-8 py-4">Price</th>
                      <th className="px-8 py-4">Category</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inventory.map((book) => (
                      <tr key={book.id} className="text-sm transition hover:bg-white/[0.02]">
                        <td className="px-8 py-4">
                          <div className="font-semibold">{book.title}</div>
                          <div className="text-xs text-gray-500">{book.author}</div>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${book.stock < 10 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                            {book.stock} in stock
                          </span>
                        </td>
                        <td className="px-8 py-4 font-medium text-emerald-400">${book.price.toFixed(2)}</td>
                        <td className="px-8 py-4 text-gray-400">{book.category}</td>
                        <td className="px-8 py-4 text-right">
                          <button className="text-gray-500 hover:text-white">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'users' && (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-500">
                      <th className="px-8 py-4">User</th>
                      <th className="px-8 py-4">Role</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                      <tr key={user.id} className="text-sm transition hover:bg-white/[0.02]">
                        <td className="px-8 py-4">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="capitalize text-gray-300">{user.role}</span>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {user.status === 'active' ? <Check size={10} /> : <X size={10} />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button className="text-gray-500 hover:text-white">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'orders' && (
                <div className="p-20 text-center text-gray-500">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Order history module is being synchronized...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
