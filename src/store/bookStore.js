// ─── BookNest Shared Store ────────────────────────────────────────────────────
// Acts as a lightweight "database" using localStorage.
// All roles (customer, shopowner, admin, delivery) read/write through these helpers.

const BOOKS_KEY  = 'bn_books';
const ORDERS_KEY = 'bn_orders';
const EVENT      = 'bn-store-updated';
const DEMO_SEED_KEY = 'bn_books_seeded';
const MAX_COVER_DATA_URL = 150000;

const emit = () => window.dispatchEvent(new Event(EVENT));

// ── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9).toUpperCase();

const normalizeCoverUrl = (coverUrl) => {
  if (!coverUrl) return '';
  if (coverUrl.startsWith('data:') && coverUrl.length > MAX_COVER_DATA_URL) {
    throw new Error('Cover image is too large. Use a smaller image or paste a URL.');
  }
  return coverUrl;
};

const DEMO_BOOKS = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    price: 14.99,
    stock: 12,
    coverUrl: 'https://placehold.co/300x450?text=Atomic+Habits',
    description: 'Tiny changes, remarkable results.',
    shopAddress: '45 High Street, Manchester, UK'
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    price: 18.5,
    stock: 8,
    coverUrl: 'https://placehold.co/300x450?text=Sapiens',
    description: 'A brief history of humankind.',
    shopAddress: '221B Oxford St, London, UK'
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Fantasy',
    price: 12.0,
    stock: 5,
    coverUrl: 'https://placehold.co/300x450?text=Dune',
    description: 'Epic science fiction saga on a desert planet.',
    shopAddress: '10 Deansgate, Manchester, UK'
  }
];

export const seedBooks = (seed = DEMO_BOOKS) => {
  if (getBooks().length > 0) return false;
  const seeded = seed.map((book) => ({
    ...book,
    id: uid(),
    shopId: 'demo@booknest.com',
    shopName: 'BookNest Demo Shop',
    createdAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)
  }));
  localStorage.setItem(BOOKS_KEY, JSON.stringify(seeded));
  localStorage.setItem(DEMO_SEED_KEY, 'true');
  emit();
  return true;
};

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
    coverUrl:  normalizeCoverUrl(book.coverUrl || ''),
  };
  try {
    localStorage.setItem(BOOKS_KEY, JSON.stringify([...books, entry]));
    emit();
    return entry;
  } catch {
    throw new Error('Storage limit reached. Remove some books or use smaller images.');
  }
};

export const updateBook = (id, patch) => {
  const safePatch = { ...patch };
  if (Object.prototype.hasOwnProperty.call(safePatch, 'coverUrl')) {
    safePatch.coverUrl = normalizeCoverUrl(safePatch.coverUrl || '');
  }
  const books = getBooks().map(b => b.id === id ? { ...b, ...safePatch } : b);
  try {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    emit();
  } catch {
    throw new Error('Storage limit reached. Remove some books or use smaller images.');
  }
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
