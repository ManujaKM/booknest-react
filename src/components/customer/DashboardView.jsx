import { BookMarked, BookOpen, Heart, Share2, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import ActivityFeed from './ActivityFeed.jsx';

const DashboardView = () => {
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
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm text-gray-400">Good morning, 👋</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Welcome back, Riley!</h2>
          <p className="mt-2 text-gray-300">You have 3 books to finish this month</p>
          <button
            type="button"
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
        <StatsCard
          icon={BookOpen}
          iconBg="bg-purple-600/60"
          value="24"
          label="Books Read"
          trend="+3 this month"
          trendColor="text-emerald-400"
        />
        <StatsCard
          icon={BookMarked}
          iconBg="bg-blue-500/60"
          value="2"
          label="Reading Now"
          trend="In progress"
          trendColor="text-amber-300"
        />
        <StatsCard
          icon={Heart}
          iconBg="bg-pink-500/60"
          value="12"
          label="Wishlist"
          trend="+5 this week"
          trendColor="text-emerald-400"
        />
        <StatsCard
          icon={Share2}
          iconBg="bg-emerald-500/60"
          value="7"
          label="Books Shared"
          trend="With friends"
          trendColor="text-gray-400"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Currently Reading 📖</h3>
        <button type="button" className="text-sm text-purple-300 transition hover:text-purple-200">
          See all →
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ReadingProgress
          title="Atomic Habits"
          author="James Clear"
          progress={65}
          coverClass="bg-purple-500/40"
        />
        <ReadingProgress
          title="The Midnight Library"
          author="Matt Haig"
          progress={30}
          coverClass="bg-blue-500/40"
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
                <div key={days[index]} className="flex flex-col items-center gap-2">
                  <div
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
                  className="mt-3 w-full rounded-lg bg-purple-600/80 py-2 text-xs font-semibold text-white transition hover:bg-purple-500"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ActivityFeed />
    </div>
  );
};

export default DashboardView;
