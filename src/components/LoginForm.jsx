import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from './RoleSelector.jsx';
import DemoCredentials from './DemoCredentials.jsx';

const roleMeta = {
  customer: {
    title: 'Welcome Back! 👋',
    subtitle: 'Login to your BookNest account',
    icon: BookOpen,
    badge: 'Customer',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: 'Enter your password'
  },
  admin: {
    title: 'Admin Access',
    subtitle: 'Restricted area — authorized only',
    icon: ShieldCheck,
    badge: 'Admin',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: 'Enter your password'
  },
  delivery: {
    title: 'Delivery Portal',
    subtitle: 'View and manage your deliveries',
    icon: Truck,
    badge: 'Delivery',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: 'Enter your password'
  }
};

const credentials = {
  customer: { email: 'customer@booknest.com', password: 'customer123' },
  admin: { email: 'admin@booknest.com', password: 'admin123' },
  delivery: { email: 'delivery@booknest.com', password: 'delivery123' }
};

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isRoleChanging, setIsRoleChanging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const accentColor = {
    customer: 'amber',
    admin: 'rose',
    delivery: 'blue'
  }[selectedRole];

  const accentClasses = {
    amber: {
      button: 'bg-purple-600 hover:bg-purple-500 text-white',
      ring: 'focus:ring-purple-500/30 focus:border-purple-400',
      link: 'text-purple-300',
      badge: 'bg-purple-500/20 text-purple-200',
      icon: 'text-purple-300',
      progress: 'bg-purple-500'
    },
    rose: {
      button: 'bg-purple-600 hover:bg-purple-500 text-white',
      ring: 'focus:ring-purple-500/30 focus:border-purple-400',
      link: 'text-purple-300',
      badge: 'bg-purple-500/20 text-purple-200',
      icon: 'text-purple-300',
      progress: 'bg-purple-500'
    },
    blue: {
      button: 'bg-purple-600 hover:bg-purple-500 text-white',
      ring: 'focus:ring-purple-500/30 focus:border-purple-400',
      link: 'text-purple-300',
      badge: 'bg-purple-500/20 text-purple-200',
      icon: 'text-purple-300',
      progress: 'bg-purple-500'
    }
  }[accentColor];

  useEffect(() => {
    setIsRoleChanging(true);
    const timer = setTimeout(() => setIsRoleChanging(false), 200);
    return () => clearTimeout(timer);
  }, [selectedRole]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!email || !email.includes('@') || !email.includes('.')) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!password || password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    const roleCreds = credentials[selectedRole];
    if (email !== roleCreds.email || password !== roleCreds.password) {
      setErrors({ general: 'Invalid credentials for this role.' });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const redirectMap = {
        customer: '/customer/dashboard',
        admin: '/admin/dashboard',
        delivery: '/delivery/dashboard'
      };

      localStorage.setItem(
        'bn_user',
        JSON.stringify({
          email,
          role: selectedRole,
          name: 'Riley'
        })
      );
      navigate(redirectMap[selectedRole]);
    }, 2000);
  };

  const meta = roleMeta[selectedRole];
  const RoleIcon = meta.icon;

  return (
    <div className={`w-full max-w-[480px] rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-10 shadow-2xl shadow-purple-900/40 fade-up ${isShaking ? 'shake' : ''}`}>
      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center animate-pulse">
            <CheckCircle2 size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">Login Successful! 🎉</h2>
          <p className="text-sm text-slate-300">Redirecting to your dashboard...</p>
          <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className={`h-full ${accentClasses.progress} progress-bar`} />
          </div>
        </div>
      ) : (
        <>
          <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />

          <div
            className={`mt-6 transition-all duration-300 ${
              isRoleChanging ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${accentClasses.badge}`}>
                <RoleIcon className={accentClasses.icon} size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">{meta.title}</h2>
              <p className="text-sm text-slate-300">{meta.subtitle}</p>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="email">
                Email Address
              </label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  aria-label="Email Address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={meta.emailPlaceholder}
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 pl-10 text-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.01] ${accentClasses.ring} ${
                    errors.email ? 'border-red-400' : 'border-white/10'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-2 text-xs text-rose-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  aria-label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={meta.passwordPlaceholder}
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 pl-10 pr-10 text-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.01] ${accentClasses.ring} ${
                    errors.password ? 'border-red-400' : 'border-white/10'
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-xs text-rose-400">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  name="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500/30"
                />
                Remember me
              </label>
              <a href="#top" className={`text-sm ${accentClasses.link} hover:underline`}>
                Forgot Password?
              </a>
            </div>

            {errors.general && <p className="text-xs text-rose-500">{errors.general}</p>}

            <button
              type="submit"
              className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition transform hover:scale-[1.02] ${accentClasses.button}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Login as {meta.badge}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {selectedRole === 'customer' && (
              <p className="text-center text-sm text-slate-300">
                New to BookNest?{' '}
                <a href="#top" className="text-purple-300 font-semibold hover:underline">
                  Create a free account →
                </a>
              </p>
            )}
          </form>

          <DemoCredentials />
        </>
      )}
    </div>
  );
};

export default LoginForm;
