import { BookOpen, House, Search, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'profile', label: 'Profile', icon: User }
];

const BottomNav = ({ active = 'home', onChange, libraryCount = 0 }) => {
  return (
    <div className="mt-6 h-12 rounded-2xl bg-white/10 flex items-center justify-around text-xs text-slate-300">
      {navItems.map((item) => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
              isActive ? 'text-[#7c3aed]' : 'text-slate-400'
            }`}
            aria-label={item.label}
          >
            <Icon size={16} />
            {item.id === 'library' && libraryCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[9px] text-white">
                {libraryCount}
              </span>
            )}
            <span className={`h-1 w-1 rounded-full ${isActive ? 'bg-[#7c3aed]' : 'bg-transparent'}`} />
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
