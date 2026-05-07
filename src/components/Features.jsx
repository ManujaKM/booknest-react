import { CheckCircle, Library, ScanLine, Search, Users } from 'lucide-react';

const features = [
  {
    title: 'Manage Your Library',
    icon: Library,
    bullets: [
      'Add books by scanning ISBN barcode',
      'Track reading status and condition',
      'Add custom notes to each book'
    ],
    mockup: (
      <div className="rounded-2xl bg-slate-100 p-4 space-y-3">
        {['Reading List', 'On Loan', 'Favorites'].map((label) => (
          <div key={label} className="flex items-center justify-between rounded-xl bg-white p-3 border border-slate-200">
            <p className="text-sm text-slate-900">{label}</p>
            <span className="text-xs text-slate-500">12</span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: 'Scan Any Book Instantly',
    icon: ScanLine,
    bullets: [
      'Point your camera at any ISBN barcode',
      'See ratings, reviews instantly',
      'Find people nearby willing to share'
    ],
    mockup: (
      <div className="rounded-2xl bg-slate-100 p-6 flex items-center justify-center">
        <div className="h-28 w-28 rounded-full border-2 border-[var(--amber-500)] animate-pulse flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border border-[var(--amber-500)]/70" />
        </div>
      </div>
    )
  },
  {
    title: 'Search Billions of Books',
    icon: Search,
    bullets: [
      'Search by title, author, or category',
      'Powered by Google Play Books database',
      'Add to wishlist or favorites instantly'
    ],
    mockup: (
      <div className="rounded-2xl bg-slate-100 p-4 space-y-4">
        <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-500 border border-slate-200">Search books...</div>
        <div className="space-y-2">
          {['The Silent Patient', 'Educated', 'Dune'].map((title) => (
            <div key={title} className="rounded-xl bg-white px-3 py-2 text-sm text-slate-900 border border-slate-200">
              {title}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Connect with Readers',
    icon: Users,
    bullets: [
      'Follow friends and see what they read',
      'Request books directly from others',
      'Join book clubs and discussions'
    ],
    mockup: (
      <div className="rounded-2xl bg-slate-100 p-4 space-y-3">
        <div className="flex items-center gap-3">
          {['A', 'B', 'C', 'D'].map((initial) => (
            <div key={initial} className="h-10 w-10 rounded-full bg-[var(--amber-500)]/30 text-slate-900 flex items-center justify-center text-sm">
              {initial}
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-500 border border-slate-200">“Can I borrow that thriller?”</div>
        <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-500 border border-slate-200">“Let’s start a weekend club.”</div>
      </div>
    )
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Features</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900">
            Everything You Need to Read Better
          </h2>
          <p className="mt-4 text-slate-600">Powerful features built for book lovers</p>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={feature.title}
                className={`flex flex-col gap-8 md:items-center md:flex-row ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-1/2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg hover:-translate-y-1 transition">
                    {feature.mockup}
                  </div>
                </div>

                <div className="md:w-1/2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--amber-500)] text-[var(--navy-950)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-slate-900">{feature.title}</h3>
                    <div className="mt-4 space-y-3 text-slate-600 text-sm">
                      {feature.bullets.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-[var(--amber-500)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
