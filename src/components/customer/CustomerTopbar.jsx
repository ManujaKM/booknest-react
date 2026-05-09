import { Bell, Grid, Search } from 'lucide-react';

const notificationsList = [
  '📚 New book recommendation',
  '✅ Your request was accepted',
  '👤 Riley started following you'
];

const CustomerTopbar = ({
  user,
  notifications,
  showNotifDropdown,
  showAvatarDropdown,
  onToggleNotifications,
  onToggleAvatar,
  onSearchChange,
  searchQuery,
  onSignOut
}) => {
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'R';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/90 text-white">
            <span className="text-lg font-semibold">B</span>
          </div>
          <span className="text-lg font-semibold text-white">BookNest</span>
        </div>

        <div className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-gray-300 md:flex">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search books, authors..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleNotifications}
            className="relative rounded-xl bg-white/5 p-2 text-gray-300 transition hover:bg-white/10"
          >
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {notifications}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-14 top-14 w-64 rounded-2xl border border-white/10 bg-[#101025]/90 p-3 text-sm text-gray-200 shadow-lg backdrop-blur">
              <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">Notifications</p>
              <div className="space-y-2">
                {notificationsList.map((item) => (
                  <div key={item} className="rounded-lg bg-white/5 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="rounded-xl bg-white/5 p-2 text-gray-300 transition hover:bg-white/10"
          >
            <Grid size={18} />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={onToggleAvatar}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-sm font-semibold text-white"
            >
              {initial}
            </button>
            {showAvatarDropdown && (
              <div className="absolute right-0 top-12 w-44 rounded-2xl border border-white/10 bg-[#101025]/90 p-2 text-sm text-gray-200 shadow-lg backdrop-blur">
                <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                  👤 My Profile
                </button>
                <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                  ⚙️ Settings
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="w-full rounded-lg px-3 py-2 text-left text-red-400 hover:bg-white/5"
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerTopbar;
