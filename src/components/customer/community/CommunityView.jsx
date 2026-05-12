import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  BookOpen,
  Heart,
  Home,
  Image,
  MessageCircle,
  MoreVertical,
  Plus,
  Send,
  Share2,
  Smile,
  TrendingUp,
  UserSearch,
  Users,
  X
} from 'lucide-react';

const emojiList = [
  '😀',
  '😂',
  '😍',
  '🥳',
  '🤓',
  '📚',
  '✨',
  '🔥',
  '👍',
  '💜',
  '🎉',
  '🌙',
  '📝',
  '☕',
  '🌿',
  '🎧',
  '🌟',
  '🧠',
  '🫶',
  '📖'
];

const bookTagOptions = [
  { title: 'Atomic Habits', author: 'James Clear' },
  { title: 'Project Hail Mary', author: 'Andy Weir' },
  { title: 'The Midnight Library', author: 'Matt Haig' },
  { title: 'Sapiens', author: 'Yuval Noah Harari' },
  { title: 'Deep Work', author: 'Cal Newport' }
];

const communityCircles = [
  { name: 'Fiction Lovers', members: 142 },
  { name: 'Self-Help Readers', members: 89 },
  { name: 'Sci-Fi Universe', members: 234 }
];

const suggestedReaders = [
  { id: 'JM', name: 'Julian M.', role: 'Classicist', color: 'from-amber-500 to-orange-700' },
  { id: 'PA', name: 'Prof. Aris', role: 'History Lead', color: 'from-blue-500 to-blue-700' },
  { id: 'SL', name: 'Sasha Lee', role: 'Fiction Fanatic', color: 'from-rose-500 to-pink-700' }
];

const trendingBooks = [
  { id: 1, title: 'Atomic Habits', discussions: 142, color: 'bg-purple-500/50' },
  { id: 2, title: 'The Midnight Library', discussions: 98, color: 'bg-blue-500/50' },
  { id: 3, title: 'Project Hail Mary', discussions: 87, color: 'bg-emerald-500/50' },
  { id: 4, title: 'Sapiens', discussions: 76, color: 'bg-amber-500/50' },
  { id: 5, title: 'Deep Work', discussions: 54, color: 'bg-pink-500/50' }
];

const initialPosts = [
  {
    id: 1,
    author: 'Elias Thorne',
    avatar: 'ET',
    avatarColor: 'from-blue-500 to-blue-700',
    role: 'BIBLIOPHILE',
    time: '2h ago',
    content:
      'Finally finished The Shadow of the Wind by Carlos Ruiz Zafon. The way he describes the Cemetery of Forgotten Books feels like a love letter to every reader who has ever felt lost in a library. Has anyone else explored his other works?',
    likes: 24,
    comments: 8,
    liked: false,
    bookmarked: false,
    image: null,
    taggedBook: null,
    isOwn: false,
    circle: 'Fiction Lovers',
    commentList: [
      { id: 1, name: 'Clara Vance', text: 'That book changed me too.', time: '1h', likes: 2 },
      { id: 2, name: 'Priya Sharma', text: 'Try The Angel Game next.', time: '45m', likes: 1 }
    ]
  },
  {
    id: 2,
    author: 'Clara Vance',
    avatar: 'CV',
    avatarColor: 'from-rose-500 to-pink-700',
    role: 'FICTION FANATIC',
    time: "5h ago · Curating 'Winter Noir'",
    content:
      'Morning light and a new first edition. Something magical about the smell of old paper and the promise of a story yet untold.',
    likes: 112,
    comments: 15,
    liked: false,
    bookmarked: false,
    image: 'gradient',
    taggedBook: null,
    isOwn: false,
    circle: 'Fiction Lovers',
    commentList: [
      { id: 1, name: 'Elias Thorne', text: 'That glow is perfect.', time: '3h', likes: 3 },
      { id: 2, name: 'Riley', text: 'Adding this to my shelf!', time: '2h', likes: 1 }
    ]
  },
  {
    id: 3,
    author: 'Marcus Webb',
    avatar: 'MW',
    avatarColor: 'from-green-500 to-emerald-700',
    role: 'SCI-FI ENTHUSIAST',
    time: '8h ago',
    content:
      'Just started Project Hail Mary and I cannot put it down. The science is accessible yet mind-bending. If you enjoy hard sci-fi with heart, this one is for you.',
    likes: 67,
    comments: 23,
    liked: false,
    bookmarked: false,
    image: null,
    taggedBook: 'Project Hail Mary',
    isOwn: false,
    circle: 'Sci-Fi Universe',
    commentList: [
      { id: 1, name: 'Sasha Lee', text: 'Loved it. The ending is amazing.', time: '4h', likes: 4 },
      { id: 2, name: 'Julian M.', text: 'Science with heart is my favorite.', time: '2h', likes: 2 }
    ]
  },
  {
    id: 4,
    author: 'Riley',
    avatar: 'R',
    avatarColor: 'from-purple-500 to-purple-700',
    role: 'BIBLIOPHILE',
    time: '1d ago',
    content:
      'Halfway through Atomic Habits and already reorganizing my entire reading routine. Small changes, remarkable results — the book truly delivers on its promise.',
    likes: 34,
    comments: 6,
    liked: false,
    bookmarked: false,
    image: null,
    taggedBook: 'Atomic Habits',
    isOwn: true,
    circle: 'Self-Help Readers',
    commentList: [
      { id: 1, name: 'Priya Sharma', text: 'This one is on my list!', time: '22h', likes: 1 },
      { id: 2, name: 'Clara Vance', text: 'Loved the habit stacking chapter.', time: '20h', likes: 2 }
    ]
  },
  {
    id: 5,
    author: 'Priya Sharma',
    avatar: 'PS',
    avatarColor: 'from-pink-500 to-rose-700',
    role: 'HISTORY LEAD',
    time: '2d ago',
    content:
      'Book club meeting recap: We spent two hours discussing the ending of Sapiens and still cannot agree. That is exactly what a good book should do — challenge everything you thought you knew.',
    likes: 89,
    comments: 31,
    liked: false,
    bookmarked: false,
    image: null,
    taggedBook: 'Sapiens',
    isOwn: false,
    circle: 'Self-Help Readers',
    commentList: [
      { id: 1, name: 'Marcus Webb', text: 'I loved that debate.', time: '1d', likes: 2 },
      { id: 2, name: 'Elias Thorne', text: 'The ending is wild indeed.', time: '1d', likes: 1 }
    ]
  }
];

const CommunityView = ({ user }) => {
  const [activeTab, setActiveTab] = useState('latest');
  const [activeFeedSection, setActiveFeedSection] = useState('home');
  const [posts, setPosts] = useState(() => {
    try {
      const stored = localStorage.getItem('bn_community_posts');
      return stored ? JSON.parse(stored) : initialPosts;
    } catch (error) {
      return initialPosts;
    }
  });
  const [newPostText, setNewPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [taggedBook, setTaggedBook] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [showFindReaders, setShowFindReaders] = useState(false);
  const [showCreateCircle, setShowCreateCircle] = useState(false);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [joinedCircles, setJoinedCircles] = useState(['Fiction Lovers']);
  const [savedPosts, setSavedPosts] = useState([]);
  const [postMenuOpen, setPostMenuOpen] = useState(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(null);
  const [selectedBookFilter, setSelectedBookFilter] = useState(null);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [postRows, setPostRows] = useState(2);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const bookSearchRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('bn_community_posts', JSON.stringify(posts));
    } catch (error) {
      // ignore storage failures
    }
  }, [posts]);

  useEffect(() => {
    const handler = (event) => {
      if (showEmojiPicker && emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (showBookSearch && bookSearchRef.current && !bookSearchRef.current.contains(event.target)) {
        setShowBookSearch(false);
      }
      if (postMenuOpen && !event.target.closest('[data-post-menu]')) {
        setPostMenuOpen(null);
      }
      if (shareMenuOpen && !event.target.closest('[data-share-menu]')) {
        setShareMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showEmojiPicker, showBookSearch, postMenuOpen, shareMenuOpen]);

  const name = user?.name || 'Riley';
  const avatarInitial = name.charAt(0).toUpperCase();

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    setSelectedImage({ url, name: file.name });
  };

  const handleRemoveImage = () => {
    if (selectedImage?.url) {
      URL.revokeObjectURL(selectedImage.url);
    }
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddPost = () => {
    if (!newPostText.trim()) {
      return;
    }
    const newPost = {
      id: Date.now(),
      author: isAnonymous ? 'Anonymous Reader' : name,
      avatar: isAnonymous ? '?' : avatarInitial,
      avatarColor: isAnonymous ? 'from-slate-500 to-slate-700' : 'from-purple-500 to-purple-700',
      role: 'BIBLIOPHILE',
      time: 'Just now',
      content: newPostText.trim(),
      image: selectedImage ? selectedImage.url : null,
      taggedBook: taggedBook?.title || null,
      likes: 0,
      comments: 0,
      liked: false,
      bookmarked: false,
      isOwn: true,
      circle: 'Fiction Lovers',
      commentList: []
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostText('');
    setTaggedBook(null);
    setShowBookSearch(false);
    handleRemoveImage();
  };

  const handleLikeToggle = (id) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) {
          return post;
        }
        const liked = !post.liked;
        return { ...post, liked, likes: liked ? post.likes + 1 : post.likes - 1 };
      })
    );
  };

  const handleBookmarkToggle = (id) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) {
          return post;
        }
        const bookmarked = !post.bookmarked;
        if (bookmarked) {
          setSavedPosts((saved) => [...saved, post.id]);
        } else {
          setSavedPosts((saved) => saved.filter((savedId) => savedId !== post.id));
        }
        return { ...post, bookmarked };
      })
    );
  };

  const handleToggleComments = (id) => {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (postId) => {
    const draft = commentDrafts[postId]?.trim();
    if (!draft) {
      return;
    }
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) {
          return post;
        }
        const comment = {
          id: Date.now(),
          name,
          text: draft,
          time: 'Just now',
          likes: 0
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentList: [...post.commentList, comment]
        };
      })
    );
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleLoadMore = () => {
    const morePosts = [
      {
        id: Date.now() + 1,
        author: 'Lena Park',
        avatar: 'LP',
        avatarColor: 'from-blue-500 to-blue-700',
        role: 'CLASSICIST',
        time: '3d ago',
        content: 'Just discovered an annotated edition of Dracula. The footnotes are half the fun.',
        likes: 18,
        comments: 4,
        liked: false,
        bookmarked: false,
        image: null,
        taggedBook: 'Dracula',
        isOwn: false,
        circle: 'Fiction Lovers',
        commentList: []
      },
      {
        id: Date.now() + 2,
        author: 'Niko Reyes',
        avatar: 'NR',
        avatarColor: 'from-emerald-500 to-green-700',
        role: 'SCI-FI ENTHUSIAST',
        time: '3d ago',
        content: 'Finished Leviathan Wakes and I am ready for a full Expanse binge.',
        likes: 42,
        comments: 12,
        liked: false,
        bookmarked: false,
        image: null,
        taggedBook: null,
        isOwn: false,
        circle: 'Sci-Fi Universe',
        commentList: []
      },
      {
        id: Date.now() + 3,
        author: 'Amara Singh',
        avatar: 'AS',
        avatarColor: 'from-amber-500 to-orange-700',
        role: 'BIBLIOPHILE',
        time: '4d ago',
        content: 'If you need a serene read, I highly recommend The House in the Cerulean Sea.',
        likes: 58,
        comments: 9,
        liked: false,
        bookmarked: false,
        image: null,
        taggedBook: 'The House in the Cerulean Sea',
        isOwn: false,
        circle: 'Fiction Lovers',
        commentList: []
      }
    ];
    setPosts((prev) => [...prev, ...morePosts]);
  };

  const handleToggleFollow = (id) => {
    setFollowedUsers((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleToggleCircle = (nameValue) => {
    setJoinedCircles((prev) =>
      prev.includes(nameValue) ? prev.filter((item) => item !== nameValue) : [...prev, nameValue]
    );
  };

  const filteredPosts = useMemo(() => {
    let list = [...posts];
    if (selectedBookFilter) {
      list = list.filter((post) => post.taggedBook === selectedBookFilter);
    }
    if (activeTab === 'popular') {
      list.sort((a, b) => b.likes - a.likes);
    }
    if (activeTab === 'circles') {
      list = list.filter((post) => joinedCircles.includes(post.circle));
    }
    if (activeFeedSection === 'saved') {
      list = list.filter((post) => savedPosts.includes(post.id));
    }
    return activeTab === 'latest' ? list.sort((a, b) => b.id - a.id) : list;
  }, [posts, activeTab, joinedCircles, activeFeedSection, savedPosts, selectedBookFilter]);

  const feedTabs = [
    { id: 'latest', label: 'Latest Conversations' },
    { id: 'popular', label: 'Popular' },
    { id: 'circles', label: 'Your Circles' }
  ];

  const navItems = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'popular', label: 'Popular', icon: TrendingUp },
    { id: 'circles', label: 'My Circles', icon: Users },
    { id: 'saved', label: 'Saved Posts', icon: Bookmark },
    { id: 'discussions', label: 'Book Discussions', icon: BookOpen },
    { id: 'find', label: 'Find Readers', icon: UserSearch }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem,1fr] xl:grid-cols-[16rem,1fr,18rem]">
      <style>{`@keyframes heartBeat {0% {transform: scale(1);} 50% {transform: scale(1.3);} 100% {transform: scale(1);}}`}</style>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white">
              {avatarInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="text-xs text-purple-300">Customer · Bibliophile</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <button
              type="button"
              onClick={() => setShowFindReaders(true)}
              className="rounded-lg px-2 py-1 transition hover:bg-white/5"
            >
              Following: 24
            </button>
            <button
              type="button"
              onClick={() => setShowFindReaders(true)}
              className="rounded-lg px-2 py-1 transition hover:bg-white/5"
            >
              Followers: 18
            </button>
          </div>
          <div className="mt-5 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeFeedSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'find') {
                      setShowFindReaders(true);
                      return;
                    }
                    setActiveFeedSection(item.id);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    isActive
                      ? 'border border-purple-500/30 bg-purple-600/20 text-purple-300'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="mt-6 px-4 text-xs font-semibold tracking-widest text-gray-500">MY CIRCLES</p>
          <div className="mt-2 space-y-2">
            {communityCircles.map((circle) => (
              <button
                key={circle.name}
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5"
              >
                <span>⭕ {circle.name}</span>
                <span className="text-xs text-gray-500">{circle.members}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowCreateCircle(true)}
            className="mt-3 flex items-center gap-2 px-4 text-sm text-purple-300"
          >
            <Plus size={16} /> + Create Circle
          </button>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white">
              {isAnonymous ? '?' : avatarInitial}
            </div>
            <div className="flex-1">
              <textarea
                rows={postRows}
                value={newPostText}
                onChange={(event) => setNewPostText(event.target.value.slice(0, 500))}
                onFocus={() => setPostRows(4)}
                onBlur={() => setPostRows(2)}
                placeholder="Share a thought from your current read..."
                className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
              {newPostText && (
                <p
                  className={`mt-1 text-right text-xs ${
                    newPostText.length > 450 ? 'text-red-400' : 'text-gray-500'
                  }`}
                >
                  {newPostText.length} / 500
                </p>
              )}
              {taggedBook && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
                  @{taggedBook.title}
                  <button type="button" onClick={() => setTaggedBook(null)}>
                    <X size={12} />
                  </button>
                </div>
              )}
              {selectedImage && (
                <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10">
                  <img src={selectedImage.url} alt="Selected" className="h-48 w-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-white/5"
              >
                <Image size={16} /> Image
              </button>
              <div className="relative" ref={bookSearchRef}>
                <button
                  type="button"
                  onClick={() => setShowBookSearch((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-white/5"
                >
                  <BookOpen size={16} /> Tag Book
                </button>
                {showBookSearch && (
                  <div className="absolute left-0 top-10 w-64 rounded-2xl border border-white/10 bg-[#1a1035] p-3 shadow-2xl">
                    <input
                      type="text"
                      placeholder="Search a book to tag..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                    />
                    <div className="mt-3 space-y-2">
                      {bookTagOptions.map((book) => (
                        <button
                          key={book.title}
                          type="button"
                          onClick={() => {
                            setTaggedBook(book);
                            setShowBookSearch(false);
                          }}
                          className="flex w-full flex-col rounded-lg bg-white/5 px-3 py-2 text-left text-xs text-gray-300 hover:bg-white/10"
                        >
                          <span className="text-white">{book.title}</span>
                          <span className="text-purple-300">{book.author}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={emojiRef}>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-white/5"
                >
                  <Smile size={16} /> Emoji
                </button>
                {showEmojiPicker && (
                  <div className="absolute left-0 top-10 grid w-48 grid-cols-5 gap-2 rounded-2xl border border-white/10 bg-[#1a1035] p-3 shadow-2xl">
                    {emojiList.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewPostText((prev) => `${prev}${emoji}`)}
                        className="rounded-lg bg-white/5 p-2 text-sm hover:bg-white/10"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(event) => setIsAnonymous(event.target.checked)}
                  className="h-4 w-4 accent-purple-600"
                />
                Post Anonymously
              </label>
              <button
                type="button"
                disabled={!newPostText.trim()}
                onClick={handleAddPost}
                className="rounded-xl bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} hidden />
        </div>

        <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-2 text-sm">
          {feedTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${
                    post.avatarColor
                  } text-sm font-semibold text-white`}
                >
                  {post.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{post.author}</p>
                    {followedUsers.includes(post.author) && (
                      <span className="rounded-full border border-purple-500/30 bg-purple-600/20 px-2 py-0.5 text-[10px] text-purple-300">
                        Following
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    {post.role}
                  </p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                  {post.taggedBook && (
                    <span className="mt-2 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
                      📚 Currently reading: {post.taggedBook}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative" data-post-menu>
                <button
                  type="button"
                  onClick={() => setPostMenuOpen((prev) => (prev === post.id ? null : post.id))}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5"
                >
                  <MoreVertical size={16} />
                </button>
                {postMenuOpen === post.id && (
                  <div className="absolute right-0 top-10 w-44 rounded-2xl border border-white/10 bg-[#1a1035] p-2 text-xs shadow-2xl">
                    {post.isOwn ? (
                      <>
                        <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                          ✏️ Edit Post
                        </button>
                        <button
                          type="button"
                          className="w-full rounded-lg px-3 py-2 text-left text-red-400 hover:bg-white/5"
                        >
                          🗑️ Delete Post
                        </button>
                        <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                          📌 Pin Post
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                          🚩 Report Post
                        </button>
                        <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                          🔕 Mute this user
                        </button>
                        <button type="button" className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5">
                          👁️ Hide Post
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-200">{post.content}</p>
            {post.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                {post.image === 'gradient' ? (
                  <div className="flex h-56 items-center justify-center bg-gradient-to-br from-amber-900/40 to-orange-800/40">
                    <BookOpen size={40} className="text-white/70" />
                  </div>
                ) : (
                  <img src={post.image} alt="Post" className="h-56 w-full object-cover" />
                )}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => handleLikeToggle(post.id)}
                  className={`flex items-center gap-2 transition ${
                    post.liked ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  <Heart
                    size={16}
                    className={post.liked ? 'animate-[heartBeat_0.4s_ease]' : ''}
                    fill={post.liked ? 'currentColor' : 'none'}
                  />
                  {post.likes}
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleComments(post.id)}
                  className="flex items-center gap-2 hover:text-purple-400"
                >
                  <MessageCircle size={16} /> {post.comments}
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleBookmarkToggle(post.id)}
                  className="transition hover:text-purple-400"
                >
                  <Bookmark size={16} fill={post.bookmarked ? 'currentColor' : 'none'} />
                </button>
                <div className="relative" data-share-menu>
                  <button
                    type="button"
                    onClick={() => setShareMenuOpen((prev) => (prev === post.id ? null : post.id))}
                    className="transition hover:text-purple-400"
                  >
                    <Share2 size={16} />
                  </button>
                  {shareMenuOpen === post.id && (
                    <div className="absolute right-0 top-8 w-44 rounded-2xl border border-white/10 bg-[#1a1035] p-2 text-xs shadow-2xl">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('https://booknest.app/post/' + post.id);
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5"
                      >
                        📋 Copy Link
                      </button>
                      <button
                        type="button"
                        className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/5"
                      >
                        📤 Share to Circle
                      </button>
                      <a
                        href="https://twitter.com/intent/tweet"
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg px-3 py-2 hover:bg-white/5"
                      >
                        🐦 Share to Twitter
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${
                expandedComments[post.id] ? 'max-h-[400px]' : 'max-h-0'
              }`}
            >
              <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                {post.commentList.map((comment) => (
                  <div key={comment.id} className="flex gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-xs text-white">
                      {comment.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{comment.name}</p>
                      <p className="text-gray-300">{comment.text}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                        <span>{comment.time}</span>
                        <button type="button" className="text-purple-400 hover:underline">
                          Reply
                        </button>
                        <span>❤️ {comment.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-xs text-white">
                    {avatarInitial}
                  </div>
                  <input
                    value={commentDrafts[post.id] || ''}
                    onChange={(event) =>
                      setCommentDrafts((prev) => ({ ...prev, [post.id]: event.target.value }))
                    }
                    placeholder="Write a comment..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    className="rounded-lg bg-purple-600 p-2 text-white"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={handleLoadMore}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-400 transition hover:text-white"
        >
          Load More Conversations ↓
        </button>
      </section>

      <aside className="hidden xl:block space-y-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h3 className="text-base font-semibold text-white">⭕ Active Circles</h3>
          <div className="mt-3 space-y-3">
            {communityCircles.map((circle) => {
              const joined = joinedCircles.includes(circle.name);
              return (
                <div key={circle.name} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-white">{circle.name}</p>
                    <p className="text-xs text-gray-500">{circle.members} members</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleCircle(circle.name)}
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      joined ? 'bg-purple-600 text-white' : 'border border-purple-500/40 text-purple-300'
                    }`}
                  >
                    {joined ? 'Joined ✓' : 'Join'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300 backdrop-blur">
          <div className="flex items-center gap-2 text-white">
            <BookOpen size={16} />
            <h3 className="text-base font-semibold">Community Guidelines</h3>
          </div>
          <ul className="mt-3 space-y-2 text-xs text-gray-400">
            <li>Respect the sanctuary of dialogue; no hate speech or harassment.</li>
            <li>Cite your sources and avoid spoilers when discussing new releases.</li>
            <li>Foster intellectual curiosity and diverse perspectives.</li>
          </ul>
          <div className="mt-4 flex items-center gap-3 text-[11px] text-gray-500">
            <button type="button" className="hover:text-gray-300">
              Privacy
            </button>
            <button type="button" className="hover:text-gray-300">
              Terms
            </button>
            <button type="button" className="hover:text-gray-300">
              Moderation Policy
            </button>
          </div>
        </div>
      </aside>

      {showFindReaders && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
            <button
              type="button"
              onClick={() => setShowFindReaders(false)}
              className="absolute right-4 top-4 text-gray-400"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold">Find Readers 👥</h3>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <input
                placeholder="Search by name, genre, or interest..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {['All', 'Following', 'Bibliophile', 'Sci-Fi', 'Fiction', 'History'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300"
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-white/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-sm">
                    BR
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Book Reader {index + 1}</p>
                    <p className="text-xs text-gray-400">Fiction · History · Sci-Fi</p>
                  </div>
                  <button type="button" className="rounded-full border border-purple-500/40 px-4 py-1 text-xs text-purple-300">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCreateCircle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
            <h3 className="text-lg font-semibold">Create a Circle ⭕</h3>
            <div className="mt-4 space-y-3">
              <input
                placeholder="Circle Name*"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none"
              />
              <textarea
                rows={3}
                placeholder="Description"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none"
              />
              <div className="space-y-2 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="radio" name="privacy" defaultChecked className="accent-purple-600" />
                  Public — anyone can join
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="privacy" className="accent-purple-600" />
                  Private — invite only
                </label>
              </div>
              <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Sci-Fi</option>
                <option>Mystery</option>
                <option>Self-Help</option>
                <option>History</option>
                <option>Biography</option>
                <option>Business</option>
              </select>
              <button
                type="button"
                onClick={() => setShowCreateCircle(false)}
                className="w-full rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold"
              >
                Create Circle
              </button>
              <button
                type="button"
                onClick={() => setShowCreateCircle(false)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-20 left-0 right-0 z-30 mx-auto flex max-w-md items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-3 text-xs text-gray-400 backdrop-blur lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeFeedSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveFeedSection(item.id)}
              className="flex flex-col items-center gap-1"
            >
              <Icon size={18} className={isActive ? 'text-purple-400' : 'text-gray-400'} />
              <span className={isActive ? 'text-purple-300' : 'text-gray-400'}>{item.label.split(' ')[0]}</span>
              {isActive && <span className="h-1 w-1 rounded-full bg-purple-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityView;
