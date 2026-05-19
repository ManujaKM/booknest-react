import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopbar from '../components/customer/CustomerTopbar.jsx';
import CustomerSidebar from '../components/customer/CustomerSidebar.jsx';
import DashboardView from '../components/customer/DashboardView.jsx';
import BrowseBooksView from '../components/customer/BrowseBooksView.jsx';
import WishlistView from '../components/customer/WishlistView.jsx';
import ProfileView from '../components/customer/ProfileView.jsx';
import CommunityView from '../components/customer/community/CommunityView.jsx';
import SettingsView from '../components/customer/SettingsView.jsx';
import PreviewModal from '../components/customer/PreviewModal.jsx';
import {
  BookOpen,
  Heart,
  LayoutDashboard,
  User
} from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications] = useState(3);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [previewBook, setPreviewBook] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const [user, setUser] = useState({ name: 'Riley', email: 'riley@example.com', role: 'customer' });

  // Combined auth + user reading effect
  useEffect(() => {
    const readUser = () => {
      const stored = localStorage.getItem('bn_user');
      if (!stored) {
        navigate('/login');
        return;
      }
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.role && parsed.role !== 'customer') {
          navigate(`/${parsed.role}/dashboard`);
          return;
        }
        setUser(parsed);
      } catch {
        navigate('/login');
      }
    };
    readUser();
    window.addEventListener('bn-user-updated', readUser);
    return () => window.removeEventListener('bn-user-updated', readUser);
  }, [navigate]);

  useEffect(() => {
    const updateAvatar = () => {
      const storedAvatar = localStorage.getItem('bn_avatar');
      setAvatarUrl(storedAvatar || '');
    };
    updateAvatar();
    window.addEventListener('bn-avatar-updated', updateAvatar);
    return () => window.removeEventListener('bn-avatar-updated', updateAvatar);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bn_user');
    navigate('/login');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowNotifDropdown(false);
    setShowAvatarDropdown(false);
  };

  const showToast = (message, tone = 'success') => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 2500);
  };

  const isInCart = (id) => cart.some((item) => item.id === id);
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const addToCart = (book) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === book.id)) return prev;
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const toggleWishlist = (book) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === book.id)) {
        return prev.filter((item) => item.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const mobileTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'shop', label: 'Shop', icon: BookOpen },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <CustomerTopbar
        user={user}
        notifications={notifications}
        showNotifDropdown={showNotifDropdown}
        showAvatarDropdown={showAvatarDropdown}
        onToggleNotifications={() => setShowNotifDropdown((prev) => !prev)}
        onToggleAvatar={() => setShowAvatarDropdown((prev) => !prev)}
        onSignOut={handleLogout}
        showSearch={true}
        onNavigate={handleSectionChange}
        onOpenSettings={() => handleSectionChange('settings')}
        onPreview={setPreviewBook}
      />
      <CustomerSidebar
        user={user}
        avatarUrl={avatarUrl}
        stats={{
          booksCount: cart.length + wishlist.length,
          wishlistCount: wishlist.length,
          friendsCount: user?.friendsCount || 0
        }}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={handleLogout}
      />

      <main className="pb-24 pt-20 lg:pl-64 px-4 sm:px-6 lg:px-8">
        {activeSection === 'dashboard' && (
          <DashboardView
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInCart={isInCart}
            isInWishlist={isInWishlist}
            setActiveSection={handleSectionChange}
            showToast={showToast}
          />
        )}
        {activeSection === 'shop' && (
          <BrowseBooksView
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isInCart={isInCart}
            isInWishlist={isInWishlist}
          />
        )}
        {activeSection === 'wishlist' && (
          <WishlistView
            books={wishlist}
            onRemove={toggleWishlist}
          />
        )}
        {activeSection === 'community' && <CommunityView user={user} />}
        {activeSection === 'profile' && <ProfileView user={user} />}
        {activeSection === 'settings' && <SettingsView user={user} />}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between px-6 py-3">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSectionChange(tab.id)}
                className="flex flex-col items-center gap-1 text-xs"
              >
                <Icon className={isActive ? 'text-purple-400' : 'text-gray-400'} size={20} />
                <span className={isActive ? 'text-purple-300' : 'text-gray-400'}>{tab.label}</span>
                {isActive && <span className="h-1 w-1 rounded-full bg-purple-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {toast && (
        <div className="fixed right-6 top-20 z-[70] rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-2xl backdrop-blur">
          {toast.message}
        </div>
      )}

      {previewBook && (
        <PreviewModal
          book={previewBook}
          onClose={() => setPreviewBook(null)}
          onAddToCart={addToCart}
          isInCart={isInCart}
          onToggleWishlist={toggleWishlist}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
