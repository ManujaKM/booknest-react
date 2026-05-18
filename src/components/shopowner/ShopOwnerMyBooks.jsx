import { useEffect, useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Package, Search, AlertCircle } from 'lucide-react';
import { getBooks, addBook, updateBook, deleteBook, STORE_EVENT } from '../../store/bookStore.js';
import AddBookModal from './AddBookModal.jsx';

const ShopOwnerMyBooks = ({ user }) => {
  const [books, setBooks]         = useState([]);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook]   = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const myShopId = user?.email || '';

  const load = () => setBooks(getBooks().filter(b => b.shopId === myShopId));

  useEffect(() => {
    load();
    window.addEventListener(STORE_EVENT, load);
    return () => window.removeEventListener(STORE_EVENT, load);
  }, [myShopId]);

  const handleSave = (data) => {
    if (editBook) { updateBook(editBook.id, data); setEditBook(null); }
    else addBook(data);
    setShowModal(false);
  };

  const handleDelete = (id) => { deleteBook(id); setConfirmDel(null); };

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Books</h1>
          <p className="text-sm text-gray-400 mt-1">{books.length} book{books.length !== 1 ? 's' : ''} listed</p>
        </div>
        <button
          onClick={() => { setEditBook(null); setShowModal(true); }}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-500/20"
        >
          <Plus size={18} /> Add Book
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <Search size={16} className="text-gray-400" />
        <input
          className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          placeholder="Search your books…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <BookOpen size={32} className="text-purple-300" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {search ? 'No books match your search' : 'No books listed yet'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? 'Try a different search term' : 'Click "Add Book" to list your first book'}
          </p>
        </div>
      )}

      {/* Book Table */}
      {filtered.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4">Book</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(book => (
                  <tr key={book.id} className="transition hover:bg-white/[0.03]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {book.coverUrl
                          ? <img src={book.coverUrl} alt={book.title} className="h-12 w-8 rounded-md object-cover border border-white/10 shrink-0" onError={e => e.target.style.display='none'} />
                          : <div className="flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-purple-500/10 border border-purple-500/20"><BookOpen size={14} className="text-purple-300" /></div>
                        }
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{book.title}</p>
                          <p className="text-xs text-gray-400 truncate">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-400">${parseFloat(book.price).toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${book.stock < 5 ? 'border-red-500/20 bg-red-500/10 text-red-400' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}`}>
                        {book.stock} left
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditBook(book); setShowModal(true); }}
                          className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-400 hover:text-white transition"
                        ><Edit2 size={15} /></button>
                        <button
                          onClick={() => setConfirmDel(book)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition"
                        ><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <AddBookModal
          initial={editBook}
          onClose={() => { setShowModal(false); setEditBook(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {confirmDel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#131325] p-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete "{confirmDel.title}"?</h3>
            <p className="text-sm text-gray-400">This will remove the book from the marketplace. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDel(null)} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition">Cancel</button>
              <button onClick={() => handleDelete(confirmDel.id)} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white hover:bg-red-400 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOwnerMyBooks;
