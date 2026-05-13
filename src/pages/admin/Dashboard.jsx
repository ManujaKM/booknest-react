import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { BarChart3, BookOpen, ShoppingCart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar.jsx';

const revenueData = [
  { month: 'Dec', value: 2100 },
  { month: 'Jan', value: 2800 },
  { month: 'Feb', value: 1900 },
  { month: 'Mar', value: 3200 },
  { month: 'Apr', value: 2700 },
  { month: 'May', value: 3240 }
];

const activityItems = [
  {
    text: 'New order #ORD-2041 placed by Alice Johnson',
    time: '2 min ago',
    color: '#a78bfa'
  },
  {
    text: 'Steve Jobs delivered to Alice Johnson',
    time: '1 hr ago',
    color: '#34d399'
  },
  {
    text: 'Low stock alert: The Great Gatsby (8 left)',
    time: '3 hrs ago',
    color: '#fbbf24'
  },
  {
    text: 'New user Bob Smith registered',
    time: '5 hrs ago',
    color: '#60a5fa'
  },
  {
    text: 'New order #ORD-2038 placed by Bob Smith',
    time: 'Yesterday',
    color: '#a78bfa'
  },
  {
    text: 'Order #ORD-2020 cancelled by Carol White',
    time: 'Yesterday',
    color: '#f87171'
  }
];

const bestSellers = [
  {
    rank: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    sold: 120,
    revenue: '$1,919'
  },
  {
    rank: 2,
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    sold: 89,
    revenue: '$2,002'
  },
  {
    rank: 3,
    title: 'Dune',
    author: 'Frank Herbert',
    sold: 76,
    revenue: '$1,406'
  },
  {
    rank: 4,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    sold: 54,
    revenue: '$648'
  },
  {
    rank: 5,
    title: 'Deep Work',
    author: 'Cal Newport',
    sold: 41,
    revenue: '$656'
  }
];

const orderStatus = [
  { name: 'Delivered', value: 42, color: '#34d399' },
  { name: 'Processing', value: 18, color: '#60a5fa' },
  { name: 'Pending', value: 28, color: '#fbbf24' },
  { name: 'Cancelled', value: 8, color: '#f87171' }
];

const stats = [
  { label: 'Total Sales', value: '$12,450', icon: BarChart3, color: '#a78bfa' },
  { label: 'Total Books', value: '1,204', icon: BookOpen, color: '#34d399' },
  { label: 'Active Users', value: '450', icon: Users, color: '#fbbf24' },
  { label: 'Pending Orders', value: '28', icon: ShoppingCart, color: '#60a5fa' }
];

const actions = [
  {
    label: 'Add New Book',
    icon: 'ti-packages',
    color: 'rgba(124,58,237,0.2)',
    text: '#c4b5fd',
    path: '/admin/inventory'
  },
  {
    label: 'Add User',
    icon: 'ti-user-plus',
    color: 'rgba(59,130,246,0.2)',
    text: '#93c5fd',
    path: '/admin/users'
  },
  {
    label: 'View All Orders',
    icon: 'ti-clipboard-list',
    color: 'rgba(245,158,11,0.2)',
    text: '#fbbf24',
    path: '/admin/orders'
  },
  {
    label: 'View Reports',
    icon: 'ti-chart-line',
    color: 'rgba(16,185,129,0.2)',
    text: '#34d399',
    path: '/admin/reports'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white">
      <Sidebar />
      <main className="admin-shell">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
              <div
                key={item.label}
                className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8a8fa8]">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-[#e2e4f0]">{item.value}</p>
                  </div>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${item.color}26`, color: item.color }}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
              <div className="mb-4 text-sm font-semibold text-[#e2e4f0]">Monthly Revenue</div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" tick={{ fill: '#8a8fa8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#8a8fa8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        background: '#0f1322',
                        border: '1px solid #2a2d42',
                        borderRadius: '10px',
                        color: '#e2e4f0'
                      }}
                      formatter={(value) => `$${value}`}
                    />
                    <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
              <div className="mb-4 text-sm font-semibold text-[#e2e4f0]">Recent Activity</div>
              <div className="space-y-3">
                {activityItems.map((item) => (
                  <div key={item.text} className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-1 h-2 w-2 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="text-sm text-[#e2e4f0]">{item.text}</span>
                    </div>
                    <span className="text-xs text-[#8a8fa8]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
              <div className="mb-4 text-sm font-semibold text-[#e2e4f0]">Best Sellers</div>
              <div className="space-y-3 text-sm">
                {bestSellers.map((item) => (
                  <div key={item.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f1322] text-xs text-[#8a8fa8]">
                        {item.rank}
                      </div>
                      <div>
                        <div className="text-[#e2e4f0]">{item.title}</div>
                        <div className="text-xs text-[#8a8fa8]">{item.author}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#8a8fa8]">{item.sold} sold</div>
                      <div className="text-sm text-[#34d399]">{item.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
              <div className="mb-4 text-sm font-semibold text-[#e2e4f0]">Order Status</div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={orderStatus}
                      innerRadius={55}
                      outerRadius={80}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {orderStatus.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                      wrapperStyle={{ color: '#8a8fa8', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
              <div className="mb-4 text-sm font-semibold text-[#e2e4f0]">Quick Actions</div>
              <div className="space-y-3">
                {actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => navigate(action.path)}
                    className="flex h-[52px] w-full items-center gap-3 rounded-[10px] px-4 text-left transition hover:scale-[1.01]"
                    style={{ background: action.color, color: action.text }}
                  >
                    <i className={`ti ${action.icon} text-2xl`} />
                    <span className="text-sm font-semibold">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
