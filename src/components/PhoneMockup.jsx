const books = ['Atomic Habits', 'The Midnight Library', 'Project Hail Mary'];

const PhoneMockup = () => {
  return (
    <div className="relative float-slow">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-purple-600/20 blur-2xl" />
      <div className="relative rounded-[2.5rem] bg-white/5 backdrop-blur border border-white/10 p-6 shadow-2xl shadow-purple-900/40">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20" />
            <div>
              <p className="text-white">Hi, Riley</p>
              <p className="text-[10px] text-slate-400">12 books this month</p>
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">Library</span>
        </div>

        <div className="mt-6 space-y-3">
          {books.map((title) => (
            <div key={title} className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{title}</p>
                <p className="text-xs text-slate-400">Tap to view</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-white/10" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-purple-500/20 px-4 py-3 text-xs text-slate-300">
          Scan ISBN to add a book instantly.
        </div>

        <div className="mt-6 h-12 rounded-2xl bg-white/10 flex items-center justify-around text-xs text-slate-300">
          <span className="font-semibold text-white">Discover</span>
          <span>Library</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
