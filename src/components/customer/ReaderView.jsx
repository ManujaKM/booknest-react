import React, { useState } from 'react';
import { X, Maximize2, Settings, BookOpen, Loader2, Zap } from 'lucide-react';

const ReaderView = ({ book, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Derive the best embed URL
  const bookIdStr = String(book.id || '');
  const isOL = bookIdStr.startsWith('/works/') || bookIdStr.startsWith('/books/');
  const olId = isOL ? bookIdStr.split('/').pop() : null;

  // Use Open Library as primary (more reliable for embedding)
  // Fallback to a search on Open Library if we don't have an ID
  const embedUrl = isOL
    ? `https://openlibrary.org/embed/book/${olId}?ui=embed`
    : `https://openlibrary.org/search?q=${encodeURIComponent(book.title)}&mode=everything`;
  // Note: We use search as a fallback to let user find the book quickly in a friendly UI

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col bg-[#0d0d1a] text-white ${isFullScreen ? 'p-0' : 'p-4 md:p-10'}`}>
      {/* Reader Header */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#131325] px-6 py-2 rounded-t-3xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="rounded-full bg-white/5 p-2 transition hover:bg-red-500/20 hover:text-red-400">
            <X size={20} />
          </button>
          <div>
            <h2 className="text-sm font-bold truncate max-w-[150px] md:max-w-md">{book.title}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-purple-400 font-medium uppercase tracking-widest">{book.author}</span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20">
                <Zap size={10} fill="currentColor" />
                Fast Load
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl bg-white/5 p-2 transition hover:bg-white/10">
            <Settings size={18} />
          </button>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="rounded-xl bg-white/5 p-2 transition hover:bg-white/10"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </header>

      {/* Reader Body - High Speed Iframe */}
      <main className="relative flex-1 overflow-hidden bg-black/20 flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d0d1a] transition-opacity duration-500">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
              <BookOpen className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400" size={24} />
            </div>
            <p className="mt-4 text-xs font-medium text-gray-400 tracking-widest uppercase">Streaming Book Content...</p>
          </div>
        )}

        <iframe
          src={embedUrl}
          className="h-full w-full max-w-6xl bg-white shadow-2xl transition-all duration-700"
          frameBorder="0"
          allowFullScreen
          onLoad={() => setLoading(false)}
          title={book.title}
        ></iframe>
      </main>

      {/* Reader Footer */}
      <footer className="bg-[#131325] px-8 py-4 rounded-b-3xl border-t border-white/10">
        <div className="mx-auto flex max-w-2xl items-center justify-between text-[10px]">
          <div className="flex items-center gap-2 text-gray-400">
            <BookOpen size={14} className="text-purple-400" />
            <span>Digital Archive Stream Enabled</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">Connected to Global Library</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReaderView;
