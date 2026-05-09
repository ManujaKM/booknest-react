const StatsCard = ({ icon: Icon, iconBg, value, label, trend, trendColor }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
      <p className={`mt-4 text-sm ${trendColor}`}>{trend}</p>
    </div>
  );
};

export default StatsCard;
