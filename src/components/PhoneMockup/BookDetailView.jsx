import { useMemo, useState } from 'react';
import { ArrowLeft, BookPlus, Heart, Share2, Star } from 'lucide-react';

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
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const filled = index < Math.round(rating);
    return (
      <Star
        key={`star-${index}`}
        size={14}
        className={filled ? 'text-amber-400' : 'text-slate-500'}
      />
    );
  });
  return <div className="flex items-center gap-1">{stars}</div>;
};

const BookDetailView = ({ book, onBack, onAddLibrary, onToggleWishlist, isWishlisted }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = useMemo(() => {
    if (!book?.description) {
      return 'No description available.';
    }
    return book.description;
  }, [book]);

  if (!book) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-xs text-slate-300">
        <ArrowLeft size={14} /> Back
      </button>

      <div className="flex items-center gap-4">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="h-28 w-20 rounded-2xl object-cover"
          />
        ) : (
          <div className={`h-28 w-20 rounded-2xl ${getPlaceholderColor(book.title)}`} />
        )}
        <div>
          <p className="text-xl font-semibold text-white">{book.title}</p>
          <p className="text-sm text-purple-300">{book.authors}</p>
          <div className="mt-2">{renderStars(book.rating)}</div>
          <div className="mt-2 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] text-slate-300">
            📄 {book.pageCount} pages
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-300">
        <p className={isExpanded ? '' : 'line-clamp-3'}>{description}</p>
        {description.length > 120 && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-2 text-purple-300"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onAddLibrary}
          className="w-full rounded-xl bg-purple-600 py-3 text-xs font-semibold text-white transition-colors hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          <BookPlus size={16} /> Add to Library
        </button>
        <button
          type="button"
          onClick={onToggleWishlist}
          className="w-full rounded-xl bg-white/10 border border-white/20 py-3 text-xs font-semibold text-white flex items-center justify-center gap-2"
        >
          <Heart size={16} className={isWishlisted ? 'text-red-400 fill-red-400' : ''} /> Add to Wishlist
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-300">
        <Share2 size={14} /> Share this book
      </div>
    </div>
  );
};

export default BookDetailView;
