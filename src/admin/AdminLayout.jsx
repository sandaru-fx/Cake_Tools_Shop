import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaChartPie, FaBoxOpen, FaReceipt, FaBirthdayCake, FaPlug, FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import './admin.css';

export default function AdminLayout() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand">
            <FaBirthdayCake />
            Cake<span>Craft</span> Admin
          </div>
          <nav className="admin-nav" aria-label="Admin navigation">
            <NavLink end to="/admin" className="admin-link">
              <FaChartPie /> Dashboard
            </NavLink>
            <NavLink to="/admin/products" className="admin-link">
              <FaBoxOpen /> Products
            </NavLink>
            <NavLink to="/admin/orders" className="admin-link">
              <FaReceipt /> Orders
            </NavLink>
            <NavLink to="/admin/api" className="admin-link">
              <FaPlug /> API / Integrations
            </NavLink>
          </nav>
        </div>

        <div className="admin-sidebar-bottom">
          <button className="admin-theme-btn" onClick={toggleTheme} type="button">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}

