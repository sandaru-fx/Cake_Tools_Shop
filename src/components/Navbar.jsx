import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBirthdayCake, FaShoppingCart, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const navClass = `navbar ${scrolled ? 'scrolled' : ''} ${isHome && !scrolled ? 'transparent-home' : ''}`;

  return (
    <nav className={navClass}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <FaBirthdayCake />
          Cake<span>Craft</span>
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <button 
            className="icon-btn theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button 
            className="hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
