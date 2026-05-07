import { ArrowRight } from 'lucide-react';

const homeBooks = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    color: 'bg-purple-500/70'
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    color: 'bg-sky-500/70'
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    color: 'bg-emerald-500/70'
  }
];

const HomeView = ({ onSelect }) => {
  return (
    <div className="mt-6 space-y-3">
      {homeBooks.map((book) => (
        <div
          key={book.title}
          className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className={`h-12 w-9 rounded-lg ${book.color}`} />
            <div>
              <p className="text-sm text-white">{book.title}</p>
              <p className="text-xs text-slate-400">by {book.author}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelect(book.title)}
            className="text-slate-300 transition-colors hover:text-white"
            aria-label={`View ${book.title}`}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomeView;
