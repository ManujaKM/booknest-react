import { Apple, Smartphone } from 'lucide-react';
import { useState } from 'react';
import PhoneMockup from './PhoneMockup.jsx';

const Hero = () => {
  const [appRippleKey, setAppRippleKey] = useState(0);
  const [playRippleKey, setPlayRippleKey] = useState(0);

  const triggerRipple = (setKey) => {
    setKey(Date.now());
  };

  const handleAppStoreClick = () => {
    triggerRipple(setAppRippleKey);
    window.open('https://apps.apple.com', '_blank', 'noopener,noreferrer');
  };

  const handleGooglePlayClick = () => {
    triggerRipple(setPlayRippleKey);
    window.open('https://play.google.com', '_blank', 'noopener,noreferrer');
  };

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
            <button
              type="button"
              onClick={handleAppStoreClick}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-2xl bg-white text-black font-semibold px-6 py-3 transition hover:bg-gray-100 hover:scale-105"
            >
              <Apple size={18} /> App Store
              {appRippleKey ? <span key={appRippleKey} className="ripple" /> : null}
            </button>
            <button
              type="button"
              onClick={handleGooglePlayClick}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-2xl border-2 border-white text-white px-6 py-3 transition hover:bg-white hover:text-black hover:scale-105"
            >
              <Smartphone size={18} /> Google Play
              {playRippleKey ? <span key={playRippleKey} className="ripple" /> : null}
            </button>
          </div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
};

export default Hero;
