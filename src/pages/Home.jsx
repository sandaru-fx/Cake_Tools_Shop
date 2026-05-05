import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaTruck, FaHeadset, FaAward, FaUndo } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-up">
            <h1>Bake Your <span>Masterpiece</span></h1>
            <p>Professional-grade cake baking & decorating tools for home bakers and pastry chefs. From mixing to decorating — we have everything you need.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop Now <FaArrowRight />
              </Link>
              <a href="#categories" className="btn btn-outline-light">
                Explore Categories
              </a>
            </div>
          </div>
          
          <div className="hero-stats fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Premium Products</p>
            </div>
            <div className="stat-item">
              <h3>4+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title fade-up">Bestsellers</h2>
          <p className="section-subtitle fade-up">Our most loved tools by professional bakers.</p>
          
          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-40 fade-up">
            <Link to="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section id="categories" className="home-categories">
        <div className="container">
          <h2 className="section-title fade-up">Shop by Category</h2>
          <p className="section-subtitle fade-up">Everything you need from the first mix to the final decorative flourish.</p>
          
          <div className="bento-grid">
            <Link to="/products?category=decorating" className="bento-card bento-large fade-up">
              <img src="/images/cat_decor.png" alt="Decorating Tools" />
              <div className="bento-overlay">
                <h3>Decorating & Finishing</h3>
                <p>Piping bags, nozzles, turntables, palette knives, and levelers.</p>
                <span className="explore-link">Explore Decorating <FaArrowRight /></span>
              </div>
            </Link>
            
            <Link to="/products?category=baking" className="bento-card bento-small fade-up" style={{ animationDelay: '0.2s' }}>
              <img src="/images/cat_basic.png" alt="Basic Tools" />
              <div className="bento-overlay">
                <h3>Basic Tools</h3>
                <p>Mixing bowls, cups, and pans.</p>
                <span className="explore-link">Shop Basics <FaArrowRight /></span>
              </div>
            </Link>
            
            <Link to="/products?category=pro" className="bento-card bento-small fade-up" style={{ animationDelay: '0.4s' }}>
              <img src="/images/cat_pro.png" alt="Professional Essentials" />
              <div className="bento-overlay">
                <h3>Pro Essentials</h3>
                <p>Mixers and digital scales.</p>
                <span className="explore-link">Shop Pro Gear <FaArrowRight /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title fade-up">Why Choose CakeCraft?</h2>
          <p className="section-subtitle fade-up">The ultimate destination for professional baking tools.</p>
          
          <div className="features-grid">
            <div className="feature-card fade-up">
              <div className="feature-icon"><FaAward /></div>
              <h4>Premium Quality</h4>
              <p>Professional grade materials that last for years.</p>
            </div>
            <div className="feature-card fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon"><FaTruck /></div>
              <h4>Fast Delivery</h4>
              <p>Island-wide delivery within 2-3 working days.</p>
            </div>
            <div className="feature-card fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon"><FaUndo /></div>
              <h4>Easy Returns</h4>
              <p>30-day hassle-free return policy if not satisfied.</p>
            </div>
            <div className="feature-card fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="feature-icon"><FaHeadset /></div>
              <h4>Expert Support</h4>
              <p>Baking experts available 24/7 to guide you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo">
        <div className="container fade-up">
          <h2>Start Your Baking Journey Today</h2>
          <p>Get 20% OFF your first order of complete baking sets.</p>
          <div className="promo-code">FIRSTBAKE20</div>
          <br />
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
