const WishlistView = ({ books, onRemove }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Wishlist ❤️</h2>
          <p className="text-sm text-gray-400">Save picks you want to buy next.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
            {books.length} Books
          </span>
          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition hover:bg-white/10"
          >
            Share Wishlist
          </button>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur">
          <h3 className="text-lg font-semibold text-white">❤️ Your wishlist is empty</h3>
          <p className="text-sm text-gray-400">Browse books to add new favorites</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.id || book.key}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-purple-500/30 hover:bg-white/10"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
                {book.thumbnail || book.coverUrl ? (
                  <img
                    src={book.thumbnail || book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center text-4xl ${book.cover || 'bg-purple-500/20'}`}>
                    📖
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] text-white">
                  {book.badge || 'Wishlist'}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h4 className="line-clamp-2 text-base font-semibold text-white">{book.title}</h4>
                <p className="line-clamp-1 text-sm text-purple-300">{book.author || 'Unknown Author'}</p>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                    {book.condition || 'New'}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                    {book.seller || 'BookNest'}
                  </span>
                </div>

                <div className="mt-auto pt-4">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-amber-400">
                      ${book.price || '12.99'}
                    </span>
                    <span className="text-xs text-green-400">
                      {book.stock ? `In stock: ${book.stock}` : 'In stock'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-xl bg-purple-600/90 py-2 text-xs font-semibold text-white transition hover:bg-purple-500"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(book)}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2 text-xs text-gray-400 transition hover:bg-white/10 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistView;
