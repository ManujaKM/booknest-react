import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import BookCard from './BookCard.jsx';
import ReaderView from './ReaderView.jsx';

const bars = [60, 45, 80, 55, 95, 70, 50];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MyBooksView = ({ books }) => {
  const [readingBook, setReadingBook] = useState(null);
  const [localBooks, setLocalBooks] = useState(books);
  const filteredBooks = localBooks;

  const handleRead = (book) => {
    setReadingBook(book);
  };

  const handleProgress = (bookId, progress) => {
    setLocalBooks(prev => prev.map(b => b.id === bookId ? { ...b, progress } : b));
  };

  return (
    <div className="space-y-8">
      {readingBook && (
        <ReaderView
          book={readingBook}
          onClose={() => setReadingBook(null)}
          onProgressUpdate={handleProgress}
        />
      )}
      {/* Analytic Diagram Section */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Reading Insights 📈</h3>
            <p className="text-sm text-gray-400">Your weekly reading statistics</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            <TrendingUp size={14} />
            +12% this week
          </div>
        </div>

        <div className="mt-8 grid grid-cols-[auto,1fr] gap-6">
          <div className="flex flex-col justify-between text-xs font-medium text-gray-500 py-2">
            <span>15h</span>
            <span>10h</span>
            <span>5h</span>
            <span>0</span>
          </div>
          <div className="flex h-36 items-end justify-around gap-2 px-2">
            {bars.map((height, index) => (
              <div key={days[index]} className="group relative flex flex-1 flex-col items-center gap-3">
                {/* Tooltip */}
                <div className="absolute -top-10 scale-0 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-black transition group-hover:scale-100">
                  {height}%
                </div>
                <div className="relative w-full max-w-[32px] overflow-hidden rounded-t-lg bg-white/5">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 transition-all duration-500 group-hover:from-purple-500 group-hover:to-blue-400"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">{days[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">My Library 📚</h2>
          <span className="rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
            {books.length} Books
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <input
          type="text"
          placeholder="Search your library..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onRead={handleRead} />
        ))}
      </div>
    </div>
  );
};

export default MyBooksView;
