import {
  Bell,
  Eye,
  Globe,
  KeyRound,
  Lock,
  Moon,
  Palette,
  ShieldAlert,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';

/* ── reusable Toggle ─────────────────────────────────────────────────── */
const Toggle = ({ checked, onChange, id }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-purple-600' : 'bg-white/10'
      }`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-6' : 'left-1'
        }`}
    />
  </button>
);

/* ── Section wrapper ─────────────────────────────────────────────────── */
const Section = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
        <Icon size={18} />
      </div>
      <h2 className="text-base font-semibold text-white">{title}</h2>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

/* ── Row (label + control) ───────────────────────────────────────────── */
const Row = ({ label, description, children }) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <p className="text-sm text-gray-200">{label}</p>
      {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
    </div>
    {children}
  </div>
);

/* ── Divider ─────────────────────────────────────────────────────────── */
const Divider = () => <hr className="border-white/5" />;

/* ═══════════════════════════════════════════════════════════════════════
   SettingsView
═══════════════════════════════════════════════════════════════════════ */
const SettingsView = ({ user }) => {
  /* ── Account ── */
  const [email, setEmail] = useState(user?.email || 'riley@example.com');
  const [language, setLanguage] = useState('en');

  /* ── Appearance ── */
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light' | 'system'

  /* ── Notifications ── */
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifNewsletter, setNotifNewsletter] = useState(false);
  const [notifActivity, setNotifActivity] = useState(true);

  /* ── Privacy ── */
  const [publicProfile, setPublicProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  /* ── Password ── */
  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);
    if (!pwCurrent) { setPwError('Enter your current password.'); return; }
    if (pwNew.length < 8) { setPwError('New password must be at least 8 characters.'); return; }
    if (pwNew !== pwConfirm) { setPwError('Passwords do not match.'); return; }
    setPwSuccess(true);
    setPwCurrent(''); setPwNew(''); setPwConfirm('');
    setTimeout(() => setPwSuccess(false), 3000);
  };

  /* ── Save banner ── */
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'system', label: 'System', icon: Palette },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      {/* ── Page header ── */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your account preferences and privacy.</p>
      </div>

      {/* ── 1. Account ── */}
      <Section icon={User} title="Account">
        <Row label="Email address" description="Used for login and notifications">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-52 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </Row>
        <Divider />
        <Row label="Language" description="Interface display language">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#1a1025] px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
          </select>
        </Row>
      </Section>

      {/* ── 2. Appearance ── */}
      <Section icon={Palette} title="Appearance">
        <p className="text-xs text-gray-500">Choose how BookNest looks to you.</p>
        <div className="mt-1 grid grid-cols-3 gap-3">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={`flex flex-col items-center gap-2 rounded-xl border py-4 text-xs transition ${theme === value
                  ? 'border-purple-500 bg-purple-600/20 text-purple-300'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </Section>

      {/* ── 3. Notifications ── */}
      <Section icon={Bell} title="Notifications">
        <Row label="Email notifications" description="Receive updates via email">
          <Toggle id="notif-email" checked={notifEmail} onChange={setNotifEmail} />
        </Row>
        <Divider />
        <Row label="Push notifications" description="Browser / app push alerts">
          <Toggle id="notif-push" checked={notifPush} onChange={setNotifPush} />
        </Row>
        <Divider />
        <Row label="Activity digest" description="Weekly summary of your reading activity">
          <Toggle id="notif-activity" checked={notifActivity} onChange={setNotifActivity} />
        </Row>
        <Divider />
        <Row label="Newsletter" description="BookNest tips, new releases, and offers">
          <Toggle id="notif-newsletter" checked={notifNewsletter} onChange={setNotifNewsletter} />
        </Row>
      </Section>

      {/* ── 4. Privacy ── */}
      <Section icon={Eye} title="Privacy">
        <Row label="Public profile" description="Let others discover your profile">
          <Toggle id="privacy-public" checked={publicProfile} onChange={setPublicProfile} />
        </Row>
        <Divider />
        <Row label="Show reading activity" description="Friends can see what you're reading">
          <Toggle id="privacy-activity" checked={showActivity} onChange={setShowActivity} />
        </Row>
        <Divider />
        <Row label="Personalisation data" description="Allow BookNest to use reading data for recommendations">
          <Toggle id="privacy-data" checked={dataCollection} onChange={setDataCollection} />
        </Row>
      </Section>

      {/* ── 5. Change Password ── */}
      <Section icon={KeyRound} title="Change Password">
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-gray-400">Current password</label>
            <input
              type="password"
              value={pwCurrent}
              onChange={(e) => setPwCurrent(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">New password</label>
            <input
              type="password"
              value={pwNew}
              onChange={(e) => setPwNew(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Min. 8 characters"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">Confirm new password</label>
            <input
              type="password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Repeat new password"
            />
          </div>

          {pwError && (
            <p className="flex items-center gap-2 text-xs text-red-400">
              <ShieldAlert size={13} /> {pwError}
            </p>
          )}
          {pwSuccess && (
            <p className="text-xs text-emerald-400">✓ Password updated successfully.</p>
          )}

          <button
            type="submit"
            className="mt-1 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
          >
            Update Password
          </button>
        </form>
      </Section>

      {/* ── 6. Danger Zone ── */}
      <Section icon={Lock} title="Danger Zone">
        <Row
          label="Delete account"
          description="Permanently remove your account and all associated data. This cannot be undone."
        >
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </Row>
      </Section>

      {/* ── Save button ── */}
      <div className="flex items-center justify-between pb-4">
        {saved && (
          <p className="text-sm text-emerald-400 animate-pulse">✓ Settings saved!</p>
        )}
        {!saved && <span />}
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-purple-600 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
