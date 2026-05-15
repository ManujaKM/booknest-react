import { useEffect, useState } from 'react';
import { ShoppingBag, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { getOrders, updateOrder, STORE_EVENT } from '../../store/bookStore.js';

const STATUS_STYLES = {
  pending:    'border-amber-500/30 bg-amber-500/10 text-amber-400',
  dispatched: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  delivered:  'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
};

const STATUS_FLOW = { pending: 'dispatched', dispatched: 'delivered' };
const STATUS_LABEL = { pending: 'Mark Dispatched', dispatched: 'Mark Delivered' };

const ShopOwnerOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  const myShopId = user?.email || '';

  const load = () =>
    setOrders(getOrders().filter(o => o.shopId === myShopId));

  useEffect(() => {
    load();
    window.addEventListener(STORE_EVENT, load);
    return () => window.removeEventListener(STORE_EVENT, load);
  }, [myShopId]);

  const advance = (id, currentStatus) => {
    const next = STATUS_FLOW[currentStatus];
    if (next) updateOrder(id, { status: next });
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    dispatched: orders.filter(o => o.status === 'dispatched').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-gray-400 mt-1">{orders.length} total order{orders.length !== 1 ? 's' : ''} from your shop</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'dispatched', 'delivered'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold capitalize transition ${
              filter === s
                ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                : 'border border-white/10 bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {s} <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{counts[s]}</span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <ShoppingBag size={32} className="text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">Orders will appear here once customers purchase your books</p>
        </div>
      )}

      {/* Orders list */}
      <div className="space-y-4">
        {filtered.map(order => (
          <div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-500/20">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Package size={22} className="text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{order.id}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[order.status] || STATUS_STYLES.pending}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-0.5 font-semibold text-white">{order.bookTitle}</p>
                  <p className="text-xs text-gray-400">
                    Customer: {order.customer?.name} · {order.customer?.phone}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">📍 {order.customer?.address}, {order.customer?.city}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-lg font-bold text-emerald-400">${parseFloat(order.amount).toFixed(2)}</p>
                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                {order.status !== 'delivered' && (
                  <button
                    onClick={() => advance(order.id, order.status)}
                    className="mt-1 flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition"
                  >
                    {order.status === 'pending' ? <Truck size={13} /> : <CheckCircle size={13} />}
                    {STATUS_LABEL[order.status]}
                  </button>
                )}
              </div>
            </div>

            {/* Delivery address */}
            <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs text-gray-400">
              <span className="font-semibold text-gray-300">Deliver to: </span>
              {order.customer?.address}, {order.customer?.city} {order.customer?.postcode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopOwnerOrders;
