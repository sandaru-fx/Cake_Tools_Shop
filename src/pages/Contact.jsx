import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const WHATSAPP_NUMBER = "94771234567";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let whatsappMessage = `*New Inquiry from CakeCraft Contact Form*\n\n`;
    whatsappMessage += `*Name:* ${formData.name}\n`;
    whatsappMessage += `*Phone:* ${formData.phone}\n`;
    whatsappMessage += `*Message:* ${formData.message}\n`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    // Clear form
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header text-center">
        <div className="container fade-up">
          <h1>Contact Us</h1>
          <p>Have a question or need advice on what to buy? We're here to help.</p>
        </div>
      </div>

      <div className="container contact-container">
        <div className="contact-grid">
          
          {/* Contact Info */}
          <div className="contact-info-section fade-up">
            <h2>Get in Touch</h2>
            <p className="info-desc">
              Whether you're looking for a specific tool or need help with your order, 
              our team of baking experts is ready to assist you.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon"><FaPhone /></div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>+94 77 123 4567</p>
                  <p>+94 11 234 5678</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><FaEnvelope /></div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>hello@cakecraft.lk</p>
                  <p>support@cakecraft.lk</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div className="info-content">
                  <h4>Address</h4>
                  <p>No 123, Bakery Lane,</p>
                  <p>Colombo 05, Sri Lanka.</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><FaClock /></div>
                <div className="info-content">
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="direct-whatsapp mt-40">
              <h3>Need an immediate response?</h3>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="btn btn-primary whatsapp-btn">
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="form-card">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and it will be sent directly to our WhatsApp support team.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Jane Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="E.g. 077 123 4567"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary submit-btn">
                  <FaPaperPlane /> Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
