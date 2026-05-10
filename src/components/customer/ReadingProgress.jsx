const ReadingProgress = ({ title, author, progress, coverClass, onContinue }) => {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className={`h-24 w-16 rounded-xl ${coverClass}`} />
      <div className="flex-1">
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <p className="text-sm text-purple-300">{author}</p>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-purple-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="mt-4 rounded-lg border border-purple-500/40 px-3 py-2 text-xs text-purple-300 transition hover:bg-purple-600/20"
        >
          Continue Reading
        </button>
      </div>
    </div>
  );
};

export default ReadingProgress;
