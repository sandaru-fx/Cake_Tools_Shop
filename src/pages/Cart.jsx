import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaMinus, FaPlus, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { getAdminSettings } from '../admin/adminStore';
import './Cart.css';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [whatsAppNumber, setWhatsAppNumber] = useState('94771234567');

  useEffect(() => {
    try {
      const settings = getAdminSettings();
      if (settings?.whatsappNumber) setWhatsAppNumber(String(settings.whatsappNumber));
    } catch {
      // ignore (localStorage might be blocked)
    }
  }, []);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `*New Order from CakeCraft*\n\n`;
    message += `*Items:*\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()} = Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n`;
    message += `*Delivery:* To be calculated\n`;
    message += `\nPlease confirm my order and let me know the delivery charges.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="container text-center fade-up">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any baking tools yet.</p>
          <Link to="/products" className="btn btn-primary mt-40">
            Start Shopping <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title fade-up">Your Shopping Cart</h1>
        
        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-section fade-up">
            <div className="cart-header">
              <div className="col-product">Product</div>
              <div className="col-price">Price</div>
              <div className="col-qty">Quantity</div>
              <div className="col-total">Total</div>
              <div className="col-action"></div>
            </div>
            
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="col-product">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4><Link to={`/product/${item.id}`}>{item.name}</Link></h4>
                      <span className="cart-item-category">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="col-price">
                    Rs. {item.price.toLocaleString()}
                  </div>
                  
                  <div className="col-qty">
                    <div className="cart-qty-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-total">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                  
                  <div className="col-action">
                    <button 
                      className="remove-btn" 
                      onClick={() => removeFromCart(item.id)}
                      title="Remove Item"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-section fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery</span>
                <span className="calculated-text">Calculated on WhatsApp</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              
              <p className="order-note">
                Payments are not processed online. Clicking the button below will send your order details via WhatsApp to complete the purchase.
              </p>

              <button 
                className="btn btn-primary whatsapp-btn"
                onClick={handleWhatsAppOrder}
              >
                <FaWhatsapp className="wa-icon" /> Place Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
