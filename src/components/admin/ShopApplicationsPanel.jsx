import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Store,
  MapPin,
  Percent,
  Truck,
  Copy,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const MOCK_APPLICATIONS = [
  {
    id: 'app-001',
    ownerName: 'Priya Mendis',
    email: 'priya@readingcorner.lk',
    shopName: 'The Reading Corner',
    location: 'Colombo 03, Sri Lanka',
    mapLink: 'https://maps.google.com/?q=Colombo+03+Sri+Lanka',
    commission: 12,
    deliveryMethod: 'both',
    description: 'A curated bookshop specialising in South Asian literature and academic texts.',
    appliedAt: '2026-05-10',
    status: 'pending',
    code: null
  },
  {
    id: 'app-002',
    ownerName: 'Kamal Perera',
    email: 'kamal@pagesnmore.lk',
    shopName: 'Pages & More',
    location: 'Kandy, Sri Lanka',
    mapLink: 'https://maps.google.com/?q=Kandy+Sri+Lanka',
    commission: 10,
    deliveryMethod: 'own',
    description: 'Family-run bookstore for 15 years, now going digital.',
    appliedAt: '2026-05-11',
    status: 'pending',
    code: null
  }
];

const deliveryLabel = {
  own: 'Own Delivery',
  booknest: 'BookNest Delivery Boys',
  both: 'Both Methods'
};

const deliveryColor = {
  own: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  booknest: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  both: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
};

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SH-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const ShopApplicationsPanel = () => {
  const [applications, setApplications] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('bn_shop_applications') || '[]');
      return stored.length > 0 ? stored : MOCK_APPLICATIONS;
    } catch {
      return MOCK_APPLICATIONS;
    }
  });
  const [expandedId, setExpandedId] = useState(null);
  const [copiedCode, setCopiedCode] = useState('');

  const persist = (updated) => {
    setApplications(updated);
    localStorage.setItem('bn_shop_applications', JSON.stringify(updated));
  };

  const handleApprove = (id) => {
    const code = generateCode();
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: 'approved', code } : app
    );
    persist(updated);

    // Also store approved codes so register page can validate
    const existing = JSON.parse(localStorage.getItem('bn_approved_codes') || '{}');
    const app = applications.find((a) => a.id === id);
    existing[code] = { shopName: app.shopName, ownerEmail: app.email, applicationId: id };
    localStorage.setItem('bn_approved_codes', JSON.stringify(existing));
  };

  const handleReject = (id) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: 'rejected', code: null } : app
    );
    persist(updated);
  };

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch {
      setCopiedCode('');
    }
  };

  const pending = applications.filter((a) => a.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <Clock size={12} />
          {pending.length} Pending
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <CheckCircle2 size={12} />
          {applications.filter((a) => a.status === 'approved').length} Approved
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
          <XCircle size={12} />
          {applications.filter((a) => a.status === 'rejected').length} Rejected
        </span>
      </div>

      {/* Pending Applications */}
      {pending.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
          <RefreshCw size={36} className="text-gray-600" />
          <p className="text-sm text-gray-500">No pending applications</p>
        </div>
      )}

      <div className="space-y-4">
        {applications.map((app) => {
          const isExpanded = expandedId === app.id;
          const statusStyle = {
            pending: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
            approved: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
            rejected: 'border-red-500/20 bg-red-500/10 text-red-300'
          }[app.status];

          return (
            <div
              key={app.id}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur transition hover:border-white/20"
            >
              {/* Card Header */}
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                onClick={() => setExpandedId(isExpanded ? null : app.id)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 text-purple-300">
                    <Store size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{app.shopName}</p>
                    <p className="text-xs text-gray-400 truncate">{app.ownerName} · {app.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className={`hidden sm:inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyle}`}>
                    {app.status}
                  </span>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-white/10 px-6 py-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={14} className="text-gray-500 shrink-0" />
                      <span className="truncate">{app.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Percent size={14} className="text-gray-500" />
                      {app.commission}% commission offered
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-gray-500" />
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${deliveryColor[app.deliveryMethod]}`}>
                        {deliveryLabel[app.deliveryMethod]}
                      </span>
                    </div>
                  </div>

                  {/* Google Maps verification */}
                  {app.mapLink ? (
                    <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
                      <MapPin size={15} className="text-blue-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-blue-300 mb-0.5">Google Maps Location</p>
                        <p className="text-xs text-gray-400 truncate">{app.mapLink}</p>
                      </div>
                      <a
                        href={app.mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition"
                      >
                        <ExternalLink size={12} />
                        Verify on Map
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-gray-500">
                      <MapPin size={13} />
                      No Google Maps link provided
                    </div>
                  )}

                  {app.description && (
                    <p className="text-sm text-gray-400 italic">"{app.description}"</p>
                  )}

                  <p className="text-xs text-gray-600">Applied: {app.appliedAt}</p>

                  {/* Approved Code Display */}
                  {app.status === 'approved' && app.code && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                      <div>
                        <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">Access Code — Share with Shop Owner</p>
                        <p className="text-2xl font-mono font-bold text-white tracking-widest">{app.code}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(app.code)}
                        className="ml-auto flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-500/20 transition"
                      >
                        <Copy size={12} />
                        {copiedCode === app.code ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  )}

                  {/* Actions */}
                  {app.status === 'pending' && (
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleApprove(app.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition"
                      >
                        <CheckCircle2 size={15} />
                        Approve & Generate Code
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(app.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopApplicationsPanel;
