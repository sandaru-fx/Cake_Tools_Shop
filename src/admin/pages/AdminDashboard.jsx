import { useEffect, useMemo, useState } from 'react';
import {
  computeOrderTotal,
  getAdminOrders,
  getAdminProducts,
} from '../adminStore';
import AdminStats from '../components/AdminStats';

function formatLkr(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString()}`;
}

function formatAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function statusClass(status) {
  if (status === 'fulfilled') return 'pill success';
  if (status === 'confirmed') return 'pill warn';
  if (status === 'cancelled') return 'pill danger';
  return 'pill';
}

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setProducts(getAdminProducts());
    setOrders(getAdminOrders());
  }, []);

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const pending = orders.filter((o) => o.status === 'pending').length;
    const revenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + computeOrderTotal(o), 0);

    return { totalProducts, totalOrders, pending, revenue };
  }, [products, orders]);

  const recent = useMemo(() => {
    return [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  }, [orders]);

  return (
    <div>
      <AdminStats
        items={[
          {
            key: 'products',
            label: 'Total products',
            value: metrics.totalProducts,
            hint: 'Stored in local admin catalog',
          },
          {
            key: 'orders',
            label: 'Total orders',
            value: metrics.totalOrders,
            hint: 'Demo orders (localStorage)',
          },
          {
            key: 'pending',
            label: 'Pending orders',
            value: metrics.pending,
            hint: 'Needs confirmation/fulfillment',
          },
          {
            key: 'revenue',
            label: 'Revenue (demo)',
            value: formatLkr(metrics.revenue),
            hint: 'Excludes cancelled orders',
          },
        ]}
      />

      <div className="admin-grid">
        <section className="admin-card admin-section">
          <h3>Recent orders</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{o.customer}</div>
                    <div className="admin-muted" style={{ fontSize: '0.9rem' }}>
                      {o.phone}
                    </div>
                  </td>
                  <td>
                    <span className={statusClass(o.status)}>{o.status}</span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{formatLkr(computeOrderTotal(o))}</td>
                  <td className="admin-muted">{formatAgo(o.createdAt)}</td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="admin-muted">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="admin-card admin-section">
          <h3>Quick actions</h3>
          <div className="admin-form">
            <div className="admin-kpi">
              <div>
                <div className="admin-muted">Tip</div>
                <strong>Use Products page to edit catalog</strong>
              </div>
              <div className="pill">/admin/products</div>
            </div>
            <div className="admin-kpi">
              <div>
                <div className="admin-muted">Tip</div>
                <strong>Update order statuses quickly</strong>
              </div>
              <div className="pill">/admin/orders</div>
            </div>
            <div className="admin-actions" style={{ marginTop: 6 }}>
              <a className="btn btn-primary btn-sm" href="/admin/products">
                Manage Products
              </a>
              <a className="btn btn-ghost btn-sm" href="/admin/orders">
                View Orders
              </a>
            </div>
            <p className="admin-muted" style={{ marginTop: 6, fontSize: '0.9rem' }}>
              Note: This admin uses localStorage for now. Later we can connect a real backend/API.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

