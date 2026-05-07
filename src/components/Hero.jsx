import { Apple, ArrowRight, BookOpen, Home, Search, Smartphone, User } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="top"
      className="pt-24 min-h-screen bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,58,237,0.3)_0%,transparent_60%)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
            Adopt a
            <br />
            Book
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-md">
            Share your love of books with friends and discover new reads, all with the tap of a button.
          </p>
          <p className="mt-4 text-lg text-slate-300 max-w-md">
            Keep track of your collection, share books, and discover reads from people with similar taste.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-6 py-3 transition hover:bg-gray-100">
              <Apple size={18} /> App Store
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border-2 border-white text-white px-6 py-3 transition hover:bg-white/10">
              <Smartphone size={18} /> Google Play
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-purple-600/20 blur-2xl" />
          <div className="relative rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-2xl shadow-purple-900/50 float-slow">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-purple-600/60 flex items-center justify-center">
                  <BookOpen size={14} />
                </div>
                <span>BookNest</span>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1">Library</span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { title: 'Atomic Habits', author: 'James Clear', color: 'bg-purple-500/70' },
                { title: 'The Midnight Library', author: 'Matt Haig', color: 'bg-sky-500/70' },
                { title: 'Project Hail Mary', author: 'Andy Weir', color: 'bg-emerald-500/70' }
              ].map((book) => (
                <div key={book.title} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-14 w-10 rounded-lg ${book.color}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{book.title}</p>
                      <p className="text-xs text-slate-300">by {book.author}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-300" />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-full bg-white/5 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
              <Home size={16} className="text-purple-400" />
              <Search size={16} />
              <BookOpen size={16} />
              <User size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
