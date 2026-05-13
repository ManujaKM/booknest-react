import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  KeyRound,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  Store,
  AlertCircle
} from 'lucide-react';

const ShopOwnerRegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = verify code, 2 = create account
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [verifiedApp, setVerifiedApp] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Demo approved code for testing
  const DEMO_CODE = 'SH-DEMO01';

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setCodeError('');

    const normalizedCode = code.trim().toUpperCase();

    // Check demo code first
    if (normalizedCode === DEMO_CODE) {
      setVerifiedApp({ shopName: 'Demo Bookshop', ownerEmail: 'shopowner@booknest.com' });
      setStep(2);
      return;
    }

    // Check against localStorage approved codes
    try {
      const approvedCodes = JSON.parse(localStorage.getItem('bn_approved_codes') || '{}');
      if (approvedCodes[normalizedCode]) {
        setVerifiedApp(approvedCodes[normalizedCode]);
        setStep(2);
      } else {
        setCodeError('Invalid or unrecognised access code. Please check the code provided by the admin.');
      }
    } catch {
      setCodeError('Something went wrong. Please try again.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    if (!username.trim() || username.length < 3) errs.username = 'Username must be at least 3 characters.';
    if (!password || password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.setItem(
        'bn_user',
        JSON.stringify({
          name: username,
          email: verifiedApp.ownerEmail,
          role: 'shopowner',
          shopName: verifiedApp.shopName
        })
      );
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/shopowner/dashboard'), 1800);
    }, 1500);
  };

  const inputBase =
    'w-full rounded-xl border bg-white/5 px-4 py-3 pl-11 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20';

  if (success) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur shadow-2xl shadow-purple-900/30">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 animate-pulse">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Account Created! 🎉</h2>
          <p className="text-gray-400 text-sm">
            Welcome to BookNest, <span className="font-semibold text-white">{username}</span>!<br />
            Redirecting to your shop dashboard...
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full bg-purple-500 progress-bar" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex h-18 items-center justify-between border-b border-white/10 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white text-base font-bold">B</span>
          BookNest
        </div>
        <button
          type="button"
          onClick={() => navigate('/shopowner/apply')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <ChevronLeft size={16} />
          Apply as Shop Owner
        </button>
      </nav>

      <div className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center space-y-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-500/30">
              <Store size={32} className="text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold">Shop Owner Registration</h1>
            <p className="text-gray-400 text-sm">
              {step === 1
                ? 'Enter the access code provided by the BookNest admin.'
                : `Setting up your account for ${verifiedApp?.shopName}`}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8 flex items-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  step >= s ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-500'
                }`}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                <span className={`text-xs font-medium ${step >= s ? 'text-white' : 'text-gray-600'}`}>
                  {s === 1 ? 'Verify Code' : 'Create Account'}
                </span>
                {s < 2 && <div className={`h-px flex-1 ${step > s ? 'bg-purple-500' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur shadow-2xl shadow-purple-900/20">
            {step === 1 ? (
              <form onSubmit={handleVerifyCode} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Access Code</label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g. SH-A3X9K2"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className={`${inputBase} tracking-widest font-mono ${codeError ? 'border-red-400/60' : 'border-white/10'}`}
                    />
                  </div>
                  {codeError && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle size={12} />
                      {codeError}
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-xs text-purple-300">
                  💡 <strong>Demo code:</strong> <span className="font-mono font-bold">SH-DEMO01</span>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-500"
                >
                  Verify Code
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  ✅ Code verified for <span className="font-semibold">{verifiedApp?.shopName}</span>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Username</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`${inputBase} ${formErrors.username ? 'border-red-400/60' : 'border-white/10'}`}
                    />
                  </div>
                  {formErrors.username && <p className="mt-1.5 text-xs text-red-400">{formErrors.username}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password (min. 6 chars)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputBase} pr-10 ${formErrors.password ? 'border-red-400/60' : 'border-white/10'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {formErrors.password && <p className="mt-1.5 text-xs text-red-400">{formErrors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-500 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition"
                >
                  ← Use a different code
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-gray-600">
            Haven't applied yet?{' '}
            <button type="button" onClick={() => navigate('/shopowner/apply')} className="text-purple-400 hover:underline">
              Apply as a Shop Owner →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerRegisterPage;
