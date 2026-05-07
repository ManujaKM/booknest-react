import { Apple, Smartphone } from 'lucide-react';

const CTABanner = () => {
  return (
    <section id="download" className="py-12 sm:py-20 bg-gradient-to-r from-[var(--amber-500)] to-[var(--amber-600)] text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold">Join the Reading Revolution</h2>
        <p className="mt-3 text-slate-800/80">
          Download BookNest free today and start sharing the books you love.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
            <Apple size={18} />
            App Store
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
            <Smartphone size={18} />
            Google Play
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-800/80">
          Free to download · No subscription required
        </p>
      </div>
    </section>
  );
};

export default CTABanner;
