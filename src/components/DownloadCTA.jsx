import { Apple, Smartphone } from 'lucide-react';

const DownloadCTA = () => {
  return (
    <section id="download" className="py-20 bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm tracking-[0.3em] text-purple-400">LET'S CHANGE HOW WE READ BOOKS!</p>
        <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white leading-tight">
          Join the <span className="text-purple-400">first wave</span> of the
          <br />
          <span className="text-purple-400">revolutionary</span> book sharing platform.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-6 py-3 transition hover:bg-gray-100">
            <Apple size={18} /> App Store
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl border-2 border-white text-white px-6 py-3 transition hover:bg-white/10">
            <Smartphone size={18} /> Google Play
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">Free to download · Available on iOS & Android</p>
      </div>
    </section>
  );
};

export default DownloadCTA;
