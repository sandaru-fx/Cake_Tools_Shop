import { FaHeart, FaAward, FaUsers } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content fade-up">
            <h1>Our <span>Story</span></h1>
            <p>Passionate about baking, dedicated to quality. Discover how CakeCraft became the go-to destination for bakers everywhere.</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-text fade-up">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Crafting Perfection</h2>
              <h3 className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>Since 2018</h3>
              <p>
                What started as a small, home-based baking supply operation has blossomed into the country's premier destination for high-quality cake tools. We realized early on that the difference between a good cake and a masterpiece often lies in the tools you use.
              </p>
              <p>
                Our founders, both professional pastry chefs, grew frustrated with the lack of durable, professional-grade equipment available to home bakers. That's why CakeCraft was born — to bridge the gap and bring professional quality to every kitchen.
              </p>
            </div>
            <div className="story-image fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="image-frame">
                <img src="/images/cat_decor.png" alt="Cake decorating in progress" />
                <div className="frame-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card fade-up">
              <div className="mv-icon"><FaHeart /></div>
              <h3>Our Mission</h3>
              <p>To empower bakers of all skill levels by providing them with the highest quality tools, inspiring creativity, and fostering a community of passionate cake artists.</p>
            </div>
            <div className="mv-card fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="mv-icon"><FaAward /></div>
              <h3>Our Vision</h3>
              <p>To be the most trusted and recognized name in baking supplies globally, known for our unwavering commitment to quality, innovation, and customer success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title fade-up">What We Stand For</h2>
          
          <div className="values-grid">
            <div className="value-item fade-up">
              <div className="value-number">01</div>
              <h4>Uncompromising Quality</h4>
              <p>Every product in our catalog goes through rigorous testing by professional chefs before it reaches your kitchen.</p>
            </div>
            <div className="value-item fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="value-number">02</div>
              <h4>Customer First</h4>
              <p>Your baking success is our success. Our dedicated support team is always ready to guide you.</p>
            </div>
            <div className="value-item fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="value-number">03</div>
              <h4>Community Driven</h4>
              <p>We believe in sharing knowledge, recipes, and techniques to help everyone grow in their baking journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
