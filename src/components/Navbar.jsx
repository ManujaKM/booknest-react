import { useEffect, useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', to: '#features' },
  { label: 'Download', to: '#download' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? 'backdrop-blur-lg bg-black/40 shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-white font-semibold tracking-wide">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white">
            <BookOpen size={18} />
          </span>
          BookNest
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-white/80">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="transition hover:text-purple-300"
            >
              {link.label}
            </a>
          ))}
          <a href="/login" className="transition hover:text-purple-300">
            Login
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full h-10 w-10 text-white hover:bg-white/10 transition"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d0d1a] md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <a href="#top" className="flex items-center gap-2 text-white font-semibold">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white">
                <BookOpen size={18} />
              </span>
              BookNest
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mt-12 flex flex-col items-center gap-6 text-lg text-white">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="transition hover:text-purple-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              className="transition hover:text-purple-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
