import { Pencil, X, User } from 'lucide-react';
import { useState } from 'react';

/* ── Edit-Name Modal ─────────────────────────────────────────────────── */
const EditNameModal = ({ currentName, onSave, onClose }) => {
  const [draft, setDraft] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (draft.trim()) onSave(draft.trim());
  };

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* modal card – stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-sm animate-[fadeInUp_0.2s_ease] rounded-2xl border border-white/10 bg-[#1a1025] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close btn */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
          <User size={22} />
        </div>

        <h2 className="mb-1 text-center text-lg font-semibold text-white">Edit Display Name</h2>
        <p className="mb-6 text-center text-sm text-gray-400">Update how your name appears across BookNest.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-name-input" className="mb-1.5 block text-xs font-medium text-gray-400">
              Display Name
            </label>
            <input
              id="edit-name-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none ring-purple-500 transition placeholder:text-gray-600 focus:border-purple-500 focus:ring-1"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!draft.trim()}
              className="flex-1 rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* keyframe for entry animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
};

/* ── ProfileView ─────────────────────────────────────────────────────── */
const ProfileView = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user?.name || 'Riley');
  const [notificationsOn, setNotificationsOn] = useState(true);
  const initial = name?.charAt(0)?.toUpperCase() || 'R';

  const handleSave = (newName) => {
    setName(newName);
    setShowModal(false);
    const stored = localStorage.getItem('bn_user');
    try {
      const parsed = stored ? JSON.parse(stored) : {};
      localStorage.setItem('bn_user', JSON.stringify({ ...parsed, name: newName }));
    } catch {
      localStorage.setItem('bn_user', JSON.stringify({ name: newName, email: user?.email, role: 'customer' }));
    }
  };

  return (
    <>
      {showModal && (
        <EditNameModal
          currentName={name}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,2fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-3xl font-semibold text-white">
            {initial}
          </div>
          <button type="button" className="mt-3 text-xs text-purple-300">
            Change Photo
          </button>

          {/* name row – pencil also opens modal */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-gray-400 transition hover:text-purple-400"
              title="Edit name"
            >
              <Pencil size={16} />
            </button>
          </div>

          <p className="text-sm text-gray-400">{user?.email || 'riley@example.com'}</p>
          <span className="mt-3 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
            Customer
          </span>
          <p className="mt-3 text-xs text-gray-400">Member since: May 2024</p>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="mt-5 w-full rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">Reading Stats</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">Books Read</p>
                <p className="text-xl font-semibold text-white">24</p>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">Pages Read</p>
                <p className="text-xl font-semibold text-white">6,420</p>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">Books Shared</p>
                <p className="text-xl font-semibold text-white">7</p>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">Reviews Written</p>
                <p className="text-xl font-semibold text-white">5</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">Preferences</h3>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Favorite Genres</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Fiction', 'Self-Help', 'Science'].map((genre) => (
                  <span key={genre} className="rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
                    {genre}
                  </span>
                ))}
                <button type="button" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  + Add Genre
                </button>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-gray-300">Notifications</span>
              <button
                type="button"
                onClick={() => setNotificationsOn((prev) => !prev)}
                className={`relative h-7 w-12 rounded-full transition ${notificationsOn ? 'bg-purple-600' : 'bg-white/10'
                  }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${notificationsOn ? 'left-6' : 'left-1'
                    }`}
                />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-300">Dark mode</span>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;

