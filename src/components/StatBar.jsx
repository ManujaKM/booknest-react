const stats = [
  { value: '50,000+', label: 'Books Shared' },
  { value: '10,000+', label: 'Active Readers' },
  { value: '4.8', label: 'Average Rating' }
];

const StatBar = () => {
  return (
    <section className="py-12 sm:py-20 bg-[var(--amber-500)] text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <p className="text-3xl sm:text-4xl font-semibold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatBar;
