import { useEffect, useState } from 'react';
import { getOrders, updateOrder, STORE_EVENT } from '../../store/bookStore.js';
import { MoreVertical } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar.jsx';
import Topbar from '../../components/admin/Topbar.jsx';

const initialOrders = [
  {
    id: '#ORD-2041',
    customer: 'Alice Johnson',
    book: 'Steve Jobs',
    qty: 1,
    amount: 22.5,
    status: 'Delivered',
    date: 'May 10, 2026'
  },
  {
    id: '#ORD-2038',
    customer: 'Bob Smith',
    book: 'Atomic Habits',
    qty: 1,
    amount: 15.99,
    status: 'Processing',
    date: 'May 6, 2026'
  },
  {
    id: '#ORD-2031',
    customer: 'Carol White',
    book: 'Dune',
    qty: 2,
    amount: 37.0,
    status: 'Pending',
    date: 'Apr 28, 2026'
  },
  {
    id: '#ORD-2024',
    customer: 'David Lee',
    book: 'The Great Gatsby',
    qty: 1,
    amount: 12.0,
    status: 'Pending',
    date: 'Apr 15, 2026'
  },
  {
    id: '#ORD-2018',
    customer: 'Eva Green',
    book: 'Atomic Habits',
    qty: 1,
    amount: 15.99,
    status: 'Delivered',
    date: 'Apr 10, 2026'
  }
];

const summary = [
  { label: 'Total Orders', value: 5, color: '#a78bfa' },
  { label: 'Pending', value: 2, color: '#fbbf24' },
  { label: 'Processing', value: 1, color: '#60a5fa' },
  { label: 'Delivered', value: 2, color: '#34d399' },
  { label: 'Revenue', value: '$103', color: '#34d399' }
];

const statusColors = {
  pending:    '#fbbf24',
  dispatched: '#60a5fa',
  delivered:  '#34d399',
  Pending:    '#fbbf24',
  Processing: '#60a5fa',
  Delivered:  '#34d399',
  Cancelled:  '#f87171'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nextStatus, setNextStatus] = useState('pending');

  const loadOrders = () => {
    const live = getOrders();
    // Normalise live orders to match the display shape
    const mapped = live.map(o => ({
      id:       o.id,
      customer: o.customer?.name || 'Unknown',
      book:     o.bookTitle      || '—',
      qty:      o.qty            || 1,
      amount:   o.amount         || 0,
      status:   o.status         || 'pending',
      date:     new Date(o.createdAt).toLocaleDateString(),
      shopName: o.shopName,
      address:  `${o.customer?.address || ''}, ${o.customer?.city || ''}`.trim(),
      _isLive:  true,
      _rawId:   o.id,
    }));
    // Merge: live orders first, then legacy mocks (no overlap by id)
    setOrders(mapped);
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener(STORE_EVENT, loadOrders);
    return () => window.removeEventListener(STORE_EVENT, loadOrders);
  }, []);

  // Dynamic summary
  const summary = [
    { label: 'Total Orders', value: orders.length,                                          color: '#a78bfa' },
    { label: 'Pending',      value: orders.filter(o => o.status === 'pending').length,       color: '#fbbf24' },
    { label: 'Dispatched',   value: orders.filter(o => o.status === 'dispatched').length,    color: '#60a5fa' },
    { label: 'Delivered',    value: orders.filter(o => o.status === 'delivered').length,     color: '#34d399' },
    { label: 'Revenue',      value: '$' + orders.reduce((s,o) => s + (o.amount||0), 0).toFixed(2), color: '#34d399' },
  ];

  const openMenu = (orderId) => {
    setMenuId((current) => (current === orderId ? null : orderId));
  };

  const openStatus = (order) => {
    setSelectedOrder(order);
    setNextStatus(order.status);
    setShowStatusModal(true);
    setMenuId(null);
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
    setMenuId(null);
  };

  const openDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
    setMenuId(null);
  };

  const applyStatus = () => {
    if (selectedOrder?._isLive) {
      updateOrder(selectedOrder._rawId, { status: nextStatus });
    } else {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: nextStatus } : o));
    }
    setShowStatusModal(false);
  };

  const confirmDelete = () => {
    setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <Topbar />
      <Sidebar />
      <main className="pb-24 pt-20 lg:pl-64 px-4 sm:px-6 lg:px-8">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-full border border-[#2a2d42] bg-[#1a1d2e] px-4 py-2 text-xs"
                style={{ color: item.color }}
              >
                <span className="font-semibold">{item.value}</span> {item.label}
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#2a2d42] bg-[#1a1d2e]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2d42] text-xs uppercase tracking-wider text-[#8a8fa8]">
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Book</th>
                  <th className="px-5 py-4">Qty</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2d42]">
                {orders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-semibold text-[#e2e4f0]">{order.id}</td>
                    <td className="px-5 py-4 text-[#e2e4f0]">{order.customer}</td>
                    <td className="px-5 py-4 text-[#8a8fa8]">{order.book}</td>
                    <td className="px-5 py-4">{order.qty}</td>
                    <td className="px-5 py-4 text-[#34d399]">${order.amount.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-semibold"
                        style={{
                          background: `${statusColors[order.status]}1A`,
                          color: statusColors[order.status]
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#8a8fa8]">{order.date}</td>
                    <td className="relative px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openMenu(order.id)}
                        className="rounded-lg border border-[#2a2d42] bg-[#12141f] p-2 text-[#8a8fa8] hover:text-white"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {menuId === order.id && (
                        <div className="absolute right-5 top-12 z-10 w-44 rounded-xl border border-[#2a2d42] bg-[#12141f] p-2 text-xs shadow-lg">
                          <button
                            type="button"
                            onClick={() => openStatus(order)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-[#e2e4f0] hover:bg-[#1a1d2e]"
                          >
                            Update Status
                          </button>
                          <button
                            type="button"
                            onClick={() => openDetails(order)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-[#e2e4f0] hover:bg-[#1a1d2e]"
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={() => openDelete(order)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-[#f87171] hover:bg-[#1a1d2e]"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showStatusModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-5">
            <h2 className="text-lg font-semibold">Update Status</h2>
            <p className="mt-1 text-sm text-[#8a8fa8]">
              Update status for {selectedOrder?.id}
            </p>
            <select
              className="mt-4 w-full rounded-lg border border-[#2a2d42] bg-[#0f1322] px-3 py-2 text-sm text-[#e2e4f0]"
              value={nextStatus}
              onChange={(e) => setNextStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="dispatched">Dispatched</option>
              <option value="delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#2a2d42] px-3 py-2 text-sm text-[#8a8fa8]"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white"
                onClick={applyStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-5">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <div className="mt-4 space-y-2 text-sm text-[#8a8fa8]">
              <div>Order: {selectedOrder?.id}</div>
              <div>Customer: {selectedOrder?.customer}</div>
              <div>Book: {selectedOrder?.book}</div>
              <div>Qty: {selectedOrder?.qty}</div>
              <div>Amount: ${selectedOrder?.amount.toFixed(2)}</div>
              <div>Status: {selectedOrder?.status}</div>
              <div>Date: {selectedOrder?.date}</div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                className="rounded-lg border border-[#2a2d42] px-3 py-2 text-sm text-[#8a8fa8]"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-5">
            <h2 className="text-lg font-semibold text-red-400">Delete Order</h2>
            <p className="mt-2 text-sm text-[#8a8fa8]">
              This will permanently delete {selectedOrder?.id}.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#2a2d42] px-3 py-2 text-sm text-[#8a8fa8]"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-[#f87171]"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
