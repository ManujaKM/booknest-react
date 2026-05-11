import { BookOpen, Lock, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

const PREVIEW_PARAGRAPHS = [
  "The morning air carried the scent of old paper and possibility. She stood at the threshold of the bookshop — not the grand kind with marble steps, but the quiet, forgotten kind tucked between a laundromat and a florist on Elm Street. The kind of place that exists in a city's memory more than its map.",
  "Inside, floor-to-ceiling shelves bowed gently under the weight of ten thousand stories. Dust motes drifted through slanted light. A cat — orange, imperious — regarded her from atop a dictionary before returning to its nap. This was the beginning of everything she would later call her real education.",
  "The bookseller, a woman whose age seemed to shift depending on the angle of light, looked up from her ledger without surprise, as though she had been expecting this particular visitor for quite some time.",
];

const BookPreviewModal = ({ book, onClose }) => {
  const [tab, setTab] = useState('preview');

  /* derive a deterministic mock price from the book id */
  const price = book.price || `$${((String(book.id || '').length % 12) + 8)}.99`;
  const rating = book.rating || '4.5 ★';

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#0d0d1a] text-white">
      {/* ── Header ── */}
      <header className="flex items-center justify-between border-b border-white/10 bg-[#131325] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 transition hover:bg-red-500/20 hover:text-red-400"
          >
            <X size={20} />
          </button>
          <div>
            <h2 className="max-w-[200px] truncate text-sm font-bold md:max-w-md">{book.title}</h2>
            <p className="text-xs text-purple-400">{book.author}</p>
          </div>
        </div>
        <span className="rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
          Free Preview · Ch. 1
        </span>
      </header>

      {/* ── Body ── */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-shrink-0 flex-col border-r border-white/10 bg-black/20 p-6 lg:flex">
          <div
            className={`flex aspect-[2/3] w-full items-center justify-center rounded-2xl ${book.cover || 'bg-purple-500/30'}`}
          >
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={book.title} className="h-full w-full rounded-2xl object-cover" />
            ) : (
              <BookOpen size={36} className="text-white/30" />
            )}
          </div>
          <h3 className="mt-4 font-semibold text-white">{book.title}</h3>
          <p className="text-sm text-purple-300">{book.author}</p>
          <p className="mt-1 text-xs text-amber-300">{rating}</p>

          <div className="mt-auto space-y-3 pt-6">
            <p className="text-2xl font-bold text-white">{price}</p>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500">
              <ShoppingCart size={16} /> Buy Full Book
            </button>
            <button className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-gray-300 transition hover:bg-white/10">
              ❤️ Add to Wishlist
            </button>
          </div>
        </aside>

        {/* Preview content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-16">
          {/* Tabs */}
          <div className="mb-6 flex gap-6 border-b border-white/10">
            {[
              { key: 'preview', label: '📖 Chapter Preview' },
              { key: 'details', label: 'ℹ️ Book Details' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`pb-3 text-sm font-medium transition ${tab === key
                  ? '-mb-px border-b-2 border-purple-500 text-purple-300'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'preview' ? (
            <>
              <h1 className="mb-6 text-2xl font-bold text-white">Chapter 1</h1>
              <div className="space-y-5 leading-relaxed text-gray-300">
                {PREVIEW_PARAGRAPHS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Paywall */}
              <div className="relative mt-6">
                <p className="select-none text-base leading-relaxed text-gray-300 blur-sm">
                  The old woman gestured to a chair beside her desk. "Sit," she said — not a request.
                  "You're here for the same reason they all come. You've run out of world and need more of it."
                  She slid a slim volume across the table without looking at it. "Start here."
                </p>
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-transparent via-[#0d0d1a]/80 to-[#0d0d1a]">
                  <div className="rounded-full border border-purple-500/30 bg-purple-600/20 p-4">
                    <Lock size={26} className="text-purple-400" />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">Preview Ended</p>
                  <p className="mt-1 text-sm text-gray-400">Purchase the full book to keep reading.</p>
                  <p className="mt-5 text-3xl font-bold text-white">{price}</p>
                  <button className="mt-4 flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-500">
                    <ShoppingCart size={16} /> Buy Full Book
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {[
                ['Title', book.title],
                ['Author', book.author],
                ['Category', book.category || 'General'],
                ['Rating', rating],
                ['Price', price],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs text-gray-500">{label}</p>
                  <p className={`font-medium ${label === 'Price' ? 'text-lg font-bold text-white' : label === 'Rating' ? 'text-amber-300' : 'text-white'}`}>
                    {value}
                  </p>
                </div>
              ))}
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500">
                <ShoppingCart size={16} /> Buy Full Book — {price}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile buy bar */}
      <footer className="border-t border-white/10 bg-[#131325] px-6 py-4 lg:hidden">
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-white">{price}</p>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500">
            <ShoppingCart size={16} /> Buy Full Book
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BookPreviewModal;
