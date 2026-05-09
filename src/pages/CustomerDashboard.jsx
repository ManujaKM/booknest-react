import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopbar from '../components/customer/CustomerTopbar.jsx';
import CustomerSidebar from '../components/customer/CustomerSidebar.jsx';
import DashboardView from '../components/customer/DashboardView.jsx';
import MyBooksView from '../components/customer/MyBooksView.jsx';
import SearchBooksView from '../components/customer/SearchBooksView.jsx';
import WishlistView from '../components/customer/WishlistView.jsx';
import ProfileView from '../components/customer/ProfileView.jsx';
import {
  BookOpen,
  Heart,
  LayoutDashboard,
  Search,
  User
} from 'lucide-react';

const hardcodedBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'reading',
    progress: 65,
    cover: 'bg-purple-500/40'
  },
  {
    id: 2,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    status: 'reading',
    progress: 30,
    cover: 'bg-blue-500/40'
  },
  {
    id: 3,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    status: 'finished',
    cover: 'bg-emerald-500/40'
  },
  {
    id: 4,
    title: 'Deep Work',
    author: 'Cal Newport',
    status: 'finished',
    cover: 'bg-amber-500/40'
  },
  {
    id: 5,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    status: 'wishlist',
    cover: 'bg-pink-500/40'
  },
  {
    id: 6,
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'wishlist',
    cover: 'bg-indigo-500/40'
  }
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [myBooks, setMyBooks] = useState(hardcodedBooks);
  const [activeFilter, setActiveFilter] = useState('all');

  const user = useMemo(() => {
    const stored = localStorage.getItem('bn_user');
    if (!stored) {
      return { name: 'Riley', email: 'riley@example.com', role: 'customer' };
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      return { name: 'Riley', email: 'riley@example.com', role: 'customer' };
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('bn_user');
    if (!stored) {
      navigate('/login');
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.role && parsed.role !== 'customer') {
        navigate(`/${parsed.role}/dashboard`);
      }
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bn_user');
    navigate('/login');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowNotifDropdown(false);
    setShowAvatarDropdown(false);
  };

  const mobileTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'mybooks', label: 'Books', icon: BookOpen },
    { id: 'search', label: 'Search', icon: Search },
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
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onSignOut={handleLogout}
      />
      <CustomerSidebar
        user={user}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={handleLogout}
      />

      <main className="pt-20 lg:pl-64 px-4 sm:px-6 lg:px-8 pb-24">
        {activeSection === 'dashboard' && <DashboardView />}
        {activeSection === 'mybooks' && (
          <MyBooksView
            books={myBooks}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}
        {activeSection === 'search' && (
          <SearchBooksView searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        )}
        {activeSection === 'wishlist' && (
          <WishlistView books={myBooks.filter((book) => book.status === 'wishlist')} />
        )}
        {activeSection === 'community' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300 backdrop-blur">
            <h2 className="text-2xl font-bold text-white">Community 👥</h2>
            <p className="mt-3 text-sm text-gray-400">Connect with readers and share your favorite books.</p>
            <button
              type="button"
              className="mt-5 rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Explore Community
            </button>
          </div>
        )}
        {activeSection === 'profile' && <ProfileView user={user} />}
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
    </div>
  );
};

export default CustomerDashboard;
