import { useEffect, useMemo, useState } from 'react';
import { computeOrderTotal, getAdminOrders, updateAdminOrderStatus } from '../adminStore';

function formatLkr(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString()}`;
}

function statusClass(status) {
  if (status === 'fulfilled') return 'pill success';
  if (status === 'confirmed') return 'pill warn';
  if (status === 'cancelled') return 'pill danger';
  return 'pill';
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setOrders(getAdminOrders());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        String(o.id).includes(q) ||
        String(o.customer || '').toLowerCase().includes(q) ||
        String(o.phone || '').toLowerCase().includes(q) ||
        String(o.status || '').toLowerCase().includes(q)
    );
  }, [orders, query]);

  const onStatus = (id, status) => {
    setOrders(updateAdminOrderStatus(id, status));
  };

  return (
    <div className="admin-card admin-section">
      <div className="admin-actions" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Search orders… (id, customer, status)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search orders"
          style={{ maxWidth: 420 }}
        />
        <div className="admin-muted" style={{ fontSize: '0.9rem' }}>
          Demo orders stored in localStorage
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Order</th>
            <th>Customer</th>
            <th style={{ width: 160 }}>Status</th>
            <th style={{ width: 150 }}>Total</th>
            <th style={{ width: 240 }}>Items</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td style={{ fontWeight: 800 }}>#{o.id}</td>
              <td>
                <div style={{ fontWeight: 800 }}>{o.customer}</div>
                <div className="admin-muted" style={{ fontSize: '0.9rem' }}>
                  {o.phone}
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className={statusClass(o.status)}>{o.status}</span>
                  <select
                    value={o.status}
                    onChange={(e) => onStatus(o.id, e.target.value)}
                    aria-label={`Update status for order ${o.id}`}
                    style={{ padding: '10px 12px', borderRadius: 12 }}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="fulfilled">fulfilled</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
              </td>
              <td style={{ fontWeight: 800 }}>{formatLkr(computeOrderTotal(o))}</td>
              <td className="admin-muted" style={{ fontSize: '0.9rem' }}>
                {(o.items || []).map((it, idx) => (
                  <div key={`${o.id}-${idx}`}>
                    {it.qty} × {it.name}
                  </div>
                ))}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="admin-muted">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

