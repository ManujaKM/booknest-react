import React, { useState, useEffect } from 'react';
import { Heart, Search, X, Loader2 } from 'lucide-react';

const popularChips = ['Atomic Habits', 'Harry Potter', 'Self Help', 'Fiction', 'Science'];

const SearchBooksView = ({ searchQuery, onSearchChange }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchBooks(searchQuery);
      } else {
        setBooks([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=15`
      );
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();

      const mappedBooks = data.docs.map((doc) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] || 'Unknown Author',
        category: doc.subject?.[0] || 'General',
        rating: doc.ratings_average ? `${doc.ratings_average.toFixed(1)} ★` : 'No rating',
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : null
      }));

      setBooks(mappedBooks);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search millions of books..."
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-gray-500"
          />
          {searchQuery && (
            <button type="button" onClick={() => onSearchChange('')} className="text-gray-400">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {popularChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSearchChange(chip)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
          >
            {chip}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
          <p className="mt-4 text-sm">Searching Open Library...</p>
        </div>
      ) : searchQuery.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur">
          <Search size={56} className="mx-auto text-gray-600" />
          <h3 className="mt-4 text-lg font-semibold text-white">Search for your next great read</h3>
          <p className="text-sm text-gray-400">Find books by title, author, or category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
              {error}
            </div>
          )}
          {!error && books.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-gray-400">
              No results found for "{searchQuery}".
            </div>
          )}
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-purple-500/30 hover:bg-white/10"
            >
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} className="h-20 w-14 rounded-lg object-cover shadow-lg" />
              ) : (
                <div className="flex h-20 w-14 items-center justify-center rounded-lg bg-white/10 text-xl">📖</div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="truncate text-base font-semibold text-white">{book.title}</h4>
                <p className="truncate text-sm text-purple-300">{book.author}</p>
                <span className="mt-1 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {book.category}
                </span>
              </div>
              <div className="text-sm text-amber-300 font-medium">{book.rating}</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-purple-600/80 px-3 py-2 text-xs text-white transition hover:bg-purple-500"
                >
                  + Library
                </button>
                <button type="button" className="rounded-lg bg-white/5 p-2 text-pink-300 transition hover:bg-white/10">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBooksView;
