// ─── BookNest Shared Store ────────────────────────────────────────────────────
// Acts as a lightweight "database" using localStorage.
// All roles (customer, shopowner, admin, delivery) read/write through these helpers.

const BOOKS_KEY  = 'bn_books';
const ORDERS_KEY = 'bn_orders';
const EVENT      = 'bn-store-updated';

const emit = () => window.dispatchEvent(new Event(EVENT));

// ── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9).toUpperCase();

// ── Books ─────────────────────────────────────────────────────────────────────
export const getBooks = () => {
  try { return JSON.parse(localStorage.getItem(BOOKS_KEY)) || []; }
  catch { return []; }
};

export const addBook = (book) => {
  const user  = getCurrentUser();
  const books = getBooks();
  const entry = {
    ...book,
    id:        uid(),
    shopId:    user?.email || 'unknown',
    shopName:  user?.shopName || user?.name || 'Unknown Shop',
    createdAt: Date.now(),
  };
  localStorage.setItem(BOOKS_KEY, JSON.stringify([...books, entry]));
  emit();
  return entry;
};

export const updateBook = (id, patch) => {
  const books = getBooks().map(b => b.id === id ? { ...b, ...patch } : b);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  emit();
};

export const deleteBook = (id) => {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(getBooks().filter(b => b.id !== id)));
  emit();
};

// ── Orders ────────────────────────────────────────────────────────────────────
export const getOrders = () => {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
};

export const addOrder = (order) => {
  const orders = getOrders();
  const entry  = {
    ...order,
    id:        'ORD-' + uid(),
    status:    'pending',
    createdAt: Date.now(),
  };
  localStorage.setItem(ORDERS_KEY, JSON.stringify([entry, ...orders]));
  emit();
  return entry;
};

export const updateOrder = (id, patch) => {
  const orders = getOrders().map(o => o.id === id ? { ...o, ...patch } : o);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  emit();
};

// ── Current user ──────────────────────────────────────────────────────────────
export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('bn_user')); }
  catch { return null; }
};

export const STORE_EVENT = EVENT;
