import { Bell, Grid, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const baseNotifications = [
  {
    id: 1,
    color: 'bg-purple-500/70',
    title: '📚 New book recommendation',
    time: '2 min ago',
    unread: true
  },
  {
    id: 2,
    color: 'bg-emerald-500/70',
    title: '✅ Your request was accepted',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    color: 'bg-blue-500/70',
    title: '👤 Riley started following you',
    time: '3 hours ago',
    unread: false
  }
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
  onSignOut,
  onNavigate,
  onOpenSettings,
  onMarkNotificationsRead
}) => {
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'R';
  const [notificationItems, setNotificationItems] = useState(baseNotifications);
  const notifRef = useRef(null);
  const avatarRef = useRef(null);
  const searchInputRef = useRef(null);
  const latestQueryRef = useRef(searchQuery);

  useEffect(() => {
    latestQueryRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showNotifDropdown && notifRef.current && !notifRef.current.contains(event.target)) {
        onToggleNotifications?.();
      }
      if (showAvatarDropdown && avatarRef.current && !avatarRef.current.contains(event.target)) {
        onToggleAvatar?.();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showNotifDropdown, showAvatarDropdown, onToggleNotifications, onToggleAvatar]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const active = document.activeElement;
      const isEditable =
        active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.isContentEditable;
      if (isEditable) {
        return;
      }
      if (event.key.length === 1 && searchInputRef.current) {
        searchInputRef.current.focus();
        onSearchChange?.(`${latestQueryRef.current}${event.key}`);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onSearchChange]);

  const handleMarkAllRead = () => {
    setNotificationItems((prev) => prev.map((item) => ({ ...item, unread: false })));
    onMarkNotificationsRead?.();
  };

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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onNavigate?.('search');
              }
            }}
            placeholder="Search books, authors..."
            ref={searchInputRef}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-gray-400"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="relative flex items-center gap-3" ref={notifRef}>
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
            <div className="absolute right-0 top-14 w-80 rounded-2xl border border-white/10 bg-[#1a1035] p-4 text-sm text-gray-200 shadow-2xl backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-gray-500">Notifications</p>
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="text-xs text-purple-300 hover:text-purple-200"
                >
                  Mark all read
                </button>
              </div>
              <div className="space-y-2">
                {notificationItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-white/5"
                  >
                    <span className={`mt-1 h-9 w-9 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                    {item.unread && <span className="mt-2 h-2 w-2 rounded-full bg-purple-400" />}
                  </div>
                ))}
              </div>
              <button type="button" className="mt-3 text-sm text-purple-300 hover:text-purple-200">
                View all notifications →
              </button>
            </div>
          )}

          <button
            type="button"
            className="rounded-xl bg-white/5 p-2 text-gray-300 transition hover:bg-white/10"
          >
            <Grid size={18} />
          </button>

          <div className="relative" ref={avatarRef}>
            <button
              type="button"
              onClick={onToggleAvatar}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-sm font-semibold text-white"
            >
              {initial}
            </button>
            {showAvatarDropdown && (
              <div className="absolute right-0 top-12 w-48 rounded-2xl border border-white/10 bg-[#1a1035] p-2 text-sm text-gray-200 shadow-2xl backdrop-blur">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-white">{user?.name || 'Riley'}</p>
                  <p className="text-xs text-gray-400">{user?.email || 'riley@example.com'}</p>
                </div>
                <div className="my-2 h-px bg-white/10" />
                <button
                  type="button"
                  onClick={() => onNavigate?.('profile')}
                  className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5"
                >
                  👤 My Profile
                </button>
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5"
                >
                  ⚙️ Settings
                </button>
                <div className="my-2 h-px bg-white/10" />
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
