import { BookOpen, Heart, ShoppingCart, Star } from 'lucide-react';
import { BADGE_COLORS, COVER_COLORS } from './bookStyles.js';

const BookCard = ({ book, onAddToCart, onToggleWishlist, isInCart, isInWishlist, onPreview }) => {
  return (
    <div
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 cursor-pointer group flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
        ) : null}

        <div
          className={`absolute inset-0 bg-gradient-to-br ${COVER_COLORS[book.color] || COVER_COLORS.purple} flex items-center justify-center ${book.thumbnail ? 'hidden' : 'flex'}`}
          style={{ display: book.thumbnail ? 'none' : 'flex' }}
        >
          <BookOpen className="w-14 h-14 text-white/20" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

        <div className={`absolute top-3 left-3 ${BADGE_COLORS[book.badge] || 'bg-purple-500'} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
          {book.badge}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(book);
          }}
          className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-1.5 hover:bg-black/60 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isInWishlist?.(book.id)
              ? 'fill-red-400 text-red-400'
              : 'text-white/70'
              }`}
          />
        </button>

        {book.stock <= 3 && (
          <div className="absolute bottom-2 left-3 text-amber-400 text-xs font-medium">
            Only {book.stock} left!
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-purple-300 text-xs mb-2">{book.author}</p>

        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${star <= Math.round(Number(book.rating))
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-600'
                }`}
            />
          ))}
          <span className="text-gray-400 text-xs ml-1">({Number(book.rating).toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-amber-400 font-bold text-lg">${book.price}</span>
            <span className="text-gray-500 line-through text-xs">${book.originalPrice}</span>
          </div>
          <span className="text-green-400 text-xs font-bold">
            {Math.round((1 - book.price / book.originalPrice) * 100)}% OFF
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(book);
            }}
            className="flex-none bg-white/10 border border-white/10 text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            Preview
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart?.(book.id)) {
                onAddToCart?.(book);
              }
            }}
            disabled={isInCart?.(book.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all duration-200 ${isInCart?.(book.id)
              ? 'bg-green-600 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
              } text-white`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isInCart?.(book.id) ? 'In Cart' : 'Buy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
