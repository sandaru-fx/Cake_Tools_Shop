import { useEffect, useMemo, useState } from 'react';
import {
  deleteAdminProduct,
  getAdminProducts,
  upsertAdminProduct,
} from '../adminStore';

const EMPTY = {
  id: '',
  name: '',
  description: '',
  category: 'baking',
  price: 0,
  originalPrice: '',
  rating: 4.5,
  reviews: 0,
  badge: '',
  image: '/images/placeholder.png',
};

function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        String(p.name || '').toLowerCase().includes(q) ||
        String(p.description || '').toLowerCase().includes(q) ||
        String(p.category || '').toLowerCase().includes(q)
    );
  }, [products, query]);

  const startNew = () => {
    const maxId = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
    setEditing({ ...EMPTY, id: maxId + 1 });
  };

  const startEdit = (p) => setEditing({ ...p });

  const onSave = (e) => {
    e.preventDefault();
    const next = {
      ...editing,
      id: toNumber(editing.id),
      price: toNumber(editing.price),
      originalPrice: editing.originalPrice === '' ? undefined : toNumber(editing.originalPrice),
      rating: toNumber(editing.rating, 4.5),
      reviews: toNumber(editing.reviews, 0),
      name: String(editing.name || '').trim(),
      description: String(editing.description || '').trim(),
      badge: String(editing.badge || '').trim() || undefined,
      image: String(editing.image || '').trim() || '/images/placeholder.png',
    };

    if (!next.name) return;
    setProducts(upsertAdminProduct(next));
    setEditing(null);
  };

  const onDelete = (id) => {
    setProducts(deleteAdminProduct(id));
    if (editing?.id === id) setEditing(null);
  };

  return (
    <div className="admin-grid">
      <section className="admin-card admin-section">
        <div className="admin-actions" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <input
            className="input"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
            style={{ maxWidth: 360 }}
          />
          <button className="btn btn-primary btn-sm" onClick={startNew}>
            + New product
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>ID</th>
              <th>Name</th>
              <th style={{ width: 140 }}>Category</th>
              <th style={{ width: 140 }}>Price</th>
              <th style={{ width: 160 }}>Badge</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="admin-muted">{p.id}</td>
                <td>
                  <div style={{ fontWeight: 800 }}>{p.name}</div>
                  <div className="admin-muted" style={{ fontSize: '0.9rem' }}>
                    {String(p.description || '').slice(0, 70)}
                    {String(p.description || '').length > 70 ? '…' : ''}
                  </div>
                </td>
                <td>
                  <span className="pill">{p.category}</span>
                </td>
                <td style={{ fontWeight: 800 }}>Rs. {Number(p.price || 0).toLocaleString()}</td>
                <td>{p.badge ? <span className="pill warn">{p.badge}</span> : <span className="admin-muted">—</span>}</td>
                <td>
                  <div className="admin-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => startEdit(p)}>
                      Edit
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => onDelete(p.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="admin-muted" style={{ marginTop: 10, fontSize: '0.9rem' }}>
          Note: This edits the admin catalog stored in localStorage. Public shop currently uses `src/data/products`—we can wire it
          to use this admin catalog next.
        </p>
      </section>

      <section className="admin-card admin-section">
        <h3>{editing ? `Edit product #${editing.id}` : 'Product editor'}</h3>

        {!editing ? (
          <div className="admin-muted" style={{ lineHeight: 1.8 }}>
            Select a product to edit, or create a new one.
          </div>
        ) : (
          <form className="admin-form" onSubmit={onSave}>
            <div className="row">
              <label htmlFor="p-name">Name</label>
              <input
                id="p-name"
                value={editing.name}
                onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))}
                required
              />
            </div>

            <div className="row">
              <label htmlFor="p-desc">Description</label>
              <textarea
                id="p-desc"
                value={editing.description}
                onChange={(e) => setEditing((s) => ({ ...s, description: e.target.value }))}
              />
            </div>

            <div className="row">
              <label htmlFor="p-cat">Category</label>
              <select
                id="p-cat"
                value={editing.category}
                onChange={(e) => setEditing((s) => ({ ...s, category: e.target.value }))}
              >
                <option value="baking">baking</option>
                <option value="decorating">decorating</option>
                <option value="molds">molds</option>
                <option value="pro">pro</option>
              </select>
            </div>

            <div className="row">
              <label htmlFor="p-img">Image path</label>
              <input
                id="p-img"
                value={editing.image}
                onChange={(e) => setEditing((s) => ({ ...s, image: e.target.value }))}
                placeholder="/images/..."
              />
              <div className="admin-muted" style={{ fontSize: '0.85rem' }}>
                Use something like `/images/your_image.png` (in `public/images`).
              </div>
            </div>

            <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label htmlFor="p-price">Price</label>
                <input
                  id="p-price"
                  type="number"
                  value={editing.price}
                  onChange={(e) => setEditing((s) => ({ ...s, price: e.target.value }))}
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="p-op">Original price (optional)</label>
                <input
                  id="p-op"
                  type="number"
                  value={editing.originalPrice}
                  onChange={(e) => setEditing((s) => ({ ...s, originalPrice: e.target.value }))}
                  min="0"
                />
              </div>
            </div>

            <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label htmlFor="p-rating">Rating</label>
                <input
                  id="p-rating"
                  type="number"
                  step="0.1"
                  value={editing.rating}
                  onChange={(e) => setEditing((s) => ({ ...s, rating: e.target.value }))}
                  min="0"
                  max="5"
                />
              </div>
              <div>
                <label htmlFor="p-rev">Reviews</label>
                <input
                  id="p-rev"
                  type="number"
                  value={editing.reviews}
                  onChange={(e) => setEditing((s) => ({ ...s, reviews: e.target.value }))}
                  min="0"
                />
              </div>
            </div>

            <div className="row">
              <label htmlFor="p-badge">Badge (optional)</label>
              <input
                id="p-badge"
                value={editing.badge || ''}
                onChange={(e) => setEditing((s) => ({ ...s, badge: e.target.value }))}
                placeholder="Bestseller / Essential / Pro Series…"
              />
            </div>

            <div className="admin-actions" style={{ marginTop: 6 }}>
              <button className="btn btn-primary btn-sm" type="submit">
                Save
              </button>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

