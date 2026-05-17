import { useNavigate } from 'react-router-dom';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md">
        {/* Icon */}
        <div className="relative mx-auto w-fit">
          <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-3xl bg-purple-600/10 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <BookOpen size={52} className="text-purple-400/60" />
          </div>
          <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-black text-white shadow-lg shadow-purple-500/30">
            ?
          </span>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <p className="text-8xl font-black text-white/5 select-none leading-none">404</p>
          <div className="-mt-10 space-y-2">
            <h1 className="text-2xl font-bold text-white">Page not found</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              The page you're looking for doesn't exist, or it may have been moved. Let's get you back on track.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-500/20"
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-purple-500/30"
              style={{ opacity: 0.3 + i * 0.12 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
