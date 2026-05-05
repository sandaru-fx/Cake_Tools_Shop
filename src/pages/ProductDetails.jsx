import { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaShoppingCart, FaCheck, FaSpinner, FaMinus, FaPlus } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const product = products.find(p => p.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-details-page not-found">
        <div className="container text-center">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Find related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc' && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    setAdding(true);

    setTimeout(() => {
      addToCart(product, quantity);
      setAdding(false);
      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }, 800);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} style={{ color: '#E8DFD8' }} />);
    }
    return stars;
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className="product-details-grid">
          {/* Image */}
          <div className="pd-image-section fade-up">
            <div className="main-image-wrapper">
              {product.badge && <span className="pd-badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Info */}
          <div className="pd-info-section fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="pd-category">{product.category.toUpperCase()}</div>
            <h1 className="pd-title">{product.name}</h1>
            
            <div className="pd-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span>({product.reviews} reviews)</span>
            </div>

            <div className="pd-price">
              Rs. {product.price.toLocaleString()}
              {product.originalPrice && <del>Rs. {product.originalPrice.toLocaleString()}</del>}
            </div>

            <p className="pd-description">{product.description}</p>

            <div className="pd-actions">
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange('dec')} disabled={quantity <= 1}>
                  <FaMinus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} disabled={quantity >= 10}>
                  <FaPlus />
                </button>
              </div>

              <button 
                className={`btn btn-primary add-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={adding || added}
              >
                {adding ? (
                  <><FaSpinner className="fa-spin" /> Adding to Cart...</>
                ) : added ? (
                  <><FaCheck /> Added to Cart</>
                ) : (
                  <><FaShoppingCart /> Add to Cart</>
                )}
              </button>
            </div>

            <div className="pd-features">
              <div className="pd-feature">
                <FaCheck className="check-icon" /> Premium Quality Material
              </div>
              <div className="pd-feature">
                <FaCheck className="check-icon" /> Island-wide Delivery
              </div>
              <div className="pd-feature">
                <FaCheck className="check-icon" /> 30-Day Return Policy
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">You Might Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map((p, index) => (
                <div key={p.id} className="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
