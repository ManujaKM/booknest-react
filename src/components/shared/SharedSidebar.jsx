import { NavLink, useNavigate } from 'react-router-dom';

const ROLE_LABELS = {
  admin: 'ADMIN',
  customer: 'CUSTOMER',
  shopowner: 'SHOP OWNER',
  delivery: 'DELIVERY',
};

const ROLE_BADGE_CLASS = {
  admin: 'role-badge admin',
  delivery: 'role-badge delivery',
};

const ROLE_ICON = {
  admin: 'ti-book-2',
  customer: 'ti-book-2',
  shopowner: 'ti-book-2',
  delivery: 'ti-package',
};

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]).join('');
  return initials.toUpperCase();
};

const SharedSidebar = ({ navItems, user, role, onLogout, profilePath, avatarUrl }) => {
  const navigate = useNavigate();
  const initials = getInitials(user?.name || user?.shopName || user?.email);
  const roleLabel = ROLE_LABELS[role] || 'USER';
  const roleBadgeClass = ROLE_BADGE_CLASS[role] || 'role-badge';
  const roleIcon = ROLE_ICON[role] || 'ti-book-2';

  return (
    <aside className="shared-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className={`ti ${roleIcon}`} />
        </div>
        <div className="logo-text-wrap">
          <div className="logo-text">BookNest</div>
          <div className={`logo-badge ${role === 'admin' ? 'logo-badge-admin' : role === 'delivery' ? 'logo-badge-delivery' : ''}`}>
            {roleLabel}
          </div>
        </div>
      </div>

      <div
        className="profile-card"
        onClick={() => navigate(profilePath)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            navigate(profilePath);
          }
        }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="avatar-circle" />
        ) : (
          <div className="avatar-circle">{initials}</div>
        )}
        <div className="profile-info">
          <div className="profile-name">{user?.name || user?.shopName || 'User'}</div>
          <div className="profile-email">{user?.email || ''}</div>
          <span className={roleBadgeClass}>{roleLabel}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <i className={`ti ${item.icon}`} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="btn-logout" onClick={onLogout}>
          <i className={`ti ${role === 'delivery' ? 'ti-door-exit' : 'ti-logout'}`} aria-hidden="true" />
          {role === 'delivery' ? 'Sign Out' : 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default SharedSidebar;
