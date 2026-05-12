import { BookOpen, Heart, ShoppingCart, Sparkles, Tag } from 'lucide-react';
import { useState } from 'react';

const DashboardView = ({ onNavigate, onOpenReading, onOpenShare, onAddToWishlist }) => {
  const [addedIds, setAddedIds] = useState([]);
  const [hoveredBar, setHoveredBar] = useState(null);
  const recommended = [
    {
      id: 1,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover: 'bg-emerald-500/40',
      rating: '★★★★★'
    },
    {
      id: 2,
      title: 'Deep Work',
      author: 'Cal Newport',
      cover: 'bg-amber-500/40',
      rating: '★★★★'
    },
    {
      id: 3,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      cover: 'bg-pink-500/40',
      rating: '★★★★★'
    },
    {
      id: 4,
      title: 'Dune',
      author: 'Frank Herbert',
      cover: 'bg-blue-500/40',
      rating: '★★★★'
    },
    {
      id: 5,
      title: '1984',
      author: 'George Orwell',
      cover: 'bg-purple-500/40',
      rating: '★★★★★'
    }
  ];

  const bars = [40, 65, 30, 80, 55, 90, 45];
  const pages = [12, 15, 7, 18, 11, 21, 9];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const userName = (() => {
    try { return JSON.parse(localStorage.getItem('bn_user'))?.name || 'there'; }
    catch { return 'there'; }
  })();

  const toggleWishlist = (id) =>
    setWishlisted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="space-y-10 py-4">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/60 via-[#1a1025] to-indigo-900/40 p-8 backdrop-blur">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />
        <p className="text-sm font-medium text-purple-300">Welcome back, {userName} 👋</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          Discover Your Next<br />Great Read
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Thousands of titles — preview any book, buy with one click.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.('search')}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            <BookOpen size={16} /> Browse Books
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('wishlist')}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-200 transition hover:bg-white/10"
          >
            My Wishlist →
          </button>
        </div>
        {/* decorative book stack */}
        <div className="absolute bottom-4 right-8 flex gap-2 opacity-50">
          <div className="h-16 w-10 -rotate-6 rounded-lg bg-purple-500/60 shadow-lg" />
          <div className="h-16 w-10 rotate-2 rounded-lg bg-blue-500/60 shadow-lg" />
          <div className="h-16 w-10 -rotate-3 rounded-lg bg-emerald-500/60 shadow-lg" />
        </div>
      </div>

      {/* ── Promo banner ── */}
      <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-3">
        <Tag size={15} className="flex-shrink-0 text-amber-400" />
        <p className="text-sm text-amber-200">
          <span className="font-semibold">Summer Sale:</span> 20% off your first order with code{' '}
          <code className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">BOOKNEST20</code>
        </p>
      </div>

      {/* ── Featured Books ── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-400" />
            <h3 className="text-xl font-bold text-white">Featured Books</h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('search')}
            className="text-sm text-purple-300 transition hover:text-purple-200"
          >
            View all →
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURED.map((book) => {
            const inWishlist = wishlisted.includes(book.id);
            return (
              <div
                key={book.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-purple-500/30 hover:bg-white/10"
              >
                {/* Cover */}
                <div className={`relative flex h-40 w-full items-center justify-center rounded-xl ${book.cover}`}>
                  <BookOpen size={28} className="text-white/25" />
                  <span className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                    {book.badge}
                  </span>
                  {/* Wishlist heart */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(book.id)}
                    className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 backdrop-blur transition hover:bg-black/60"
                  >
                    <Heart
                      size={13}
                      className={inWishlist ? 'text-pink-400' : 'text-white/50'}
                      fill={inWishlist ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <h4 className="mt-3 line-clamp-1 text-sm font-semibold text-white">{book.title}</h4>
                <p className="line-clamp-1 text-xs text-purple-300">{book.author}</p>
                <p className="mt-0.5 text-xs text-amber-300">{book.rating}</p>

                <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                  <span className="text-base font-bold text-white">{book.price}</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => onPreview?.(book)}
                      className="rounded-lg border border-purple-500/30 px-2.5 py-1.5 text-[11px] text-purple-300 transition hover:bg-purple-600/20"
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg bg-purple-600 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-purple-500"
                    >
                      <ShoppingCart size={11} /> Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Why BookNest ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { emoji: '📖', title: 'Free Chapter Previews', desc: 'Read the first chapter of any book before you buy.' },
          { emoji: '⚡', title: 'Instant Access', desc: 'Purchase and start reading your digital copy instantly.' },
          { emoji: '🔒', title: 'Secure Checkout', desc: 'Safe, encrypted payment for every order.' },
        ].map(({ emoji, title, desc }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <span className="text-2xl">{emoji}</span>
            <h4 className="mt-3 text-sm font-semibold text-white">{title}</h4>
            <p className="mt-1 text-xs text-gray-400">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardView;
