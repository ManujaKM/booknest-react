import { useState, useCallback, useRef } from 'react';
import { X, BookOpen, DollarSign, Package, Tag, Image, AlignLeft, MapPin, Upload, Link2, Trash2 } from 'lucide-react';

const CATEGORIES = ['Fiction', 'Non-Fiction', 'Self-Help', 'Business', 'Science', 'Tech', 'History', 'Psychology', 'Fantasy', 'Mystery', 'Biography', 'Children', 'Other'];

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
      <Icon size={12} /> {label}
    </label>
    {children}
  </div>
);

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition";

const AddBookModal = ({ onClose, onSave, initial = null }) => {
  const [form, setForm] = useState(initial ? {
    title:       initial.title       || '',
    author:      initial.author      || '',
    isbn:        initial.isbn        || '',
    category:    initial.category    || 'Fiction',
    price:       initial.price       || '',
    stock:       initial.stock       || '',
    coverUrl:    initial.coverUrl    || '',
    description: initial.description || '',
    shopAddress: initial.shopAddress || '',
  } : {
    title: '', author: '', isbn: '', category: 'Fiction',
    price: '', stock: '', coverUrl: '', description: '', shopAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [coverMode, setCoverMode] = useState('upload'); // 'upload' | 'url'
  const fileRef = useRef(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ── Base64 converter ───────────────────────────────────────────────
  const readFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => set('coverUrl', e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    readFile(file);
  }, [readFile]);

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);
  const onFileChange = (e) => readFile(e.target.files?.[0]);

  const validate = () => {
    const e = {};
    if (!form.title.trim())  e.title  = 'Title is required';
    if (!form.author.trim()) e.author = 'Author is required';
    if (!form.price || isNaN(+form.price) || +form.price <= 0) e.price = 'Valid price required';
    if (!form.stock || isNaN(+form.stock) || +form.stock < 0)  e.stock = 'Valid stock required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    try {
      onSave({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to save book.';
      setSubmitError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#131325] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30">
              <BookOpen size={20} className="text-purple-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{initial ? 'Edit Book' : 'Add New Book'}</h2>
              <p className="text-xs text-gray-500">{initial ? 'Update your book listing' : 'Fill in the details to list your book'}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-gray-500 hover:bg-white/10 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Book Title" icon={BookOpen}>
              <input className={inputCls} placeholder="e.g. Atomic Habits" value={form.title} onChange={e => set('title', e.target.value)} />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
            </Field>
            <Field label="Author" icon={BookOpen}>
              <input className={inputCls} placeholder="e.g. James Clear" value={form.author} onChange={e => set('author', e.target.value)} />
              {errors.author && <p className="mt-1 text-xs text-red-400">{errors.author}</p>}
            </Field>
            <Field label="Price ($)" icon={DollarSign}>
              <input className={inputCls} type="number" step="0.01" min="0" placeholder="e.g. 14.99" value={form.price} onChange={e => set('price', e.target.value)} />
              {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price}</p>}
            </Field>
            <Field label="Stock Quantity" icon={Package}>
              <input className={inputCls} type="number" min="0" placeholder="e.g. 50" value={form.stock} onChange={e => set('stock', e.target.value)} />
              {errors.stock && <p className="mt-1 text-xs text-red-400">{errors.stock}</p>}
            </Field>
            <Field label="Category" icon={Tag}>
              <select className={inputCls + ' cursor-pointer'} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="ISBN (optional)" icon={Tag}>
              <input className={inputCls} placeholder="e.g. 978-0-7352-1…" value={form.isbn} onChange={e => set('isbn', e.target.value)} />
            </Field>
          </div>

          {/* ── Cover Image — Drag-and-drop or URL ── */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <Image size={12} /> Cover Image
              </label>
              {/* Mode toggle */}
              <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5 text-[10px] font-semibold">
                <button type="button" onClick={() => setCoverMode('upload')} className={`rounded-md px-2.5 py-1 transition ${coverMode === 'upload' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-white'}`}>
                  <Upload size={10} className="inline mr-1" />Upload
                </button>
                <button type="button" onClick={() => setCoverMode('url')} className={`rounded-md px-2.5 py-1 transition ${coverMode === 'url' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-white'}`}>
                  <Link2 size={10} className="inline mr-1" />URL
                </button>
              </div>
            </div>

            {coverMode === 'url' ? (
              <input
                className={inputCls}
                placeholder="https://example.com/cover.jpg"
                value={form.coverUrl.startsWith('data:') ? '' : form.coverUrl}
                onChange={e => set('coverUrl', e.target.value)}
              />
            ) : (
              /* Drag-and-drop zone */
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => !form.coverUrl && fileRef.current?.click()}
                className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition ${
                  dragOver
                    ? 'border-purple-500/70 bg-purple-500/10'
                    : 'border-white/20 bg-white/[0.03] hover:border-purple-500/40 hover:bg-purple-500/5'
                }`}
              >
                {form.coverUrl ? (
                  /* Preview */
                  <>
                    <img
                      src={form.coverUrl}
                      alt="Cover"
                      className="h-32 w-auto max-w-[100px] rounded-xl object-cover border border-white/10 shadow-xl"
                      onError={e => e.target.style.opacity = '0.3'}
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); set('coverUrl', ''); }}
                      className="absolute right-2 top-2 rounded-lg border border-red-500/30 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                    <p className="text-xs text-gray-500">Click the trash icon to replace</p>
                  </>
                ) : (
                  /* Empty state */
                  <>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition ${dragOver ? 'scale-110' : ''}`}>
                      <Upload size={22} className="text-purple-300" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">Drop image here</p>
                      <p className="text-xs text-gray-500">or <span className="text-purple-300 underline">click to browse</span> · JPG, PNG, WebP</p>
                    </div>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
              </div>
            )}
          </div>

          <Field label="Shop / Pickup Address" icon={MapPin}>
            <input className={inputCls} placeholder="e.g. 45 High Street, Manchester, UK" value={form.shopAddress} onChange={e => set('shopAddress', e.target.value)} />
          </Field>

          <Field label="Description (optional)" icon={AlignLeft}>
            <textarea className={inputCls + ' resize-none h-24'} placeholder="Brief summary of the book…" value={form.description} onChange={e => set('description', e.target.value)} />
          </Field>

          {submitError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
              {submitError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-500/20">
              {initial ? 'Update Book' : 'List Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
