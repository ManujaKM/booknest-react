import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Sidebar from '../../components/admin/Sidebar.jsx';

const AdminProfile = () => {
  const { admin, logout, updateAdmin } = useAuth();
  const [form, setForm] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phone: admin?.phone || '',
    bio: admin?.bio || ''
  });
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSaveProfile = () => {
    const updated = { ...admin, ...form };
    updateAdmin(updated);
    alert('Profile updated!');
  };

  const handleChangePassword = () => {
    if (passwords.newPass !== passwords.confirm) {
      alert('Passwords do not match');
      return;
    }
    alert('Password updated!');
  };

  const getStrength = (value) => {
    if (!value) return 0;
    let strength = 0;
    if (value.length >= 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    return strength;
  };

  const strength = getStrength(passwords.newPass);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#f87171', '#fbbf24', '#60a5fa', '#34d399'][strength];

  const initials = admin?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AU';

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <Sidebar />
      <main className="admin-shell">
        <div className="profile-page">
          <div className="profile-grid">
            <div className="card profile-info-card">
              <div className="profile-avatar-lg">{initials}</div>
              <div className="profile-name">{admin?.name || 'Admin User'}</div>
              <span className="badge badge-purple">{admin?.role || 'Super Admin'}</span>
              <div className="profile-meta">
                <div><i className="ti ti-mail" /> {admin?.email || 'admin@booknest.com'}</div>
                <div><i className="ti ti-phone" /> {admin?.phone || 'Not set'}</div>
                <div><i className="ti ti-clock" /> Last login: Today 9:41 AM</div>
                <div><i className="ti ti-calendar" /> Since: Jan 1, 2026</div>
              </div>
            </div>

            <div className="profile-right">
              <div className="card">
                <div className="card-title">Edit Profile</div>
                <div className="form-row-2">
                  <div>
                    <label>Full Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label>Bio</label>
                  <textarea
                    rows={3}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
                <button className="btn-primary" onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>

              <div className="card">
                <div className="card-title">Change Password</div>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                />
                {passwords.newPass && (
                  <div className="strength-bar">
                    <div
                      style={{
                        width: `${strength * 25}%`,
                        height: '4px',
                        background: strengthColor,
                        borderRadius: '2px',
                        transition: 'all 0.3s'
                      }}
                    />
                    <span style={{ color: strengthColor, fontSize: '11px' }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                />
                <button className="btn-primary" onClick={handleChangePassword}>
                  Update Password
                </button>
              </div>

              <div className="card danger-zone">
                <div className="card-title" style={{ color: '#f87171' }}>
                  Danger Zone
                </div>
                <p style={{ color: '#8a8fa8', fontSize: '13px', marginBottom: '12px' }}>
                  Once you delete your account, there is no going back.
                </p>
                <button className="btn-danger" onClick={() => setShowConfirmDelete(true)}>
                  Delete Admin Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showConfirmDelete && (
        <div className="modal-overlay open">
          <div className="modal">
            <div style={{ color: '#f87171', fontSize: '16px', fontWeight: 700, marginBottom: 12 }}>
              Delete Account?
            </div>
            <p style={{ color: '#8a8fa8', fontSize: '13px', marginBottom: 20 }}>
              This will permanently delete your admin account. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                className="btn-cancel"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  localStorage.clear();
                  logout();
                }}
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
