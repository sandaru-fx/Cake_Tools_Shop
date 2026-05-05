import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    let result = products;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default / Popular (sort by reviews for demo)
      result.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="container text-center">
          <h1>Shop All Tools</h1>
          <p>Find the perfect equipment for your next baking project.</p>
        </div>
      </div>

      <div className="container products-container">
        {/* Filters & Search */}
        <div className="filters-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="categories-list">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="results-section">
          <div className="results-header">
            <p>Showing <strong>{filteredProducts.length}</strong> products</p>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Sort by: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
