import { Link } from 'react-router-dom';
import { FaBirthdayCake, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="logo">
              <FaBirthdayCake /> Cake<span>Craft</span>
            </Link>
            <p>Providing premium, professional-grade baking tools to home bakers and professional pastry chefs alike.</p>
            <div className="social-links">
              <a href="#" className="social-btn"><FaFacebookF /></a>
              <a href="#" className="social-btn"><FaInstagram /></a>
              <a href="#" className="social-btn"><FaTiktok /></a>
              <a href="#" className="social-btn"><FaWhatsapp /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Refunds</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li><FaMapMarkerAlt /> No 123, Bakery Lane, Colombo 05</li>
              <li><FaPhone /> +94 77 123 4567</li>
              <li><FaEnvelope /> hello@cakecraft.lk</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 CakeCraft Tools. Designed for the finest bakers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
