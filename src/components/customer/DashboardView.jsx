import { useMemo, useState } from 'react';
import { BookMarked, BookOpen, Heart, Share2, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import ActivityFeed from './ActivityFeed.jsx';

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

  const libraryTitles = useMemo(() => {
    try {
      const stored = localStorage.getItem('bn_library');
      const parsed = stored ? JSON.parse(stored) : [];
      return new Set(parsed.map((book) => book.title));
    } catch (error) {
      return new Set();
    }
  }, []);

  const handleAddRecommended = (book) => {
    if (libraryTitles.has(book.title) || addedIds.includes(book.id)) {
      return;
    }
    if (onAddToWishlist) {
      onAddToWishlist({
        id: book.id,
        title: book.title,
        author: book.author,
        status: 'wishlist',
        cover: book.cover,
        progress: 0
      });
    }
    setAddedIds((prev) => [...prev, book.id]);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm text-gray-400">Good morning, 👋</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Welcome back, Riley!</h2>
          <p className="mt-2 text-gray-300">You have 3 books to finish this month</p>
          <button
            type="button"
            onClick={() => onNavigate?.('mybooks', { filter: 'reading' })}
            className="mt-5 rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Continue Reading →
          </button>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm text-gray-400">Reading vibe</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Book stack</h3>
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
            <div className="h-10 w-20 -rotate-6 rounded-lg bg-purple-500/60 shadow-lg" />
            <div className="h-10 w-20 rotate-2 rounded-lg bg-blue-500/60 shadow-lg" />
            <div className="h-10 w-20 -rotate-3 rounded-lg bg-emerald-500/60 shadow-lg" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => onNavigate?.('mybooks', { filter: 'finished' })}
          className="text-left"
        >
          <StatsCard
            icon={BookOpen}
            iconBg="bg-purple-600/60"
            value="24"
            label="Books Read"
            trend="+3 this month"
            trendColor="text-emerald-400"
          />
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('mybooks', { filter: 'reading' })}
          className="text-left"
        >
          <StatsCard
            icon={BookMarked}
            iconBg="bg-blue-500/60"
            value="2"
            label="Reading Now"
            trend="In progress"
            trendColor="text-amber-300"
          />
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('wishlist')}
          className="text-left"
        >
          <StatsCard
            icon={Heart}
            iconBg="bg-pink-500/60"
            value="12"
            label="Wishlist"
            trend="+5 this week"
            trendColor="text-emerald-400"
          />
        </button>
        <button
          type="button"
          onClick={() => onOpenShare?.()}
          className="text-left"
        >
          <StatsCard
            icon={Share2}
            iconBg="bg-emerald-500/60"
            value="7"
            label="Books Shared"
            trend="With friends"
            trendColor="text-gray-400"
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Currently Reading 📖</h3>
        <button
          type="button"
          onClick={() => onNavigate?.('mybooks', { filter: 'reading' })}
          className="text-sm text-purple-300 transition hover:text-purple-200"
        >
          See all →
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ReadingProgress
          title="Atomic Habits"
          author="James Clear"
          progress={65}
          coverClass="bg-purple-500/40"
          onContinue={() => onOpenReading?.({
            title: 'Atomic Habits',
            author: 'James Clear',
            progress: 65,
            cover: 'bg-purple-500/40'
          })}
        />
        <ReadingProgress
          title="The Midnight Library"
          author="Matt Haig"
          progress={30}
          coverClass="bg-blue-500/40"
          onContinue={() => onOpenReading?.({
            title: 'The Midnight Library',
            author: 'Matt Haig',
            progress: 30,
            cover: 'bg-blue-500/40'
          })}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Reading Activity 📊</h3>
              <p className="text-sm text-gray-400">Pages read per day</p>
            </div>
            <TrendingUp size={18} className="text-emerald-400" />
          </div>
          <div className="mt-6 grid grid-cols-[auto,1fr] gap-4">
            <div className="flex flex-col justify-between text-xs text-gray-500">
              <span>15</span>
              <span>10</span>
              <span>5</span>
              <span>0</span>
            </div>
            <div className="flex h-36 items-end gap-3">
              {bars.map((height, index) => (
                <div
                  key={days[index]}
                  className="relative flex flex-col items-center gap-2"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === index && (
                    <div className="absolute -top-10 rounded-lg border border-white/10 bg-white/90 px-2 py-1 text-[11px] text-black">
                      {days[index]}: {pages[index]} pages
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => alert(`${days[index]}: ${pages[index]} pages`)}
                    className="h-32 w-6 rounded-t-lg bg-purple-600/60 transition hover:bg-purple-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{days[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Recommended for You ✨</h3>
          <p className="text-sm text-gray-400">Based on your reading history</p>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {recommended.map((book) => (
              <div
                key={book.id}
                className="min-w-[160px] rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className={`h-32 w-full rounded-xl ${book.cover}`} />
                <h4 className="mt-3 truncate text-sm font-semibold text-white">{book.title}</h4>
                <p className="text-xs text-purple-300">{book.author}</p>
                <p className="mt-2 text-xs text-amber-300">{book.rating}</p>
                <button
                  type="button"
                  onClick={() => handleAddRecommended(book)}
                  disabled={libraryTitles.has(book.title) || addedIds.includes(book.id)}
                  className={`mt-3 w-full rounded-lg py-2 text-xs font-semibold transition ${
                    libraryTitles.has(book.title)
                      ? 'bg-purple-600/40 text-white'
                      : addedIds.includes(book.id)
                      ? 'bg-emerald-600/70 text-white'
                      : 'bg-purple-600/80 text-white hover:bg-purple-500'
                  }`}
                >
                  {libraryTitles.has(book.title)
                    ? '📚 In Library'
                    : addedIds.includes(book.id)
                    ? '✓ Added'
                    : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ActivityFeed onNavigate={onNavigate} />
    </div>
  );
};

export default DashboardView;
