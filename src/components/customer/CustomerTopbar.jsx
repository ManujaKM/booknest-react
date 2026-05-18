import { Bell, BookOpen, Grid, Loader2, Search, ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const baseNotifications = [
  { id: 1, color: 'bg-purple-500/70', title: '📚 New book recommendation', time: '2 min ago', unread: true },
  { id: 2, color: 'bg-emerald-500/70', title: '✅ Your request was accepted', time: '1 hour ago', unread: true },
  { id: 3, color: 'bg-blue-500/70', title: '👤 Riley started following you', time: '3 hours ago', unread: false },
];

/* ── Topbar Search Dropdown ─────────────────────────────────────────── */
const SearchDropdown = ({ query, onClose, onPreview }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`
        );
        const data = await res.json();
        setResults(
          data.docs.map((doc, index) => {
            const basePrice = (doc.title.length % 12) + 8.99;
            return {
              id: doc.key,
              title: doc.title,
              author: doc.author_name?.[0] || 'Unknown Author',
              category: doc.subject?.[0] || 'General',
              coverUrl: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg`
                : null,
              thumbnail: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : null,
              price: basePrice.toFixed(2),
              originalPrice: (basePrice + 4).toFixed(2),
              rating: 4.2 + (index % 3) * 0.2,
              ratingsCount: 1200 + index * 230,
              badge: 'Featured',
              color: 'purple',
              seller: 'BookNest',
              stock: 8 + index,
              previewLink: ''
            };
          })
        );
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  if (!query.trim()) return null;

  return (
    <div className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-white/10 bg-[#1a1035] shadow-2xl backdrop-blur z-50 overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
          <Loader2 size={16} className="animate-spin text-purple-400" />
          Searching…
        </div>
      ) : results.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">No results for "{query}"</p>
      ) : (
        <ul>
          {results.map((book) => (
            <li key={book.id} className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/5">
              {/* Cover */}
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} className="h-11 w-8 flex-shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="flex h-11 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600/20">
                  <BookOpen size={14} className="text-purple-400" />
                </div>
              )}
              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{book.title}</p>
                <p className="truncate text-xs text-purple-300">{book.author}</p>
              </div>
              {/* Price + actions */}
              <div className="flex flex-shrink-0 items-center gap-2">
                <span className="text-sm font-bold text-white">{book.price}</span>
                <button
                  type="button"
                  onClick={() => { onPreview?.(book); onClose(); }}
                  className="rounded-lg border border-purple-500/30 px-2.5 py-1 text-xs text-purple-300 transition hover:bg-purple-600/20"
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg bg-purple-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-purple-500"
                >
                  <ShoppingCart size={11} /> Buy
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   CustomerTopbar
═══════════════════════════════════════════════════════════════════════ */
const CustomerTopbar = ({
  user,
  notifications,
  showNotifDropdown,
  showAvatarDropdown,
  onToggleNotifications,
  onToggleAvatar,
  onSignOut,
  onNavigate,
  onOpenSettings,
  onMarkNotificationsRead,
  onPreview,
  showSearch = true,
}) => {
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'R';
  const [notificationItems, setNotificationItems] = useState(baseNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDrop, setShowSearchDrop] = useState(false);

  const notifRef = useRef(null);
  const avatarRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const latestQueryRef = useRef(searchQuery);

  useEffect(() => { latestQueryRef.current = searchQuery; }, [searchQuery]);

  /* close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (showNotifDropdown && notifRef.current && !notifRef.current.contains(e.target)) onToggleNotifications?.();
      if (showAvatarDropdown && avatarRef.current && !avatarRef.current.contains(e.target)) onToggleAvatar?.();
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showNotifDropdown, showAvatarDropdown, onToggleNotifications, onToggleAvatar]);

  /* global key → focus search */
  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement;
      const editable = active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.isContentEditable;
      if (!editable && e.key.length === 1 && searchInputRef.current) {
        searchInputRef.current.focus();
        setSearchQuery((prev) => `${prev}${e.key}`);
        setShowSearchDrop(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleMarkAllRead = () => {
    setNotificationItems((prev) => prev.map((item) => ({ ...item, unread: false })));
    onMarkNotificationsRead?.();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/90 text-white">
            <span className="text-lg font-semibold">B</span>
          </div>
          <span className="text-lg font-semibold text-white">BookNest</span>
        </div>

        {/* ── Search with live dropdown ── */}
        {showSearch && (
          <div ref={searchRef} className="relative hidden w-full max-w-md md:block">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-gray-300 transition focus-within:border-purple-500/50">
              <Search size={18} className="flex-shrink-0 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDrop(true); }}
                onFocus={() => setShowSearchDrop(true)}
                placeholder="Search books, authors…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
              {searchQuery && (
                <button type="button" onClick={() => { setSearchQuery(''); setShowSearchDrop(false); }} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>

            {showSearchDrop && (
              <SearchDropdown
                query={searchQuery}
                onClose={() => setShowSearchDrop(false)}
                onPreview={onPreview}
              />
            )}
          </div>
        )}

        {/* Right actions */}
        <div className="relative flex flex-shrink-0 items-center gap-3" ref={notifRef}>
          {/* Notifications */}
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
                <button type="button" onClick={handleMarkAllRead} className="text-xs text-purple-300 hover:text-purple-200">
                  Mark all read
                </button>
              </div>
              <div className="space-y-2">
                {notificationItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-white/5">
                    <span className={`mt-1 h-9 w-9 flex-shrink-0 rounded-full ${item.color}`} />
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

          <button type="button" className="rounded-xl bg-white/5 p-2 text-gray-300 transition hover:bg-white/10">
            <Grid size={18} />
          </button>

          {/* Avatar */}
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
                <button type="button" onClick={() => onNavigate?.('profile')} className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                  👤 My Profile
                </button>
                <button type="button" onClick={onOpenSettings} className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                  ⚙️ Settings
                </button>
                <div className="my-2 h-px bg-white/10" />
                <button type="button" onClick={onSignOut} className="w-full rounded-lg px-3 py-2 text-left text-red-400 hover:bg-white/5">
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
