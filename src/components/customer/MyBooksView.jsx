import BookCard from './BookCard.jsx';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'reading', label: 'Reading' },
  { id: 'finished', label: 'Finished' },
  { id: 'wishlist', label: 'Wishlist' }
];

const MyBooksView = ({ books, activeFilter, onFilterChange }) => {
  const filteredBooks =
    activeFilter === 'all' ? books : books.filter((book) => book.status === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">My Library 📚</h2>
          <span className="rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
            {books.length} Books
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onFilterChange(filter.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-purple-600/80 text-white'
                    : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <input
          type="text"
          placeholder="Search your library..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default MyBooksView;
