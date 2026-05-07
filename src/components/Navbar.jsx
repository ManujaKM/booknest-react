import { useEffect, useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Features', to: '#features' },
  { label: 'Download', to: '#download' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
      const features = document.getElementById('features');
      if (features) {
        const rect = features.getBoundingClientRect();
        const inView = rect.top <= 120 && rect.bottom >= 120;
        setActiveSection(inView ? 'features' : null);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLoggedIn = () => localStorage.getItem('bn_user') !== null;

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('bn_user') || '{}');
    return user.role || null;
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (targetId === 'download') {
        window.dispatchEvent(new CustomEvent('highlight-download'));
      }
      return;
    }

    navigate('/');
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      if (targetId === 'download') {
        window.dispatchEvent(new CustomEvent('highlight-download'));
      }
    }, 300);
  };

  const handleAuthClick = () => {
    if (isLoggedIn()) {
      const role = getUserRole();
      if (role) {
        navigate(`/${role}/dashboard`);
      }
      return;
    }
    document.body.classList.add('page-fade-out');
    setTimeout(() => navigate('/login'), 200);
  };

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
              onClick={(event) => handleNavClick(event, link.to.replace('#', ''))}
              className={`transition hover:text-purple-300 ${
                link.label === 'Features' && activeSection === 'features'
                  ? 'border-b-2 border-purple-400 text-white'
                  : ''
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="transition hover:text-purple-300"
            onClick={handleAuthClick}
          >
            {isLoggedIn() ? 'Dashboard' : 'Login'}
          </button>
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
                onClick={(event) => {
                  handleNavClick(event, link.to.replace('#', ''));
                  setIsOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="transition hover:text-purple-300"
              onClick={() => {
                handleAuthClick();
                setIsOpen(false);
              }}
            >
              {isLoggedIn() ? 'Dashboard' : 'Login'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
