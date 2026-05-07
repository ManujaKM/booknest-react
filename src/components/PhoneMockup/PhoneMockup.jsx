import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Heart, House, Search, User } from 'lucide-react';

const books = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    color: 'bg-purple-500/70',
    description: 'A practical guide to building better habits and breaking bad ones with tiny, consistent changes.'
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    color: 'bg-sky-500/70',
    description: 'A magical library between life and death reveals alternate lives and second chances.'
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    color: 'bg-emerald-500/70',
    description: 'A lone astronaut must save Earth on a mission filled with science, humor, and heart.'
  }
];

const searchChips = ['Atomic Habits', 'Harry Potter', 'Clean Code'];

const toastStyles = {
  library: 'bg-purple-600 text-white',
  wishlist: 'bg-pink-500 text-white',
  warning: 'bg-amber-500 text-white'
};

const PhoneMockup = () => {
  const [activeView, setActiveView] = useState('home');
  const [expandedBook, setExpandedBook] = useState(null);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('bn_library');
    if (saved) {
      setLibraryBooks(JSON.parse(saved));
    }
    const savedWishlist = localStorage.getItem('bn_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bn_library', JSON.stringify(libraryBooks));
  }, [libraryBooks]);

  useEffect(() => {
    localStorage.setItem('bn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    setExpandedBook(null);
  }, [activeView]);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const toggleExpand = (index) => {
    setExpandedBook((prev) => (prev === index ? null : index));
  };

  const handleAddToLibrary = (book, event) => {
    event.stopPropagation();
    if (libraryBooks.includes(book.title)) {
      showToast('⚠️ Already in Library', 'warning');
      return;
    }
    setLibraryBooks((prev) => [...prev, book.title]);
    showToast('✅ Added to Library!', 'library');
  };

  const handleAddToWishlist = (book, event) => {
    event.stopPropagation();
    if (libraryBooks.includes(book.title)) {
      showToast('⚠️ Already in Library', 'warning');
      return;
    }
    if (wishlist.includes(book.title)) {
      showToast('⚠️ Already in Library', 'warning');
      return;
    }
    setWishlist((prev) => [...prev, book.title]);
    showToast('❤️ Added to Wishlist!', 'wishlist');
  };

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) {
      return books;
    }
    const query = searchQuery.toLowerCase();
    return books.filter((book) => book.title.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-purple-600/20 blur-2xl" />
      <div className="relative rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-2xl shadow-purple-900/50 float-slow">
        {toast && (
          <div
            className={`absolute left-4 right-4 top-4 z-20 rounded-2xl px-4 py-2 text-xs transition-all duration-300 toast-slide ${
              toastStyles[toast.type]
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-purple-600/60 flex items-center justify-center">
              <BookOpen size={14} />
            </div>
            <span>BookNest</span>
          </div>
          <button
            type="button"
            className="rounded-full bg-white/10 px-3 py-1"
            onClick={() => {
              setActiveView('library');
              setExpandedBook(null);
            }}
          >
            Library
          </button>
        </div>

        <div className="relative mt-6 min-h-[260px]">
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeView === 'home'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="space-y-3">
              {books.map((book, index) => (
                <div key={book.title} className="space-y-3">
                  <div
                    className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 cursor-pointer transition hover:bg-white/10"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-14 w-10 rounded-lg ${book.color}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{book.title}</p>
                        <p className="text-xs text-slate-300">by {book.author}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleExpand(index);
                      }}
                      className={`transition-transform ${expandedBook === index ? 'rotate-90' : ''}`}
                      aria-label={`Toggle ${book.title}`}
                    >
                      <ArrowRight size={16} className="text-slate-300" />
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedBook === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="rounded-2xl bg-white/5 px-4 py-3 text-xs text-slate-300">
                      <p className="line-clamp-2">{book.description}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={(event) => handleAddToLibrary(book, event)}
                          className="flex-1 rounded-xl bg-white/10 px-2 py-2 text-[11px] text-white"
                        >
                          + Add to Library
                        </button>
                        <button
                          type="button"
                          onClick={(event) => handleAddToWishlist(book, event)}
                          className="flex-1 rounded-xl bg-white/10 px-2 py-2 text-[11px] text-white"
                        >
                          <Heart size={12} className="inline-block mr-1" /> Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeView === 'search'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="space-y-3">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search books..."
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-xs text-white placeholder:text-slate-400 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
                {searchChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="rounded-full bg-white/10 px-3 py-1"
                    onClick={() => setSearchQuery(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredBooks.length === 0 && (
                  <div className="rounded-2xl bg-white/5 px-4 py-6 text-center text-xs text-slate-300">
                    No results
                  </div>
                )}
                {filteredBooks.map((book) => (
                  <div key={book.title} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-9 rounded-lg ${book.color}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{book.title}</p>
                        <p className="text-xs text-slate-300">by {book.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeView === 'library'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setActiveView('home')}
                className="flex items-center gap-2 text-xs text-slate-300"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <div className="text-xs uppercase tracking-wide text-slate-400">My Library</div>
              {libraryBooks.length === 0 ? (
                <div className="rounded-2xl bg-white/5 px-4 py-6 text-center text-xs text-slate-300">
                  Your library is empty.
                </div>
              ) : (
                libraryBooks.map((title) => {
                  const book = books.find((item) => item.title === title);
                  if (!book) {
                    return null;
                  }
                  return (
                    <div key={book.title} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-9 rounded-lg ${book.color}`} />
                        <div>
                          <p className="text-sm font-medium text-white">{book.title}</p>
                          <p className="text-xs text-slate-300">by {book.author}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-300" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeView === 'profile'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'
            }`}
          >
            <div className="rounded-2xl bg-white/5 px-4 py-4 text-xs text-slate-300 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-600/70 flex items-center justify-center text-white">
                  R
                </div>
                <div>
                  <p className="text-sm text-white">Riley</p>
                  <p>3 books this month</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
                  <p className="text-white text-sm">Read: 12</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
                  <p className="text-white text-sm">Wishlist: 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-full bg-white/5 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
          <button type="button" onClick={() => setActiveView('home')}>
            <House size={16} className={activeView === 'home' ? 'text-purple-400' : ''} />
          </button>
          <button type="button" onClick={() => setActiveView('search')}>
            <Search size={16} className={activeView === 'search' ? 'text-purple-400' : ''} />
          </button>
          <button type="button" onClick={() => setActiveView('library')}>
            <BookOpen size={16} className={activeView === 'library' ? 'text-purple-400' : ''} />
          </button>
          <button type="button" onClick={() => setActiveView('profile')}>
            <User size={16} className={activeView === 'profile' ? 'text-purple-400' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
