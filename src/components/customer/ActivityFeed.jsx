const ActivityFeed = () => {
  const items = [
    { id: 1, color: 'bg-purple-500', text: 'You finished reading Atomic Habits', time: '2 days ago' },
    { id: 2, color: 'bg-blue-500', text: 'Riley added The Midnight Library to library', time: '3 days ago' },
    { id: 3, color: 'bg-emerald-500', text: 'You shared Project Hail Mary with Sarah', time: '5 days ago' },
    { id: 4, color: 'bg-pink-500', text: 'New follower: James K.', time: '1 week ago' },
    { id: 5, color: 'bg-amber-500', text: 'You rated Deep Work ★★★★', time: '1 week ago' }
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <h3 className="text-lg font-semibold text-white">Recent Activity 🕐</h3>
      <div className="mt-4 divide-y divide-white/5">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 py-3">
            <span className={`mt-2 h-2.5 w-2.5 rounded-full ${item.color}`} />
            <div className="flex-1">
              <p className="text-sm text-gray-200">{item.text}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
