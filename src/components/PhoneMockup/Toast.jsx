import { AlertCircle, CheckCircle2, Heart, Info } from 'lucide-react';

const toastStyles = {
  success: {
    container: 'bg-emerald-500/90 text-white',
    icon: CheckCircle2
  },
  wishlist: {
    container: 'bg-pink-500/90 text-white',
    icon: Heart
  },
  error: {
    container: 'bg-red-500/90 text-white',
    icon: AlertCircle
  },
  info: {
    container: 'bg-purple-500/90 text-white',
    icon: Info
  }
};

const Toast = ({ type = 'info', message = '', isVisible = false }) => {
  const config = toastStyles[type] || toastStyles.info;
  const Icon = config.icon;

  return (
    <div
      className={`absolute left-4 right-4 top-4 z-20 rounded-2xl px-4 py-3 text-xs shadow-lg transition-all duration-300 ${config.container} ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
