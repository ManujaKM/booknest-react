import LoginNavbar from '../components/LoginNavbar.jsx';
import LoginForm from '../components/LoginForm.jsx';
import PhoneMockup from '../components/PhoneMockup.jsx';
import { BookOpen, Search, Users } from 'lucide-react';

const highlights = [
  {
    icon: BookOpen,
    title: 'Manage your book collection'
  },
  {
    icon: Search,
    title: 'Discover new reads'
  },
  {
    icon: Users,
    title: 'Connect with readers'
  }
];

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <LoginNavbar />
      <div className="pt-24 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div className="hidden lg:flex flex-col justify-between relative rounded-3xl bg-[#0f0f1f] border border-white/10 p-10 overflow-hidden">
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-purple-600/30 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />
            <div className="absolute top-20 right-12 h-28 w-40 rounded-2xl bg-white/5 border border-white/10 rotate-6" />
            <div className="absolute bottom-24 left-8 h-32 w-44 rounded-2xl bg-white/5 border border-white/10 -rotate-6" />

            <div className="relative z-10 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-2xl font-semibold text-white">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white">B</span>
                  BookNest
                </div>
                <p className="text-sm text-slate-300">Share Books. Discover Stories.</p>
              </div>

              <div className="space-y-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-3 text-slate-300">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 mt-10">
              <PhoneMockup />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
