import { Pencil, Share2, Trash2 } from 'lucide-react';

const statusStyles = {
  reading: 'bg-amber-500/20 text-amber-300',
  finished: 'bg-emerald-500/20 text-emerald-300',
  wishlist: 'bg-pink-500/20 text-pink-300'
};

const statusLabels = {
  reading: '📖 Reading',
  finished: '✅ Finished',
  wishlist: '❤️ Wishlist'
};

const BookCard = ({ book, onRead }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className={`h-40 w-full rounded-xl ${book.cover}`} />
      <h4 className="mt-3 text-base font-semibold text-white">{book.title}</h4>
      <p className="text-sm text-purple-300">{book.author}</p>
      <span className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs ${statusStyles[book.status]}`}>
        {statusLabels[book.status]}
      </span>
      {book.status === 'reading' && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span>{book.progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-purple-500" style={{ width: `${book.progress}%` }} />
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center gap-2">
        {book.status !== 'wishlist' && (
          <button 
            type="button" 
            onClick={() => onRead && onRead(book)}
            className="flex-1 rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-purple-500"
          >
            Read Now
          </button>
        )}
        <button type="button" className="rounded-lg bg-white/5 p-2 text-gray-300 transition hover:bg-white/10">
          <Pencil size={16} />
        </button>
        <button type="button" className="rounded-lg bg-white/5 p-2 text-red-400 transition hover:bg-white/10">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
