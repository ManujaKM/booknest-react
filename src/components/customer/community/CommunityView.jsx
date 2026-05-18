import { useState } from 'react';
import { Bookmark, Heart, MessageCircle, MoreVertical, Share2 } from 'lucide-react';

const postsData = [
  {
    id: 1,
    user: 'Priya Sharma',
    initials: 'PS',
    avatarColor: '#e040fb',
    role: 'HISTORY LEAD',
    time: '2d ago',
    currentlyReading: 'Sapiens',
    content:
      'Book club meeting recap: We spent two hours discussing the ending of Sapiens and still cannot agree. That is exactly what a good book should do - challenge everything you thought you knew.',
    likes: 89,
    comments: 31,
    circle: 'Fiction Lovers',
    type: 'discussion'
  },
  {
    id: 2,
    user: 'Riley',
    initials: 'R',
    avatarColor: '#7c3aed',
    role: 'BIBLIOPHILE',
    time: '1d ago',
    currentlyReading: null,
    content:
      'Just finished Atomic Habits and I genuinely feel like a different person. The 1% rule is deceptively simple but incredibly powerful.',
    likes: 54,
    comments: 18,
    circle: 'Fiction Lovers',
    type: 'feed'
  },
  {
    id: 3,
    user: 'Alex Kim',
    initials: 'AK',
    avatarColor: '#00bcd4',
    role: 'SCI-FI FAN',
    time: '3d ago',
    currentlyReading: 'Dune',
    content:
      'Anyone else think Dune gets better on a second read? So many things I missed the first time around. The world-building is just insane.',
    likes: 102,
    comments: 45,
    circle: 'Fiction Lovers',
    type: 'discussion'
  }
];

const circlesData = [
  { id: 1, name: 'Fiction Lovers', members: 142, joined: true },
  { id: 2, name: 'Self-Help Readers', members: 89, joined: false },
  { id: 3, name: 'Sci-Fi Universe', members: 234, joined: false }
];

const readersData = [
  { id: 1, name: 'Alex Kim', role: 'Sci-Fi Fan', following: false },
  { id: 2, name: 'Priya Sharma', role: 'History Lead', following: true },
  { id: 3, name: 'Sam Lee', role: 'Fiction Lover', following: false }
];

const CommunityView = ({ user }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [postText, setPostText] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [circles, setCircles] = useState(circlesData);
  const [readers, setReaders] = useState(readersData);

  const tabs = [
    { id: 'feed', label: 'Feed' },
    { id: 'popular', label: 'Popular' },
    { id: 'my-circles', label: 'My Circles' },
    { id: 'discussions', label: 'Book Discussions' }
  ];

  const name = user?.name || 'Riley';
  const avatarInitial = name.charAt(0).toUpperCase();

  const handlePost = () => {
    if (!postText.trim()) return;
    const nextPost = {
      id: Date.now(),
      user: anonymous ? 'Anonymous Reader' : name,
      initials: anonymous ? '?' : avatarInitial,
      avatarColor: anonymous ? '#64748b' : '#7c3aed',
      role: 'BIBLIOPHILE',
      time: 'Just now',
      currentlyReading: null,
      content: postText.trim(),
      likes: 0,
      comments: 0,
      circle: 'Fiction Lovers',
      type: 'feed'
    };
    setPosts((prev) => [nextPost, ...prev]);
    setPostText('');
  };

  const toggleJoin = (id) => {
    setCircles((prev) => prev.map((circle) => (
      circle.id === id ? { ...circle, joined: !circle.joined } : circle
    )));
  };

  const toggleFollow = (id) => {
    setReaders((prev) => prev.map((reader) => (
      reader.id === id ? { ...reader, following: !reader.following } : reader
    )));
  };

  const getFeedContent = () => {
    if (activeTab === 'popular') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    if (activeTab === 'my-circles') {
      return posts.filter((post) => post.circle === 'Fiction Lovers');
    }
    if (activeTab === 'discussions') {
      return posts.filter((post) => post.type === 'discussion');
    }
    return posts;
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <style>{`
        .tab-bar { display: flex; gap: 0; border-bottom: 1px solid #2a2d42; margin-bottom: 20px; }
        .tab-btn { padding: 10px 18px; font-size: 13.5px; color: #8a8fa8; cursor: pointer; border: none; background: none; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; white-space: nowrap; }
        .tab-btn:hover { color: #e2e4f0; }
        .tab-btn.active { color: #a78bfa; border-bottom-color: #7c3aed; font-weight: 600; }
        .avatar-sm { width: 38px; height: 38px; border-radius: 50%; background: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .avatar-circle { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .post-card { background: #1a1d2e; border: 1px solid #2a2d42; border-radius: 14px; padding: 18px; margin-bottom: 14px; }
        .post-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .post-footer { display: flex; gap: 16px; margin-top: 14px; padding-top: 12px; border-top: 1px solid #2a2d42; }
        .action-btn { display: flex; align-items: center; gap: 5px; background: none; border: none; color: #8a8fa8; font-size: 13px; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: all 0.15s; }
        .action-btn:hover { color: #a78bfa; background: rgba(124,58,237,0.1); }
        .three-dot-btn { background: none; border: none; color: #8a8fa8; font-size: 18px; cursor: pointer; padding: 4px 8px; border-radius: 6px; }
        .three-dot-btn:hover { background: #1f2235; }
        .side-card { background: #1a1d2e; border: 1px solid #2a2d42; border-radius: 14px; padding: 16px; }
        .side-card-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .circle-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #1f2235; }
        .circle-row:last-of-type { border-bottom: none; }
        .circle-dot { width: 8px; height: 8px; border-radius: 50%; background: #f87171; flex-shrink: 0; }
        .circle-name { flex: 1; font-size: 13px; color: #e2e4f0; }
        .circle-count { font-size: 11px; color: #5a6480; }
        .btn-join { background: rgba(124,58,237,0.1); border: 1px solid #2a2d42; color: #a78bfa; border-radius: 20px; padding: 4px 14px; font-size: 12px; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .btn-join:hover { background: rgba(124,58,237,0.2); border-color: #7c3aed; }
        .btn-joined { background: #7c3aed; border: none; color: #fff; border-radius: 20px; padding: 4px 14px; font-size: 12px; cursor: pointer; }
        .btn-create-circle { width: 100%; background: rgba(124,58,237,0.05); border: 1px dashed #2a2d42; color: #8a8fa8; border-radius: 8px; padding: 8px; font-size: 12px; cursor: pointer; margin-top: 10px; transition: all 0.15s; }
        .btn-create-circle:hover { border-color: #7c3aed; color: #a78bfa; }
      `}</style>

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div>
          <div className="create-post-card" style={{ background: '#1a1d2e', border: '1px solid #2a2d42', borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div className="avatar-sm">{anonymous ? '?' : avatarInitial}</div>
              <textarea
                placeholder="Share a thought from your current read..."
                rows={2}
                value={postText}
                onChange={(event) => setPostText(event.target.value)}
                onFocus={(event) => { event.target.rows = 4; }}
                onBlur={(event) => { event.target.rows = 2; }}
                style={{
                  flex: 1,
                  background: '#12141f',
                  border: '1px solid #2a2d42',
                  borderRadius: 10,
                  padding: '10px 14px',
                  color: '#e2e4f0',
                  fontSize: 13,
                  resize: 'none',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8a8fa8', cursor: 'pointer' }}>
                <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} style={{ accentColor: '#7c3aed' }} />
                Post Anonymously
              </label>
              <button
                style={{
                  background: '#7c3aed',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>

          {getFeedContent().map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar-circle" style={{ background: post.avatarColor }}>
                    {post.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#e2e4f0' }}>{post.user}</div>
                    <div style={{ fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>{post.role}</div>
                    <div style={{ fontSize: 11, color: '#5a6480' }}>{post.time}</div>
                  </div>
                </div>
                <button className="three-dot-btn" type="button">⋮</button>
              </div>

              {post.currentlyReading && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(124,58,237,0.15)', color: '#a78bfa', borderRadius: 20, padding: '4px 12px', fontSize: 12, margin: '10px 0' }}>
                  Currently reading: {post.currentlyReading}
                </div>
              )}

              <p style={{ fontSize: 14, color: '#c8cce0', lineHeight: 1.6, margin: '10px 0' }}>{post.content}</p>

              <div className="post-footer">
                <button className="action-btn" type="button">
                  <Heart size={16} /> {post.likes}
                </button>
                <button className="action-btn" type="button">
                  <MessageCircle size={16} /> {post.comments}
                </button>
                <button className="action-btn" type="button">
                  <Bookmark size={16} />
                </button>
                <button className="action-btn" type="button">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="side-card">
            <div className="side-card-title">
              My Circles
              <span className="circle-dot" />
            </div>
            {circles.map((circle) => (
              <div key={circle.id} className="circle-row">
                <span className="circle-dot" />
                <span className="circle-name">{circle.name}</span>
                <span className="circle-count">{circle.members} members</span>
                <button
                  type="button"
                  onClick={() => toggleJoin(circle.id)}
                  className={circle.joined ? 'btn-joined' : 'btn-join'}
                >
                  {circle.joined ? 'Joined' : 'Join'}
                </button>
              </div>
            ))}
            <button type="button" className="btn-create-circle">
              + Create Circle
            </button>
          </div>

          <div className="side-card">
            <div className="side-card-title">Find Readers</div>
            <p style={{ fontSize: 12, color: '#8a8fa8', marginBottom: 12 }}>Connect with readers who share your taste</p>
            {readers.map((reader) => (
              <div key={reader.id} className="circle-row">
                <div className="avatar-circle" style={{ background: '#7c3aed' }}>{reader.name.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: '#e2e4f0' }}>{reader.name}</div>
                  <div style={{ fontSize: 11, color: '#8a8fa8' }}>{reader.role}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFollow(reader.id)}
                  className={reader.following ? 'btn-joined' : 'btn-join'}
                >
                  {reader.following ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
            <button
              type="button"
              style={{ marginTop: 10, fontSize: 12, color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Browse Community ->
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityView;
