import { BookOpen, ExternalLink, Heart, ShoppingCart, Star, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BADGE_COLORS, COVER_COLORS } from './bookStyles.js';

const PreviewModal = ({ book, onClose, onAddToCart, isInCart, onToggleWishlist }) => {
  const [expanded, setExpanded] = useState(false);

  const discount = useMemo(() => {
    const original = Number(book.originalPrice || 0);
    const price = Number(book.price || 0);
    if (!original || !price || original <= price) return 0;
    return Math.round((1 - price / original) * 100);
  }, [book.originalPrice, book.price]);

  const stars = Math.round(Number(book.rating || 0));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60"
        >
          <X size={18} />
        </button>

        <div className="grid gap-0 md:grid-cols-[14rem,1fr]">
          <div className="relative h-full min-h-[280px]">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${COVER_COLORS[book.color] || COVER_COLORS.purple}`}>
                <BookOpen className="h-16 w-16 text-white/20" />
              </div>
            )}
          </div>

          <div className="relative max-h-[80vh] overflow-y-auto p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${BADGE_COLORS[book.badge] || 'bg-purple-500'}`}>
                {book.badge || 'Featured'}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white">{book.title}</h2>
            <p className="text-sm text-purple-300">{book.author}</p>
            <p className="mt-1 text-xs text-gray-500">
              {book.publisher || 'Publisher'}
              {book.publishedDate ? ` · ${String(book.publishedDate).slice(0, 4)}` : ''}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= stars ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">{Number(book.rating).toFixed(1)} ({book.ratingsCount})</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-amber-400">${book.price}</span>
              <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
              {discount > 0 && (
                <span className="rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-300">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Condition: {book.condition || 'New'}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Seller: {book.seller || 'BookNest'}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Stock: {book.stock || 0}</span>
            </div>

            <div className="mt-4 text-sm text-gray-300">
              <p className={expanded ? 'leading-relaxed' : 'line-clamp-4 leading-relaxed'}>
                {book.description || 'No description available.'}
              </p>
              {book.description && book.description.length > 160 && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-2 text-xs text-purple-300"
                >
                  {expanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>

            {book.categories?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {book.categories.slice(0, 4).map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => onAddToCart?.(book)}
                disabled={isInCart?.(book.id)}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${isInCart?.(book.id)
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
              >
                <ShoppingCart size={16} />
                {isInCart?.(book.id) ? 'In Cart' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={() => onToggleWishlist?.(book)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-gray-300 transition hover:bg-white/10"
              >
                <Heart size={16} /> Save to Wishlist
              </button>
              <button
                type="button"
                onClick={() => book.previewLink && window.open(book.previewLink, '_blank')}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-gray-300 transition hover:bg-white/10"
              >
                <ExternalLink size={16} /> Preview on Google Books
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Sold by: {book.seller || 'BookNest'} · ⭐4.8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
