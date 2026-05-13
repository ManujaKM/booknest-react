import { Bell, Search } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#2a2d42] bg-[#0d0f1a] px-6">
      <div className="flex items-center gap-3 text-[#e2e4f0]">
        <h1 className="text-lg font-semibold">Admin Console</h1>
        <span className="rounded-full border border-[#2a2d42] bg-[#1a1d2e] px-3 py-1 text-xs text-[#8a8fa8]">
          BookNest
        </span>
      </div>

      <div className="hidden w-full max-w-md items-center gap-2 rounded-full border border-[#2a2d42] bg-[#1a1d2e] px-4 py-2 text-sm text-[#8a8fa8] md:flex">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search inventory, orders, users..."
          className="w-full bg-transparent text-sm text-[#e2e4f0] outline-none placeholder:text-[#8a8fa8]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="relative rounded-full bg-[#1a1d2e] p-2 text-[#8a8fa8]">
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#f87171] px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c3aed] text-sm font-semibold text-white">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
