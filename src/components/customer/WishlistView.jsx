const WishlistView = ({ books }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Wishlist ❤️</h2>
        <span className="rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
          {books.length} Books
        </span>
      </div>

      {books.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur">
          <h3 className="text-lg font-semibold text-white">❤️ Your wishlist is empty</h3>
          <p className="text-sm text-gray-400">Browse books to add new favorites</p>
          <button
            type="button"
            className="mt-5 rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <div key={book.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className={`h-40 w-full rounded-xl ${book.cover}`} />
              <h4 className="mt-3 text-base font-semibold text-white">{book.title}</h4>
              <p className="text-sm text-purple-300">{book.author}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-purple-600/80 py-2 text-xs font-semibold text-white transition hover:bg-purple-500"
                >
                  Move to Library
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-white/5 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;
