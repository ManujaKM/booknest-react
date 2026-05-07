import { User } from 'lucide-react';
import { useState } from 'react';

const ProfileView = () => {
  const [name, setName] = useState('Riley');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <div>
            {isEditing ? (
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setIsEditing(false)}
                className="rounded-lg bg-white/10 px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                autoFocus
              />
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="text-left">
                <p className="text-sm text-white">{name}</p>
              </button>
            )}
            <p className="text-xs text-slate-400">12 books this month</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
          <div className="rounded-xl bg-white/5 border border-white/10 px-2 py-2">
            <p className="text-white font-semibold">24</p>
            <p>Books Read</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-2 py-2">
            <p className="text-white font-semibold">3</p>
            <p>Reading</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-2 py-2">
            <p className="text-white font-semibold">7</p>
            <p>Wishlist</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-xl border border-red-400/40 py-3 text-xs font-semibold text-red-300"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileView;
