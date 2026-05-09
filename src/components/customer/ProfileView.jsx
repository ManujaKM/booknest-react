import { Pencil } from 'lucide-react';
import { useState } from 'react';

const ProfileView = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Riley');
  const [notificationsOn, setNotificationsOn] = useState(true);
  const initial = name?.charAt(0)?.toUpperCase() || 'R';

  const handleSave = () => {
    setIsEditing(false);
    const stored = localStorage.getItem('bn_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        localStorage.setItem('bn_user', JSON.stringify({ ...parsed, name }));
      } catch (error) {
        localStorage.setItem('bn_user', JSON.stringify({ name, email: user?.email, role: 'customer' }));
      }
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,2fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-3xl font-semibold text-white">
          {initial}
        </div>
        <button type="button" className="mt-3 text-xs text-purple-300">
          Change Photo
        </button>
        <div className="mt-4 flex items-center justify-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
            />
          ) : (
            <h3 className="text-xl font-semibold text-white">{name}</h3>
          )}
          <button type="button" onClick={() => setIsEditing((prev) => !prev)} className="text-gray-400">
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
          onClick={handleSave}
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
              className={`relative h-7 w-12 rounded-full transition ${
                notificationsOn ? 'bg-purple-600' : 'bg-white/10'
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  notificationsOn ? 'left-6' : 'left-1'
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
  );
};

export default ProfileView;
