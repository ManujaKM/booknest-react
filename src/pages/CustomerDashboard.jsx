import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTopbar from '../components/customer/CustomerTopbar.jsx';
import CustomerSidebar from '../components/customer/CustomerSidebar.jsx';
import DashboardView from '../components/customer/DashboardView.jsx';
import MyBooksView from '../components/customer/MyBooksView.jsx';
import SearchBooksView from '../components/customer/SearchBooksView.jsx';
import WishlistView from '../components/customer/WishlistView.jsx';
import ProfileView from '../components/customer/ProfileView.jsx';
import CommunityView from '../components/customer/community/CommunityView.jsx';
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

  const handleSectionChange = (section, options = {}) => {
    setActiveSection(section);
    if (options.filter) {
      setActiveFilter(options.filter);
    }
    setShowNotifDropdown(false);
    setShowAvatarDropdown(false);
  };

  const toggleWishlist = (book) => {
    setMyBooks((prev) => {
      const isExist = prev.find((b) => b.id === book.id || b.key === book.id);
      if (isExist) {
        // If it's already in myBooks, just toggle status if it was wishlist, 
        // or remove it if it was added from search
        if (isExist.status === 'wishlist') {
          return prev.filter((b) => b.id !== book.id && b.key !== book.id);
        }
        return prev;
      }

      // If it's a new book from search
      return [
        ...prev,
        {
          ...book,
          id: book.id,
          key: book.id,
          status: 'wishlist',
          progress: 0,
        }
      ];
    });
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
        {activeSection === 'dashboard' && (
          <DashboardView
            onNavigate={handleSectionChange}
            onOpenReading={() => handleSectionChange('mybooks', { filter: 'reading' })}
          />
        )}
        {activeSection === 'mybooks' && (
          <MyBooksView
            books={myBooks}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}
        {activeSection === 'search' && (
          <SearchBooksView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleWishlist={toggleWishlist}
            wishlist={myBooks.filter(b => b.status === 'wishlist')}
          />
        )}
        {activeSection === 'wishlist' && (
          <WishlistView
            books={myBooks.filter((book) => book.status === 'wishlist')}
            onRemove={toggleWishlist}
          />
        )}
        {activeSection === 'community' && <CommunityView user={user} />}
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
