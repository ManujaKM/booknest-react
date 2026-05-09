import { Heart, Search, X } from 'lucide-react';

const popularChips = ['Atomic Habits', 'Harry Potter', 'Self Help', 'Fiction', 'Science'];

const results = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', category: 'Self Help', rating: '★★★★★', cover: 'bg-purple-500/40' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', category: 'Fiction', rating: '★★★★', cover: 'bg-blue-500/40' },
  { id: 3, title: 'Deep Work', author: 'Cal Newport', category: 'Productivity', rating: '★★★★', cover: 'bg-amber-500/40' },
  { id: 4, title: 'Project Hail Mary', author: 'Andy Weir', category: 'Sci-Fi', rating: '★★★★★', cover: 'bg-emerald-500/40' }
];

const SearchBooksView = ({ searchQuery, onSearchChange }) => {
  const filtered = results.filter((book) =>
    `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {searchQuery.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur">
          <Search size={56} className="mx-auto text-gray-600" />
          <h3 className="mt-4 text-lg font-semibold text-white">Search for your next great read</h3>
          <p className="text-sm text-gray-400">Find books by title, author, or category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-gray-400">
              No results found.
            </div>
          )}
          {filtered.map((book) => (
            <div
              key={book.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className={`h-20 w-14 rounded-lg ${book.cover}`} />
              <div className="flex-1">
                <h4 className="text-base font-semibold text-white">{book.title}</h4>
                <p className="text-sm text-purple-300">{book.author}</p>
                <span className="mt-1 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {book.category}
                </span>
              </div>
              <div className="text-sm text-amber-300">{book.rating}</div>
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
