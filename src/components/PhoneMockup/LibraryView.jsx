import { ArrowRight, X } from 'lucide-react';

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

const statusStyles = {
  Reading: 'bg-purple-500/30 text-purple-200',
  Finished: 'bg-emerald-500/30 text-emerald-200',
  Wishlist: 'bg-pink-500/30 text-pink-200'
};

const LibraryView = ({ books, onSelectBook, onDeleteBook, onSearchClick }) => {
  if (books.length === 0) {
    return (
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-6 text-center text-xs text-slate-300">
          Your library is empty. Search and add books! 📖
        </div>
        <button
          type="button"
          onClick={onSearchClick}
          className="w-full rounded-xl bg-purple-600 py-3 text-xs font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Search Books
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {books.map((book) => (
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] ${
                statusStyles[book.status] || statusStyles.Reading
              }`}
            >
              {book.status || 'Reading'}
            </span>
            <button
              type="button"
              onClick={() => onSelectBook(book)}
              className="text-slate-300 transition-colors hover:text-white"
              aria-label={`View ${book.title}`}
            >
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => onDeleteBook(book.id)}
              className="h-8 w-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center"
              aria-label={`Remove ${book.title}`}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryView;
