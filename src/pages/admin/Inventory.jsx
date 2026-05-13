import { useMemo, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar.jsx';

const initialBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    category: 'Self Help',
    price: 15.99,
    stock: 24,
    updatedAt: 'May 13, 2026',
    description: 'Tiny changes, remarkable results.',
    dateAdded: 'Jan 12, 2026'
  },
  {
    id: 2,
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    category: 'Fiction',
    price: 18.5,
    stock: 12,
    updatedAt: 'May 12, 2026',
    description: 'Epic science fiction saga.',
    dateAdded: 'Feb 03, 2026'
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Classic',
    price: 12.0,
    stock: 8,
    updatedAt: 'May 11, 2026',
    description: 'A novel about the American dream.',
    dateAdded: 'Mar 18, 2026'
  },
  {
    id: 4,
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    isbn: '9781451648539',
    category: 'Biography',
    price: 22.5,
    stock: 24,
    updatedAt: 'May 10, 2026',
    description: 'Biography of Steve Jobs.',
    dateAdded: 'Apr 02, 2026'
  }
];

const categoryOptions = [
  'All',
  'Self Help',
  'Fiction',
  'Classic',
  'Biography',
  'Science',
  'Mystery'
];

const Inventory = () => {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [stockStatus, setStockStatus] = useState('All Stock');
  const [priceRange, setPriceRange] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [detailBook, setDetailBook] = useState(null);
  const [historyBook, setHistoryBook] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  const [draft, setDraft] = useState({
    title: '',
    author: '',
    category: 'Self Help',
    price: '',
    stock: '',
    isbn: '',
    description: ''
  });

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const resetDraft = () => {
    setDraft({
      title: '',
      author: '',
      category: 'Self Help',
      price: '',
      stock: '',
      isbn: '',
      description: ''
    });
    setFormErrors({});
  };

  const openAdd = () => {
    resetDraft();
    setEditBook(null);
    setShowAddModal(true);
  };

  const openEdit = (book) => {
    setEditBook(book);
    setDraft({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      stock: book.stock,
      isbn: book.isbn,
      description: book.description
    });
    setShowAddModal(true);
  };

  const validateDraft = () => {
    const errors = {};
    if (!draft.title.trim()) errors.title = 'Title is required';
    if (!draft.author.trim()) errors.author = 'Author is required';
    if (!draft.category) errors.category = 'Category is required';
    if (!draft.price || Number(draft.price) <= 0) errors.price = 'Price must be greater than 0';
    if (draft.stock === '' || Number(draft.stock) < 0) errors.stock = 'Stock must be 0 or more';
    return errors;
  };

  const handleSave = () => {
    const errors = validateDraft();
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    if (editBook) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === editBook.id
            ? {
                ...book,
                ...draft,
                price: Number(draft.price),
                stock: Number(draft.stock),
                updatedAt: 'May 13, 2026'
              }
            : book
        )
      );
      showToast('Book updated', 'success');
    } else {
      setBooks((prev) => [
        {
          id: Date.now(),
          ...draft,
          price: Number(draft.price),
          stock: Number(draft.stock),
          updatedAt: 'May 13, 2026',
          dateAdded: 'May 13, 2026'
        },
        ...prev
      ]);
      showToast('Book added successfully', 'success');
    }
    setShowAddModal(false);
  };

  const handleDelete = (book) => {
    setBooks((prev) => prev.filter((item) => item.id !== book.id));
    showToast('Book deleted', 'warning');
    setMenuId(null);
  };

  const handleStockChange = (book, delta) => {
    setBooks((prev) =>
      prev.map((item) =>
        item.id === book.id
          ? {
              ...item,
              stock: Math.max(0, item.stock + delta),
              updatedAt: 'May 13, 2026'
            }
          : item
      )
    );
    showToast('Stock updated', 'success');
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setStockStatus('All Stock');
    setPriceRange('All');
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchMatch = `${book.title} ${book.author}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatch = category === 'All' || book.category === category;
      let stockMatch = true;
      if (stockStatus === 'In Stock (≥10)') stockMatch = book.stock >= 10;
      if (stockStatus === 'Low Stock (1–9)') stockMatch = book.stock >= 1 && book.stock <= 9;
      if (stockStatus === 'Out of Stock (0)') stockMatch = book.stock === 0;
      let priceMatch = true;
      if (priceRange === 'Under $15') priceMatch = book.price < 15;
      if (priceRange === '$15–$25') priceMatch = book.price >= 15 && book.price <= 25;
      if (priceRange === 'Over $25') priceMatch = book.price > 25;
      return searchMatch && categoryMatch && stockMatch && priceMatch;
    });
  }, [books, search, category, stockStatus, priceRange]);

  const summary = useMemo(() => {
    const total = books.length;
    const inStock = books.filter((book) => book.stock >= 10).length;
    const lowStock = books.filter((book) => book.stock >= 1 && book.stock <= 9).length;
    const outStock = books.filter((book) => book.stock === 0).length;
    return { total, inStock, lowStock, outStock };
  }, [books]);

  const statusBadge = (stock) => {
    if (stock === 0) return { label: 'Out of stock', color: '#94a3b8' };
    if (stock < 10) return { label: 'Low stock', color: '#fbbf24' };
    if (stock < 20) return { label: 'In stock', color: '#fbbf24' };
    return { label: 'In stock', color: '#34d399' };
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white">
      <Sidebar />
      <main className="admin-shell">
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Inventory Management</h1>
              <p className="text-sm text-[#8a8fa8]">Manage your book stock</p>
            </div>
            <button
              type="button"
              onClick={openAdd}
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white"
            >
              + Add New Book
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-[#2a2d42] bg-[#1a1d2e] p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search books..."
                className="w-full rounded-lg border border-[#2a2d42] bg-[#0f1322] px-3 py-2 text-sm text-[#e2e4f0]"
              />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-[#2a2d42] bg-[#0f1322] px-3 py-2 text-sm text-[#e2e4f0]"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={stockStatus}
                onChange={(event) => setStockStatus(event.target.value)}
                className="w-full rounded-lg border border-[#2a2d42] bg-[#0f1322] px-3 py-2 text-sm text-[#e2e4f0]"
              >
                {['All Stock', 'In Stock (≥10)', 'Low Stock (1–9)', 'Out of Stock (0)'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={priceRange}
                onChange={(event) => setPriceRange(event.target.value)}
                className="w-full rounded-lg border border-[#2a2d42] bg-[#0f1322] px-3 py-2 text-sm text-[#e2e4f0]"
              >
                {['All', 'Under $15', '$15–$25', 'Over $25'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg border border-[#2a2d42] bg-[#12141f] px-3 py-2 text-sm text-[#8a8fa8]"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-[#2a2d42] bg-[#1a1d2e] px-3 py-1 text-[#e2e4f0]">
              Total SKUs: {summary.total}
            </span>
            <span className="rounded-full border border-[#2a2d42] bg-[rgba(16,185,129,0.15)] px-3 py-1 text-[#34d399]">
              In Stock: {summary.inStock}
            </span>
            <span className="rounded-full border border-[#2a2d42] bg-[rgba(245,158,11,0.12)] px-3 py-1 text-[#fbbf24]">
              Low Stock: {summary.lowStock}
            </span>
            <span className="rounded-full border border-[#2a2d42] bg-[rgba(239,68,68,0.12)] px-3 py-1 text-[#f87171]">
              Out of Stock: {summary.outStock}
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-[#2a2d42] bg-[#1a1d2e]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2d42] text-xs uppercase tracking-wider text-[#8a8fa8]">
                  <th className="px-4 py-4">#</th>
                  <th className="px-4 py-4">Book</th>
                  <th className="px-4 py-4">ISBN</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">Stock</th>
                  <th className="px-4 py-4">Last Updated</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2d42]">
                {filteredBooks.map((book, index) => {
                  const badge = statusBadge(book.stock);
                  return (
                    <tr key={book.id} className="transition hover:bg-white/[0.02]">
                      <td className="px-4 py-4 text-[#8a8fa8]">{index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-[#e2e4f0]">{book.title}</div>
                        <div className="text-xs text-[#8a8fa8]">{book.author}</div>
                      </td>
                      <td className="px-4 py-4 text-[#8a8fa8]">{book.isbn || '—'}</td>
                      <td className="px-4 py-4 text-[#8a8fa8]">{book.category}</td>
                      <td className="px-4 py-4 text-[#34d399]">${book.price.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStockChange(book, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#2a2d42] text-[#8a8fa8]"
                          >
                            -
                          </button>
                          <div className="min-w-[36px] text-center text-[#e2e4f0]">{book.stock}</div>
                          <button
                            type="button"
                            onClick={() => handleStockChange(book, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#2a2d42] text-[#8a8fa8]"
                          >
                            +
                          </button>
                        </div>
                        <span
                          className="mt-2 inline-flex rounded-full px-2 py-1 text-[11px]"
                          style={{ background: `${badge.color}1A`, color: badge.color }}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#8a8fa8]">{book.updatedAt}</td>
                      <td className="relative px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setMenuId((current) => (current === book.id ? null : book.id))}
                          className="rounded-lg border border-[#2a2d42] bg-[#12141f] px-2 py-1 text-[#8a8fa8]"
                        >
                          ⋮
                        </button>
                        {menuId === book.id && (
                          <div className="absolute right-4 top-12 z-10 w-44 rounded-xl border border-[#2a2d42] bg-[#12141f] p-2 text-xs shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                setMenuId(null);
                                openEdit(book);
                              }}
                              className="block w-full rounded-lg px-3 py-2 text-left text-[#e2e4f0] hover:bg-[#1a1d2e]"
                            >
                              Edit Book
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuId(null);
                                setDetailBook(book);
                              }}
                              className="block w-full rounded-lg px-3 py-2 text-left text-[#e2e4f0] hover:bg-[#1a1d2e]"
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setMenuId(null);
                                setHistoryBook(book);
                              }}
                              className="block w-full rounded-lg px-3 py-2 text-left text-[#e2e4f0] hover:bg-[#1a1d2e]"
                            >
                              Stock History
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(book)}
                              className="block w-full rounded-lg px-3 py-2 text-left text-[#f87171] hover:bg-[#1a1d2e]"
                            >
                              Delete Book
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredBooks.length === 0 && (
              <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                <div className="text-3xl text-[#8a8fa8]">📘</div>
                <p className="text-sm text-[#e2e4f0]">No books found</p>
                <p className="text-xs text-[#8a8fa8]">Try adjusting your filters</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 rounded-lg border border-[#2a2d42] px-4 py-2 text-xs text-[#8a8fa8]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showAddModal && (
        <div className="modal-overlay open">
          <div className="modal">
            <div className="mb-4 text-lg font-semibold text-[#e2e4f0]">
              {editBook ? `Edit Book — ${editBook.title}` : 'Add New Book'}
            </div>
            <div className="form-row-2">
              <div>
                <label>Book Title</label>
                <input
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className={formErrors.title ? 'border-red-500' : ''}
                />
                {formErrors.title && <p className="text-xs text-[#f87171]">{formErrors.title}</p>}
              </div>
              <div>
                <label>Author</label>
                <input
                  value={draft.author}
                  onChange={(event) => setDraft({ ...draft, author: event.target.value })}
                  className={formErrors.author ? 'border-red-500' : ''}
                />
                {formErrors.author && <p className="text-xs text-[#f87171]">{formErrors.author}</p>}
              </div>
            </div>
            <div className="form-row-2">
              <div>
                <label>Category</label>
                <select
                  value={draft.category}
                  onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                  className={formErrors.category ? 'border-red-500' : ''}
                >
                  {categoryOptions.filter((item) => item !== 'All').map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {formErrors.category && <p className="text-xs text-[#f87171]">{formErrors.category}</p>}
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={draft.price}
                  onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                  className={formErrors.price ? 'border-red-500' : ''}
                />
                {formErrors.price && <p className="text-xs text-[#f87171]">{formErrors.price}</p>}
              </div>
            </div>
            <div className="form-row-2">
              <div>
                <label>Stock Qty</label>
                <input
                  type="number"
                  min="0"
                  value={draft.stock}
                  onChange={(event) => setDraft({ ...draft, stock: event.target.value })}
                  className={formErrors.stock ? 'border-red-500' : ''}
                />
                {formErrors.stock && <p className="text-xs text-[#f87171]">{formErrors.stock}</p>}
              </div>
              <div>
                <label>ISBN</label>
                <input
                  value={draft.isbn}
                  onChange={(event) => setDraft({ ...draft, isbn: event.target.value })}
                />
              </div>
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows={3}
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleSave}>
                Save Book
              </button>
            </div>
          </div>
        </div>
      )}

      {detailBook && (
        <div className="modal-overlay open">
          <div className="modal">
            <div className="mb-4 text-lg font-semibold">Book Details</div>
            <div className="space-y-3 text-sm text-[#e2e4f0]">
              <div className="h-24 w-full rounded-xl bg-[#1a1d2e]" />
              <div className="text-base font-semibold">{detailBook.title}</div>
              <div className="text-[#8a8fa8]">{detailBook.author}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>Category: {detailBook.category}</div>
                <div>Price: ${detailBook.price.toFixed(2)}</div>
                <div>Stock: {detailBook.stock}</div>
                <div>ISBN: {detailBook.isbn || '—'}</div>
              </div>
              <div>Description: {detailBook.description}</div>
              <div>Date Added: {detailBook.dateAdded}</div>
            </div>
            <div className="mt-5 flex justify-end">
              <button type="button" className="btn-cancel" onClick={() => setDetailBook(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {historyBook && (
        <div className="modal-overlay open">
          <div className="modal">
            <div className="mb-3 text-lg font-semibold">
              Stock History — {historyBook.title}
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#8a8fa8]">
                  <th className="py-2">Date</th>
                  <th className="py-2">Change</th>
                  <th className="py-2">Reason</th>
                  <th className="py-2">Admin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">May 13</td>
                  <td className="py-2 text-[#34d399]">+10</td>
                  <td className="py-2">Manual restock</td>
                  <td className="py-2">Admin User</td>
                </tr>
                <tr>
                  <td className="py-2">May 10</td>
                  <td className="py-2 text-[#fbbf24]">-3</td>
                  <td className="py-2">Customer orders</td>
                  <td className="py-2">System</td>
                </tr>
                <tr>
                  <td className="py-2">May 8</td>
                  <td className="py-2 text-[#34d399]">+20</td>
                  <td className="py-2">Initial stock</td>
                  <td className="py-2">Admin User</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-5 flex justify-end">
              <button type="button" className="btn-cancel" onClick={() => setHistoryBook(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-lg border-l-4 bg-[#1a1d2e] px-4 py-3 text-sm shadow-lg"
            style={{
              borderColor:
                toast.type === 'error'
                  ? '#f87171'
                  : toast.type === 'warning'
                    ? '#fbbf24'
                    : '#34d399'
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
