import { ChevronDown, ChevronUp, Copy, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const DemoCredentials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [copiedKey, setCopiedKey] = useState('');

  const handleCopy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    } catch (error) {
      setCopiedKey('');
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all duration-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>🔐 Demo Credentials</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-slate-300 hover:text-white"
            aria-label="Toggle credential visibility"
            onClick={(event) => {
              event.stopPropagation();
              setIsVisible((prev) => !prev);
            }}
          >
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      <div
        className={`mt-4 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 space-y-3">
          {[
            {
              label: 'Customer',
              badge: 'bg-amber-100 text-amber-700',
              email: 'customer@booknest.com',
              password: 'customer123'
            },
            {
              label: 'Admin',
              badge: 'bg-rose-100 text-rose-700',
              email: 'admin@booknest.com',
              password: 'admin123'
            },
            {
              label: 'Delivery',
              badge: 'bg-blue-100 text-blue-700',
              email: 'delivery@booknest.com',
              password: 'delivery123'
            }
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4 border-b border-white/10 last:border-none pb-3 last:pb-0">
              <div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${item.badge}`}>
                  {item.label}
                </span>
                <p className="mt-2">Email: {isVisible ? item.email : '••••••••••••••••'}</p>
                <p>Pass: {isVisible ? item.password : '••••••••'}</p>
              </div>
              <button
                type="button"
                className="text-slate-300 hover:text-white text-xs"
                onClick={() => handleCopy(item.label, `${item.email} | ${item.password}`)}
              >
                <span className="inline-flex items-center gap-1">
                  <Copy size={14} />
                  {copiedKey === item.label ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoCredentials;
