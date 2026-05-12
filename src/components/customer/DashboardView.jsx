import { BookOpen, Sparkles, Tag, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGoogleBooks } from '../../hooks/useGoogleBooks.js';
import BookCard from './BookCard.jsx';
import BookCardSkeleton from './BookCardSkeleton.jsx';
import PreviewModal from './PreviewModal.jsx';
import { COVER_COLORS } from './bookStyles.js';

const DashboardView = ({
  addToCart,
  toggleWishlist,
  isInCart,
  isInWishlist,
  setActiveSection,
  showToast
}) => {
  const { searchBooks, loading } = useGoogleBooks();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fallbackFeatured = [
    {
      id: 'fallback-1',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      thumbnail: null,
      rating: 4.7,
      ratingsCount: 3821,
      price: '14.99',
      originalPrice: '19.99',
      badge: 'Bestseller',
      color: 'green',
      stock: 6
    },
    {
      id: 'fallback-2',
      title: 'Deep Work',
      author: 'Cal Newport',
      thumbnail: null,
      rating: 4.4,
      ratingsCount: 2190,
      price: '12.99',
      originalPrice: '17.99',
      badge: 'Editor Pick',
      color: 'amber',
      stock: 9
    },
    {
      id: 'fallback-3',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      thumbnail: null,
      rating: 4.6,
      ratingsCount: 4970,
      price: '11.99',
      originalPrice: '16.99',
      badge: 'Classic',
      color: 'pink',
      stock: 4
    },
    {
      id: 'fallback-4',
      title: 'Dune',
      author: 'Frank Herbert',
      thumbnail: null,
      rating: 4.5,
      ratingsCount: 3420,
      price: '15.99',
      originalPrice: '21.99',
      badge: 'Sci-Fi',
      color: 'blue',
      stock: 3
    },
    {
      id: 'fallback-5',
      title: '1984',
      author: 'George Orwell',
      thumbnail: null,
      rating: 4.3,
      ratingsCount: 4105,
      price: '10.99',
      originalPrice: '14.99',
      badge: 'Popular',
      color: 'purple',
      stock: 12
    }
  ];

  useEffect(() => {
    let isMounted = true;

    searchBooks({ query: 'bestseller fiction 2024', maxResults: 10 }).then((books) => {
      if (!isMounted) return;
      setFeaturedBooks(books.map((book, index) => ({
        ...book,
        badge: ['Bestseller', 'Editor Pick', 'Classic', 'Sci-Fi', 'Popular'][index % 5]
      })));
    });

    searchBooks({ query: 'new books 2025', maxResults: 8 }).then((books) => {
      if (!isMounted) return;
      setNewArrivals(books);
    });

    return () => {
      isMounted = false;
    };
  }, [searchBooks]);

  return (
    <div className="space-y-10 py-4">
      <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border border-white/10 p-8 min-h-[200px] flex items-center justify-between">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-purple-600 via-transparent to-blue-600" />

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold text-white leading-tight mb-3">
            Discover Your Next<br />
            <span className="text-purple-300">Great Read</span>
          </h1>
          <p className="text-gray-300 text-sm mb-6">
            Thousands of titles — preview any book, buy with one click.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setActiveSection?.('shop')}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              Browse Books
            </button>
            <button
              type="button"
              onClick={() => setActiveSection?.('wishlist')}
              className="bg-white/10 border border-white/20 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all"
            >
              My Wishlist →
            </button>
          </div>
        </div>

        <div className="relative hidden md:flex items-center gap-3 mr-4">
          {['purple', 'blue', 'green'].map((color, index) => (
            <div
              key={color}
              className={`w-20 h-28 rounded-xl bg-gradient-to-br ${COVER_COLORS[color]} transform ${index === 0 ? 'rotate-[-8deg]' : index === 1 ? 'rotate-[-2deg]' : 'rotate-[4deg]'} shadow-2xl border border-white/10`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 bg-white/5 border border-amber-500/30 rounded-2xl px-5 py-3">
        <Tag className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span className="text-white text-sm">
          <span className="text-amber-400 font-bold">Summer Sale:</span> 20% off your first order with code
        </span>
        <span
          className="bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-amber-500/30 transition-colors select-all"
          onClick={() => {
            if (navigator?.clipboard) {
              navigator.clipboard.writeText('BOOKNEST20');
            }
            showToast?.('Code copied!');
          }}
        >
          BOOKNEST20
        </span>
        <span className="text-gray-500 text-xs ml-auto">Click to copy</span>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Featured Books
          </h2>
          <button
            type="button"
            onClick={() => setActiveSection?.('shop')}
            className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1"
          >
            View all →
          </button>
        </div>

        <div className="book-row flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent">
          {loading ? (
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex-none w-48">
                <BookCardSkeleton />
              </div>
            ))
          ) : (
            (featuredBooks.length > 0 ? featuredBooks : fallbackFeatured).map((book) => (
              <div key={book.id} className="flex-none w-48">
                <BookCard
                  book={book}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInCart={isInCart}
                  isInWishlist={isInWishlist}
                  onPreview={(selected) => {
                    setSelectedBook(selected);
                    setShowPreview(true);
                  }}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            New Arrivals
          </h2>
          <button
            type="button"
            onClick={() => setActiveSection?.('shop')}
            className="text-purple-400 text-sm hover:text-purple-300"
          >
            View all →
          </button>
        </div>

        <div className="book-row flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent">
          {newArrivals.map((book) => (
            <div key={book.id} className="flex-none w-48">
              <BookCard
                book={book}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInCart={isInCart}
                isInWishlist={isInWishlist}
                onPreview={(selected) => {
                  setSelectedBook(selected);
                  setShowPreview(true);
                }}
              />
            </div>
          ))}
        </div>
      </section>

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

      {showPreview && selectedBook && (
        <PreviewModal
          book={selectedBook}
          onClose={() => setShowPreview(false)}
          onAddToCart={addToCart}
          isInCart={isInCart}
          onToggleWishlist={toggleWishlist}
        />
      )}
    </div>
  );
};

export default DashboardView;
