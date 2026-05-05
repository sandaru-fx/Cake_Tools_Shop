import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaCheck, FaSpinner } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdding(true);

    setTimeout(() => {
      addToCart(product, 1);
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
    <Link to={`/product/${product.id}`} className="product-card fade-up">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <img src={product.image} alt={product.name} className="product-img" />
      
      <div className="product-info">
        <div className="stars">
          {renderStars(product.rating)}
          <span>({product.reviews})</span>
        </div>
        
        <h4 className="product-title">{product.name}</h4>
        
        <div className="product-price">
          Rs. {product.price.toLocaleString()}
          {product.originalPrice && <del>Rs. {product.originalPrice.toLocaleString()}</del>}
        </div>
        
        <button 
          className={`add-to-cart ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={adding || added}
        >
          {adding ? (
            <><FaSpinner className="fa-spin" /> Adding...</>
          ) : added ? (
            <><FaCheck /> Added</>
          ) : (
            <><FaShoppingCart /> Add to Cart</>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
