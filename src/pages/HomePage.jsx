import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import FeatureSection from '../components/FeatureSection.jsx';
import DownloadCTA from '../components/DownloadCTA.jsx';
import Footer from '../components/Footer.jsx';
import {
  ArrowRight,
  BookOpen,
  Heart,
  ScanLine,
  Search,
  Sparkles,
  Star
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-[#0d0d1a] text-white">
      <Navbar />
      <main>
        <Hero />

        <FeatureSection
          id="features"
          label="MANAGE"
          title={['Book', 'Inventory']}
          body={[
            'Effortlessly manage your book collection. Add books quickly by scanning the ISBN barcode or manually entering the details.',
            'Add custom fields to track purchase date, condition, or reading status.'
          ]}
          mockupContent={
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-200">Search your library...</div>
              {[
                { title: 'Atomic Habits', author: 'James Clear', status: 'Reading', color: 'bg-purple-500/60' },
                { title: 'Dune', author: 'Frank Herbert', status: 'Finished', color: 'bg-emerald-500/60' },
                { title: 'Fourth Wing', author: 'R. Yarros', status: 'Wishlist', color: 'bg-sky-500/60' },
                { title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'Reading', color: 'bg-purple-500/60' }
              ].map((book) => (
                <div key={book.title} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-9 rounded-lg ${book.color}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{book.title}</p>
                      <p className="text-xs text-slate-300">by {book.author}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    {book.status}
                  </span>
                </div>
              ))}
            </div>
          }
        />

        <FeatureSection
          label="SCAN"
          title={['Scan', 'the ISBN']}
          body={[
            'At a bookstore? Scan the ISBN and instantly see book details, ratings, reviews, and people nearby willing to share — with a single tap!'
          ]}
          reverse
          darkAlt
          mockupContent={
            <div className="space-y-4">
              <div className="relative rounded-3xl border border-dashed border-purple-500/80 p-6 h-48">
                <div className="absolute inset-0 rounded-3xl border border-purple-400/20" />
                <div className="scan-line" />
                <div className="absolute top-4 left-4 h-4 w-4 border-l-2 border-t-2 border-purple-400" />
                <div className="absolute top-4 right-4 h-4 w-4 border-r-2 border-t-2 border-purple-400" />
                <div className="absolute bottom-4 left-4 h-4 w-4 border-l-2 border-b-2 border-purple-400" />
                <div className="absolute bottom-4 right-4 h-4 w-4 border-r-2 border-b-2 border-purple-400" />
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">The Midnight Library</p>
                    <div className="flex items-center gap-1 text-purple-300 text-xs">
                      <Star size={12} /> <Star size={12} /> <Star size={12} /> <Star size={12} /> <Star size={12} />
                    </div>
                  </div>
                  <button className="rounded-full bg-purple-500/80 px-3 py-1 text-xs text-white">
                    Add to Library
                  </button>
                </div>
              </div>
            </div>
          }
        />

        <FeatureSection
          label="SEARCH"
          title={['Search', 'billions of books']}
          body={[
            'Search billions of books from Google Play Books. Search by title, author, category, or ISBN and get results with all variations of the book.'
          ]}
          mockupContent={
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm flex items-center gap-2 text-slate-300">
                <Search size={16} /> Search for a title or author
              </div>
              {[
                { title: 'A Little Life', author: 'Hanya Yanagihara' },
                { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin' },
                { title: 'The Silent Patient', author: 'Alex Michaelides' }
              ].map((book) => (
                <div key={book.title} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-9 rounded-lg bg-purple-500/40" />
                    <div>
                      <p className="text-sm font-medium text-white">{book.title}</p>
                      <p className="text-xs text-slate-300">{book.author}</p>
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-purple-500/80 text-white flex items-center justify-center">
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          }
        />

        <FeatureSection
          label="CONNECT"
          title={['Connect', 'with other Book-Worms']}
          body={[
            'See what others are reading, follow people with similar tastes, request books, and get recommendations from your community!'
          ]}
          reverse
          darkAlt
          mockupContent={
            <div className="space-y-3">
              {[
                { name: 'Tina', book: 'The Atlas Six' },
                { name: 'Ravi', book: 'The Alchemist' },
                { name: 'Maya', book: 'Lessons in Chemistry' }
              ].map((user) => (
                <div key={user.name} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-purple-500/50 flex items-center justify-center text-xs">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm text-white">{user.name}</p>
                      <p className="text-xs text-slate-300">reading: {user.book}</p>
                    </div>
                  </div>
                  <button className="rounded-full border border-purple-400/60 px-3 py-1 text-xs text-purple-200">
                    Follow
                  </button>
                </div>
              ))}
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-xs text-slate-300">
                "Any thriller recs for the weekend?"
              </div>
            </div>
          }
        />

        <FeatureSection
          label="REVIEW"
          title={['Review', 'Books']}
          body={[
            'Share your thoughts with book lovers worldwide. Write reviews, rate books, and read community reviews before your next read.'
          ]}
          mockupContent={
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-9 rounded-lg bg-purple-500/50" />
                  <div>
                    <p className="text-sm text-white">The Seven Husbands of Evelyn Hugo</p>
                    <p className="text-xs text-slate-300">Taylor Jenkins Reid</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`star-${index}`} size={14} />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-white/10" />
                <div className="h-2 rounded-full bg-white/10 w-5/6" />
                <div className="h-2 rounded-full bg-white/10 w-4/6" />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="h-8 w-8 rounded-full bg-purple-500/40" />
                <div className="h-8 w-8 rounded-full bg-purple-500/30" />
                <div className="h-8 w-8 rounded-full bg-purple-500/20" />
                <span>+150 reviews</span>
              </div>
            </div>
          }
        />

        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
