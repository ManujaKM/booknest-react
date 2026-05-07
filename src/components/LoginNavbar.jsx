import { BookMarked, ChevronLeft } from 'lucide-react';

const LoginNavbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white font-semibold tracking-wide">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white">
            <BookMarked size={18} />
          </span>
          BookNest
        </a>
        <a href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">
          <ChevronLeft size={16} />
          Back to Home
        </a>
      </div>
    </header>
  );
};

export default LoginNavbar;
