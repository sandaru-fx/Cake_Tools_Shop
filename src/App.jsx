import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import About from './pages/About';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminOrders from './admin/pages/AdminOrders';
import AdminApi from './admin/pages/AdminApi';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="api" element={<AdminApi />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
