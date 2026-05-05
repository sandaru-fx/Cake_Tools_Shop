import { products as seedProducts } from '../data/products';

const LS_KEYS = {
  products: 'cc_admin_products',
  orders: 'cc_admin_orders',
  settings: 'cc_admin_settings',
};

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function ensureSeeded() {
  const hasProducts = !!localStorage.getItem(LS_KEYS.products);
  const hasOrders = !!localStorage.getItem(LS_KEYS.orders);
  const hasSettings = !!localStorage.getItem(LS_KEYS.settings);

  if (!hasProducts) {
    localStorage.setItem(LS_KEYS.products, JSON.stringify(seedProducts));
  }

  if (!hasOrders) {
    const now = Date.now();
    const demo = [
      {
        id: 1001,
        createdAt: now - 1000 * 60 * 60 * 3,
        customer: 'Nimal Perera',
        phone: '+94 77 555 1212',
        status: 'pending',
        items: [
          { productId: 1, name: 'Stainless Mixing Bowl Set', qty: 1, price: 4500 },
          { productId: 3, name: 'Cake Turntable Pro', qty: 1, price: 8900 },
        ],
      },
      {
        id: 1002,
        createdAt: now - 1000 * 60 * 60 * 26,
        customer: 'Sashika Jay',
        phone: '+94 71 123 9900',
        status: 'confirmed',
        items: [{ productId: 2, name: 'Silicone Spatula Set', qty: 2, price: 2200 }],
      },
      {
        id: 1003,
        createdAt: now - 1000 * 60 * 60 * 48,
        customer: 'Ayesha Fernando',
        phone: '+94 76 777 4411',
        status: 'fulfilled',
        items: [{ productId: 5, name: 'Measuring Cup Set', qty: 1, price: 1800 }],
      },
    ];
    localStorage.setItem(LS_KEYS.orders, JSON.stringify(demo));
  }

  if (!hasSettings) {
    const initial = {
      whatsappNumber: '94771234567',
      webhookUrl: '',
      apiBaseUrl: '',
      publicApiKey: '',
    };
    localStorage.setItem(LS_KEYS.settings, JSON.stringify(initial));
  }
}

export function getAdminProducts() {
  ensureSeeded();
  return safeParse(localStorage.getItem(LS_KEYS.products), []);
}

export function saveAdminProducts(next) {
  localStorage.setItem(LS_KEYS.products, JSON.stringify(next));
}

export function upsertAdminProduct(product) {
  const current = getAdminProducts();
  const idx = current.findIndex((p) => p.id === product.id);
  const next =
    idx >= 0
      ? current.map((p) => (p.id === product.id ? { ...p, ...product } : p))
      : [{ ...product }, ...current];
  saveAdminProducts(next);
  return next;
}

export function deleteAdminProduct(id) {
  const current = getAdminProducts();
  const next = current.filter((p) => p.id !== id);
  saveAdminProducts(next);
  return next;
}

export function getAdminOrders() {
  ensureSeeded();
  return safeParse(localStorage.getItem(LS_KEYS.orders), []);
}

export function saveAdminOrders(next) {
  localStorage.setItem(LS_KEYS.orders, JSON.stringify(next));
}

export function updateAdminOrderStatus(id, status) {
  const current = getAdminOrders();
  const next = current.map((o) => (o.id === id ? { ...o, status } : o));
  saveAdminOrders(next);
  return next;
}

export function computeOrderTotal(order) {
  return (order.items || []).reduce((sum, it) => sum + Number(it.price) * Number(it.qty), 0);
}

export function getAdminSettings() {
  ensureSeeded();
  return safeParse(localStorage.getItem(LS_KEYS.settings), {});
}

export function saveAdminSettings(next) {
  localStorage.setItem(LS_KEYS.settings, JSON.stringify(next));
}

