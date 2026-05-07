import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2, Search, Star, X } from 'lucide-react';
import SkeletonRow from './SkeletonRow.jsx';

const placeholderColors = [
  'bg-purple-500/70',
  'bg-sky-500/70',
  'bg-emerald-500/70',
  'bg-pink-500/70',
  'bg-amber-500/70'
];

const getPlaceholderColor = (title = '') => {
  const code = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return placeholderColors[code % placeholderColors.length];
};

const renderStars = (rating = 0) => {
  if (!rating) {
    return null;
  }
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={`search-star-${index}`} size={10} className={index < Math.round(rating) ? '' : 'text-slate-500'} />
      ))}
    </div>
  );
};

const SearchView = ({
  query,
  onQueryChange,
  onSearch,
  results,
  isLoading,
  error,
  onSelectBook,
  isActive
}) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      onSearch('');
      return;
    }
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const showEmpty = !query.trim() && !isLoading;
  const showError = !!query.trim() && !!error && !isLoading;
  const showNoResults = !!query.trim() && !isLoading && !error && results.length === 0;

  return (
    <div className="mt-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={16} />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search books, authors, ISBN..."
          className="w-full rounded-xl bg-white/10 px-10 py-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-purple-300">
          <Loader2 className="animate-spin" size={14} /> Loading results...
        </div>
      )}

      {showEmpty && (
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-6 text-center text-xs text-slate-300">
          Start typing to search books 📚
        </div>
      )}

      {showError && (
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-6 text-center text-xs text-slate-300">
          Something went wrong. Try again.
        </div>
      )}

      {showNoResults && (
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-6 text-center text-xs text-slate-300">
          No books found for "{query}" 😕
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonRow key={`skeleton-${index}`} />
          ))}
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <div className="space-y-3">
          {results.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="h-12 w-9 rounded-lg object-cover"
                  />
                ) : (
                  <div className={`h-12 w-9 rounded-lg ${getPlaceholderColor(book.title)}`} />
                )}
                <div>
                  <p className="text-sm text-white line-clamp-1">{book.title}</p>
                  <p className="text-xs text-slate-400 line-clamp-1">{book.authors}</p>
                  {renderStars(book.rating)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectBook(book)}
                className="text-slate-300 transition-colors hover:text-white"
                aria-label={`View ${book.title}`}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchView;
