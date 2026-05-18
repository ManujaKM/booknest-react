import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  MapPin,
  Mail,
  User,
  Percent,
  Truck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Loader2,
  BookOpen,
  ChevronLeft,
  Link,
  Map
} from 'lucide-react';

const deliveryOptions = [
  {
    value: 'own',
    label: 'Our Own Delivery',
    description: 'We handle all deliveries ourselves with our own team.',
    icon: Truck,
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-300'
  },
  {
    value: 'booknest',
    label: 'BookNest Delivery Boys',
    description: 'Use BookNest\'s delivery network for all orders.',
    icon: BookOpen,
    color: 'border-purple-500/40 bg-purple-500/10 text-purple-300'
  },
  {
    value: 'both',
    label: 'Both Methods',
    description: 'Flexible — use either our team or BookNest depending on the order.',
    icon: Store,
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
  }
];

const ShopOwnerApplyPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ownerName: '',
    email: '',
    shopName: '',
    location: '',
    mapLink: '',
    commission: '',
    deliveryMethod: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.ownerName.trim()) errs.ownerName = 'Full name is required.';
    if (!form.email.includes('@')) errs.email = 'Valid email is required.';
    if (!form.shopName.trim()) errs.shopName = 'Shop name is required.';
    if (!form.location.trim()) errs.location = 'Location is required.';
    if (!form.commission || isNaN(form.commission) || +form.commission < 1 || +form.commission > 50)
      errs.commission = 'Commission must be between 1% and 50%.';
    if (!form.deliveryMethod) errs.deliveryMethod = 'Please select a delivery method.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem('bn_shop_applications') || '[]');
      const newApp = {
        id: `app-${Date.now()}`,
        ...form,
        commission: Number(form.commission),
        appliedAt: new Date().toISOString().slice(0, 10),
        status: 'pending',
        code: null
      };
      applications.push(newApp);
      localStorage.setItem('bn_shop_applications', JSON.stringify(applications));
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 ${errors[field] ? 'border-red-400/60' : 'border-white/10'
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur shadow-2xl shadow-purple-900/30">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Application Submitted!</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your shop application for <span className="font-semibold text-white">"{form.shopName}"</span> has been received.
            Our admin team will review it and send you an access code once approved.
          </p>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm text-purple-300">
            ⏳ Review typically takes 1–2 business days.
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition"
          >
            Back to Home
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex h-18 items-center justify-between border-b border-white/10 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white text-base font-bold">B</span>
          BookNest
        </div>
        <button
          type="button"
          onClick={() => navigate('/shopowner/register')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <ChevronLeft size={16} />
          Already approved? Register here
        </button>
      </nav>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-500/30">
            <Store size={32} className="text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold">Become a Shop Owner</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Apply to list your bookshop on BookNest. Our admin team will review your application and send you an access code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5 backdrop-blur">
            <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400">Your Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  <User size={13} className="inline mr-1.5 text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Mendis"
                  value={form.ownerName}
                  onChange={set('ownerName')}
                  className={inputClass('ownerName')}
                />
                {errors.ownerName && <p className="mt-1.5 text-xs text-red-400">{errors.ownerName}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  <Mail size={13} className="inline mr-1.5 text-gray-500" />
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  className={inputClass('email')}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Shop Info */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5 backdrop-blur">
            <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400">Shop Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  <Store size={13} className="inline mr-1.5 text-gray-500" />
                  Shop Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Reading Corner"
                  value={form.shopName}
                  onChange={set('shopName')}
                  className={inputClass('shopName')}
                />
                {errors.shopName && <p className="mt-1.5 text-xs text-red-400">{errors.shopName}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  <MapPin size={13} className="inline mr-1.5 text-gray-500" />
                  Location / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Colombo 03, Sri Lanka"
                  value={form.location}
                  onChange={set('location')}
                  className={inputClass('location')}
                />
                {errors.location && <p className="mt-1.5 text-xs text-red-400">{errors.location}</p>}
              </div>
            </div>

            {/* Google Maps location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <Map size={13} className="inline mr-1.5 text-gray-500" />
                Google Maps Link
                <span className="ml-2 text-xs text-gray-600 font-normal">(optional but helps admin verify your location)</span>
              </label>
              <div className="relative">
                <Link size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="url"
                  placeholder="Paste your Google Maps share link here..."
                  value={form.mapLink}
                  onChange={set('mapLink')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-600">
                Open Google Maps → search your shop → tap Share → Copy link → paste here.
              </p>

              {/* Live map preview */}
              {(form.mapLink.trim() || form.location.trim()) && (
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
                    <Map size={13} className="text-purple-400" />
                    <span className="text-xs text-gray-400">Map Preview</span>
                  </div>
                  <iframe
                    title="shop-location-preview"
                    className="h-48 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      form.location.trim() || 'Sri Lanka'
                    )}&output=embed&z=15`}
                  />
                </div>
              )}
            </div>

            <div className="max-w-xs">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <Percent size={13} className="inline mr-1.5 text-gray-500" />
                Commission % you offer BookNest
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="e.g. 12"
                  value={form.commission}
                  onChange={set('commission')}
                  className={inputClass('commission') + ' pr-8'}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
              </div>
              {errors.commission && <p className="mt-1.5 text-xs text-red-400">{errors.commission}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <FileText size={13} className="inline mr-1.5 text-gray-500" />
                Tell us about your shop (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe your bookshop, specialties, years in business..."
                value={form.description}
                onChange={set('description')}
                className={inputClass('description') + ' resize-none'}
              />
            </div>
          </div>

          {/* Delivery Method */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 backdrop-blur">
            <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400">Delivery Preference</h2>
            <p className="text-xs text-gray-500">This can be changed later from your shop settings.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {deliveryOptions.map((opt) => {
                const Icon = opt.icon;
                const selected = form.deliveryMethod === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, deliveryMethod: opt.value }))}
                    className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left text-sm transition-all ${selected
                        ? `${opt.color} shadow-md scale-[1.02]`
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                  >
                    <Icon size={18} />
                    <span className="font-semibold">{opt.label}</span>
                    <span className="text-xs opacity-70">{opt.description}</span>
                  </button>
                );
              })}
            </div>
            {errors.deliveryMethod && <p className="text-xs text-red-400">{errors.deliveryMethod}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-500 hover:scale-[1.01] disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-600">
            Already approved?{' '}
            <button type="button" onClick={() => navigate('/shopowner/register')} className="text-purple-400 hover:underline">
              Create your account here →
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ShopOwnerApplyPage;
