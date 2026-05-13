import { BookOpen, ShieldCheck, Store, Truck } from 'lucide-react';

const roles = [
  {
    value: 'customer',
    label: 'Customer',
    icon: BookOpen,
    activeClass: 'bg-amber-500 text-slate-900'
  },
  {
    value: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    activeClass: 'bg-rose-500 text-white'
  },
  {
    value: 'delivery',
    label: 'Delivery',
    icon: Truck,
    activeClass: 'bg-blue-500 text-white'
  },
  {
    value: 'shopowner',
    label: 'Shop Owner',
    icon: Store,
    activeClass: 'bg-amber-400 text-slate-900'
  }
];

const RoleSelector = ({ selectedRole, onSelect }) => {
  return (
    <div className="bg-white/10 rounded-xl p-1 grid grid-cols-4 gap-1">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = selectedRole === role.value;
        return (
          <button
            key={role.value}
            type="button"
            className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              isActive
                ? `${role.activeClass} shadow-md`
                : 'text-slate-300 hover:text-white'
            }`}
            onClick={() => onSelect(role.value)}
          >
            <Icon size={16} />
            {role.label}
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
