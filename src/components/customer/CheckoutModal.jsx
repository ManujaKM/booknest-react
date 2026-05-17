import { useState, useCallback } from 'react';
import {
  X, ShoppingBag, MapPin, CreditCard, CheckCircle,
  ChevronRight, ChevronLeft, Package, Upload, Image
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { addOrder, getCurrentUser } from '../../store/bookStore.js';

// ── Stripe init ───────────────────────────────────────────────────────────────
const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
if (!STRIPE_KEY) {
  console.warn('[BookNest] REACT_APP_STRIPE_PUBLISHABLE_KEY is not set. Stripe payments will not work.');
}
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

// ── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = ['Order Summary', 'Delivery', 'Payment', 'Receipt'];

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition";

// ── Step 1 — Order Summary ────────────────────────────────────────────────────
const SummaryStep = ({ book, qty, setQty }) => (
  <div className="space-y-5">
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      {book.coverUrl
        ? <img src={book.coverUrl} alt={book.title} className="h-24 w-16 rounded-xl object-cover border border-white/10 shrink-0" onError={e => e.target.style.display = 'none'} />
        : <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/20"><Package size={24} className="text-purple-400" /></div>
      }
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white leading-tight">{book.title}</p>
        <p className="text-sm text-gray-400">{book.author}</p>
        <p className="text-xs text-gray-500 mt-0.5">Sold by <span className="text-purple-300">{book.shopName}</span></p>
        <p className="mt-2 text-xl font-bold text-emerald-400">${parseFloat(book.price).toFixed(2)}</p>
      </div>
    </div>

    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <span className="text-sm text-gray-300">Quantity</span>
      <div className="flex items-center gap-3">
        <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition font-bold">−</button>
        <span className="w-6 text-center font-bold text-white">{qty}</span>
        <button onClick={() => setQty(q => Math.min(book.stock, q + 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition font-bold">+</button>
      </div>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 space-y-2 text-sm">
      <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white">${(book.price * qty).toFixed(2)}</span></div>
      <div className="flex justify-between text-gray-400"><span>Delivery</span><span className="text-emerald-400">Free</span></div>
      <div className="border-t border-white/10 pt-2 flex justify-between font-bold"><span className="text-gray-300">Total</span><span className="text-emerald-400">${(book.price * qty).toFixed(2)}</span></div>
    </div>
  </div>
);

// ── Step 2 — Delivery Address ─────────────────────────────────────────────────
const DeliveryStep = ({ delivery, setDelivery, errors }) => {
  const f = (k, v) => setDelivery(p => ({ ...p, [k]: v }));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[['name', 'Full Name', 'John Smith'], ['phone', 'Phone Number', '+1 555 000 0000']].map(([k, label, ph]) => (
          <div key={k}>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</label>
            <input className={inputCls} placeholder={ph} value={delivery[k] || ''} onChange={e => f(k, e.target.value)} />
            {errors[k] && <p className="mt-1 text-xs text-red-400">{errors[k]}</p>}
          </div>
        ))}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Address Line 1</label>
        <input className={inputCls} placeholder="123 Main Street" value={delivery.address || ''} onChange={e => f('address', e.target.value)} />
        {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">Address Line 2 (optional)</label>
        <input className={inputCls} placeholder="Apt, floor, suite…" value={delivery.address2 || ''} onChange={e => f('address2', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">City</label>
          <input className={inputCls} placeholder="New York" value={delivery.city || ''} onChange={e => f('city', e.target.value)} />
          {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">ZIP Code</label>
          <input className={inputCls} placeholder="10001" value={delivery.postcode || ''} onChange={e => f('postcode', e.target.value)} />
        </div>
      </div>
    </div>
  );
};

// ── Stripe Card Element styles ─────────────────────────────────────────────────
const CARD_STYLE = {
  style: {
    base: {
      color: '#e2e4f0',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize:   '14px',
      '::placeholder': { color: '#6b7280' },
      iconColor: '#a78bfa',
    },
    invalid: { color: '#f87171', iconColor: '#f87171' },
  },
};

// ── Step 3 — Stripe Payment ────────────────────────────────────────────────────
// Must be rendered inside <Elements> provider (handled by parent)
const StripePaymentStep = ({ cardError, total }) => (
  <div className="space-y-5">
    {/* Stripe badge */}
    <div className="flex items-center gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/5 px-5 py-4">
      <CreditCard size={20} className="text-purple-400 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-white">Secure payment via Stripe</p>
        <p className="text-xs text-gray-500">Your card details are encrypted — we never store them</p>
      </div>
      {/* Stripe wordmark SVG */}
      <svg className="ml-auto shrink-0" viewBox="0 0 60 25" fill="none" width="48" xmlns="http://www.w3.org/2000/svg">
        <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.07zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.5 0 3 .25 4.43.88v3.88a9.23 9.23 0 0 0-4.43-1.22c-.88 0-1.4.24-1.4.9 0 1.95 6.41.98 6.41 6.09z" fill="#a78bfa"/>
      </svg>
    </div>

    {/* Total */}
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3">
      <span className="text-sm text-gray-300">Total to pay</span>
      <span className="text-lg font-bold text-emerald-400">${total}</span>
    </div>

    {/* Stripe CardElement */}
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">Card Details</label>
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 focus-within:border-purple-500/50 transition">
        <CardElement options={CARD_STYLE} />
      </div>
      {cardError && <p className="mt-2 text-xs text-red-400">⚠ {cardError}</p>}
    </div>

    <p className="text-center text-[10px] text-gray-600">
      Test with card <span className="text-gray-400 font-mono">4242 4242 4242 4242</span> · Any future expiry · Any CVV
    </p>
  </div>
);

// ── Step 4 — Receipt ──────────────────────────────────────────────────────────
const ReceiptStep = ({ order }) => (
  <div className="space-y-5">
    <div className="flex flex-col items-center pt-2 pb-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-500/40">
        <CheckCircle size={32} className="text-emerald-400" />
      </div>
      <h3 className="mt-3 text-xl font-bold text-white">Payment Confirmed! 🎉</h3>
      <p className="text-sm text-gray-400 mt-1">Your order receipt is saved below</p>
    </div>

    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3 text-sm">
      <div className="flex justify-between"><span className="text-gray-400">Order ID</span><span className="font-bold text-white">{order?.id}</span></div>
      <div className="flex justify-between"><span className="text-gray-400">Book</span><span className="text-white text-right max-w-[60%] truncate">{order?.bookTitle}</span></div>
      <div className="flex justify-between"><span className="text-gray-400">Shop</span><span className="text-white">{order?.shopName}</span></div>
      <div className="flex justify-between"><span className="text-gray-400">Qty</span><span className="text-white">{order?.qty}</span></div>
      <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
        <span className="text-gray-300">Total Paid</span>
        <span className="text-emerald-400">${parseFloat(order?.amount || 0).toFixed(2)}</span>
      </div>
      <div className="border-t border-white/10 pt-2">
        <p className="text-gray-400">Deliver to</p>
        <p className="text-white mt-0.5">{order?.customer?.name}</p>
        <p className="text-gray-400 text-xs">{order?.customer?.address}, {order?.customer?.city} {order?.customer?.postcode}</p>
      </div>
      <div>
        <p className="text-gray-400">Payment</p>
        <p className="text-white flex items-center gap-1.5">
          <CreditCard size={14} className="text-purple-400" />
          Stripe · Card ending •••• {order?.payment?.last4}
        </p>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Date</span>
        <span className="text-gray-400">{order ? new Date(order.createdAt).toLocaleString() : ''}</span>
      </div>
    </div>

    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-xs text-blue-300 text-center">
      📦 Your delivery partner has been notified and will pick up your order shortly.
    </div>
  </div>
);

// ── Inner modal (uses Stripe hooks — must be inside Elements) ─────────────────
const CheckoutInner = ({ book, onClose }) => {
  const stripe   = useStripe();
  const elements = useElements();

  const [step, setStep]         = useState(0);
  const [qty, setQty]           = useState(1);
  const [delivery, setDelivery] = useState({});
  const [errors, setErrors]     = useState({});
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const total = (book.price * qty).toFixed(2);

  const validateDelivery = () => {
    const e = {};
    if (!delivery.name?.trim())    e.name    = 'Name is required';
    if (!delivery.phone?.trim())   e.phone   = 'Phone is required';
    if (!delivery.address?.trim()) e.address = 'Address is required';
    if (!delivery.city?.trim())    e.city    = 'City is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    setErrors({});
    setCardError('');

    if (step === 1 && !validateDelivery()) return;

    if (step === 2) {
      // ── Stripe payment ──────────────────────────────────────────────────────
      if (!stripe || !elements) {
        setCardError('Stripe is not loaded yet. Please wait a moment.');
        return;
      }
      const card = elements.getElement(CardElement);
      if (!card) { setCardError('Card element not found.'); return; }

      setProcessing(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name:  delivery.name,
          phone: delivery.phone,
          address: {
            line1:       delivery.address,
            line2:       delivery.address2 || '',
            city:        delivery.city,
            postal_code: delivery.postcode || '',
          },
        },
      });
      setProcessing(false);

      if (error) {
        setCardError(error.message);
        return;
      }

      // Payment method created — in production, send paymentMethod.id to your
      // backend to create & confirm a PaymentIntent. Here we proceed directly.
      const user  = getCurrentUser();
      const order = addOrder({
        bookId:      book.id,
        bookTitle:   book.title,
        shopId:      book.shopId,
        shopName:    book.shopName,
        shopAddress: book.shopAddress || '',
        qty,
        amount: parseFloat(total),
        customer: {
          name:     delivery.name,
          phone:    delivery.phone,
          address:  delivery.address + (delivery.address2 ? ', ' + delivery.address2 : ''),
          city:     delivery.city,
          postcode: delivery.postcode || '',
          email:    user?.email || '',
        },
        payment: {
          method:          'stripe',
          last4:           paymentMethod.card?.last4 || '????',
          paymentMethodId: paymentMethod.id,
          brand:           paymentMethod.card?.brand || 'card',
        },
      });
      setPlacedOrder(order);
    }

    setStep(s => s + 1);
  };

  const handleBack = () => { setErrors({}); setCardError(''); setStep(s => s - 1); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#131325] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-purple-400" />
            <span className="font-bold text-white">{STEPS[step]}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-purple-500' : i < step ? 'w-1.5 bg-emerald-500' : 'w-1.5 bg-white/20'}`} />
              ))}
            </div>
            {step < 3 && (
              <button onClick={onClose} className="rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white transition">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6">
          {step === 0 && <SummaryStep book={book} qty={qty} setQty={setQty} />}
          {step === 1 && <DeliveryStep delivery={delivery} setDelivery={setDelivery} errors={errors} />}
          {step === 2 && <StripePaymentStep cardError={cardError} total={total} />}
          {step === 3 && <ReceiptStep order={placedOrder} />}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
          {step > 0 && step < 3 && (
            <button onClick={handleBack} disabled={processing} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 transition disabled:opacity-40">
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              disabled={processing || (step === 2 && !stripe)}
              className="ml-auto flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing
                ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Processing…</>
                : step === 2
                  ? <>Pay ${total} <CreditCard size={15} /></>
                  : <>Continue <ChevronRight size={16} /></>
              }
            </button>
          )}
          {step === 3 && (
            <button onClick={onClose} className="ml-auto rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-500/20">
              Done ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Public export — wraps inner modal in Elements provider ────────────────────
const CheckoutModal = ({ book, onClose }) => (
  <Elements stripe={stripePromise}>
    <CheckoutInner book={book} onClose={onClose} />
  </Elements>
);

export default CheckoutModal;
