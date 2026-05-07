import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a1a] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white">
          <p className="font-semibold">BookNest</p>
          <p className="text-slate-400">© 2024 All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4 text-white">
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-purple-400 transition">
            <Facebook size={18} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-purple-400 transition">
            <Instagram size={18} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-purple-400 transition">
            <Twitter size={18} />
          </a>
        </div>
        <a href="#top" className="text-sm text-slate-400 hover:text-white transition">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
