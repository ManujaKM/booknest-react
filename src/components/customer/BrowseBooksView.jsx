import { Loader2, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useGoogleBooks } from '../../hooks/useGoogleBooks.js';
import BookCard from './BookCard.jsx';
import BookCardSkeleton from './BookCardSkeleton.jsx';
import PreviewModal from './PreviewModal.jsx';

const CATEGORY_QUERIES = {
  All: 'popular books',
  Fiction: 'subject:fiction',
  'Non-Fiction': 'subject:nonfiction',
  'Self-Help': 'subject:self-help',
  Business: 'subject:business',
  Science: 'subject:science',
  Tech: 'subject:computers',
  History: 'subject:history',
  Psychology: 'subject:psychology',
  Fantasy: 'subject:fantasy',
  Mystery: 'subject:mystery',
  Biography: 'subject:biography'
};

const CATEGORIES = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Self-Help',
  'Business',
  'Science',
  'Tech',
  'History',
  'Psychology',
  'Fantasy',
  'Mystery',
  'Biography'
];

const BrowseBooksView = ({ addToCart, toggleWishlist, isInCart, isInWishlist }) => {
  const { searchBooks, loading, totalItems } = useGoogleBooks();
  const searchBooksRef = useRef(searchBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [startIndex, setStartIndex] = useState(0);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    searchBooksRef.current = searchBooks;
  }, [searchBooks]);

  useEffect(() => {
    loadBooks(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllBooks([]);
    setStartIndex(0);
    loadBooks(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    setAllBooks([]);
    setStartIndex(0);
    loadBooks(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        loadBooks(true);
      }
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadBooks = async (reset = false) => {
    const idx = reset ? 0 : startIndex;
    const query = searchQuery || CATEGORY_QUERIES[selectedCategory] || 'popular books';

    let results = await searchBooksRef.current({
      query,
      maxResults: 20,
      startIndex: idx,
      orderBy: sortBy === 'newest' ? 'newest' : 'relevance'
    });

    if (!results.length && !searchQuery) {
      results = await searchBooksRef.current({
        query: 'bestseller books',
        maxResults: 20,
        startIndex: idx,
        orderBy: sortBy === 'newest' ? 'newest' : 'relevance'
      });
    }

    if (reset) {
      setAllBooks(results);
      setStartIndex(20);
    } else {
      setAllBooks((prev) => [...prev, ...results]);
      setStartIndex((prev) => prev + 20);
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadBooks(false);
    setIsLoadingMore(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Browse Books 🔍</h1>
        <p className="text-gray-400 text-sm">{totalItems.toLocaleString()}+ books available</p>
      </div>

      <div className="flex items-center gap-3 mb-5 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus-within:border-purple-500/50 transition-colors">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!e.target.value) {
              loadBooks(true);
            }
          }}
          placeholder="Search by title, author, or topic..."
          className="bg-transparent outline-none text-white placeholder-gray-500 flex-1 text-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              loadBooks(true);
            }}
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setSearchQuery('');
            }}
            className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === cat
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-gray-400 text-sm">
          Showing <span className="text-white font-medium">{allBooks.length}</span> books
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none cursor-pointer"
        >
          <option value="relevance">Most Relevant</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {loading && allBooks.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array(10).fill(0).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      ) : allBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-white text-xl font-semibold mb-2">No books found</h3>
          <p className="text-gray-400 text-sm mb-6">Try different search terms or browse categories</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {allBooks.map((book) => (
              <BookCard
                key={book.id}
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
            ))}
            {isLoadingMore && Array(4).fill(0).map((_, index) => (
              <BookCardSkeleton key={`more-${index}`} />
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all px-8 py-3 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading more...
                </>
              ) : (
                'Load More Books ↓'
              )}
            </button>
          </div>
        </>
      )}

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

export default BrowseBooksView;
