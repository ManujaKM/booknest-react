import { useEffect, useState } from 'react';
import { Search, X, ShoppingCart, BookOpen, Store, SlidersHorizontal, Heart } from 'lucide-react';
import { getBooks, seedBooks, STORE_EVENT } from '../../store/bookStore.js';
import CheckoutModal from './CheckoutModal.jsx';

const CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'Self-Help', 'Business', 'Science', 'Tech', 'History', 'Psychology', 'Fantasy', 'Mystery', 'Biography', 'Children', 'Other'];

const BookCard = ({ book, onBuy, onAddToCart, onToggleWishlist, isInCart, isInWishlist }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-purple-500/40 hover:bg-white/[0.07]">
    {/* Cover */}
    <div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-purple-900/40 to-[#0d0d1a]">
      {book.coverUrl
        ? <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover transition group-hover:scale-105" onError={e => e.target.style.display = 'none'} />
        : <div className="flex h-full w-full items-center justify-center"><BookOpen size={40} className="text-purple-400/30" /></div>
      }
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Stock badge */}
      {book.stock < 5 && (
        <span className="absolute top-2 right-2 rounded-full bg-red-500/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          Only {book.stock} left
        </span>
      )}
    </div>

    {/* Info */}
    <div className="flex flex-1 flex-col p-3">
      <p className="line-clamp-2 text-sm font-bold leading-tight text-white">{book.title}</p>
      <p className="mt-0.5 truncate text-xs text-gray-400">{book.author}</p>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
        <Store size={10} className="shrink-0 text-amber-400" />
        <span className="truncate">{book.shopName}</span>
      </div>
      <span className="mt-1.5 inline-block w-fit rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-purple-300">
        {book.category}
      </span>

      <div className="mt-auto pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-emerald-400">${parseFloat(book.price).toFixed(2)}</span>
          <button
            onClick={() => onToggleWishlist(book)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
              isInWishlist
                ? 'border-purple-500/30 bg-purple-600/20 text-purple-300'
                : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Heart size={12} />
            {isInWishlist ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddToCart(book)}
            disabled={book.stock === 0 || isInCart}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={12} />
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={() => onBuy(book)}
            disabled={book.stock === 0}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition shadow-md shadow-purple-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={12} />
            {book.stock === 0 ? 'Out of Stock' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = ({ search, category, onClear, onSeed }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center col-span-full">
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-500/10 border border-purple-500/20">
      <BookOpen size={36} className="text-purple-400/50" />
    </div>
    <h3 className="text-xl font-bold text-white mb-1">No books found</h3>
    <p className="text-sm text-gray-500 mb-6 max-w-xs">
      {search
        ? `No results for "${search}"`
        : category !== 'All'
        ? `No books listed under "${category}" yet`
        : 'No books have been listed by shop owners yet. Check back soon!'}
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(search || category !== 'All') && (
        <button onClick={onClear} className="rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition">
          Clear Filters
        </button>
      )}
      {(!search && category === 'All') && onSeed && (
        <button onClick={onSeed} className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition">
          Add sample books
        </button>
      )}
    </div>
  </div>
);

const BrowseBooksView = ({ onAddToCart, onToggleWishlist, isInCart, isInWishlist }) => {
  const [allBooks, setAllBooks]           = useState([]);
  const [search, setSearch]               = useState('');
  const [category, setCategory]           = useState('All');
  const [sort, setSort]                   = useState('newest');
  const [checkoutBook, setCheckoutBook]   = useState(null);

  const load = () => setAllBooks(getBooks());

  useEffect(() => {
    load();
    window.addEventListener(STORE_EVENT, load);
    return () => window.removeEventListener(STORE_EVENT, load);
  }, []);

  const filtered = allBooks
    .filter(b => category === 'All' || b.category === category)
    .filter(b => {
      const q = search.toLowerCase();
      return !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.shopName?.toLowerCase().includes(q);
    })
    .sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.createdAt - a.createdAt);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Browse Books 🛍️</h1>
        <p className="text-sm text-gray-400">{allBooks.length} book{allBooks.length !== 1 ? 's' : ''} available from our shop owners</p>
      </div>

      {/* Search bar */}
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 focus-within:border-purple-500/50 transition">
        <Search size={18} className="text-gray-400 shrink-0" />
        <input
          className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          placeholder="Search by title, author, or shop…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button onClick={() => setSearch('')}><X size={16} className="text-gray-400 hover:text-white transition" /></button>}
      </div>

      {/* Category pills + Sort */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                category === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={14} className="text-gray-400" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-gray-500">
        Showing <span className="font-semibold text-white">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
        {search && ` for "${search}"`}
        {category !== 'All' && ` in ${category}`}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {filtered.length === 0
          ? (
            <EmptyState
              search={search}
              category={category}
              onClear={() => { setSearch(''); setCategory('All'); }}
              onSeed={allBooks.length === 0 ? () => { seedBooks(); load(); } : null}
            />
          )
          : filtered.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onBuy={setCheckoutBook}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInCart={isInCart?.(book.id)}
              isInWishlist={isInWishlist?.(book.id)}
            />
          ))
        }
      </div>

      {/* Checkout modal */}
      {checkoutBook && <CheckoutModal book={checkoutBook} onClose={() => setCheckoutBook(null)} />}
    </div>
  );
};

export default BrowseBooksView;
