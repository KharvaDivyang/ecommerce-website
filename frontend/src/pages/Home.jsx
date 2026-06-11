import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Unable to load products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error(error);
        setError('Unable to load featured products. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to ShopNest</h1>
        <p>Discover premium products handpicked for every lifestyle, all in one elegant shopping experience.</p>
        <Link to="/shop" className="btn hero-btn">Shop Now</Link>
      </div>
      <div className="home-intro">
        <div className="home-intro-card">
          <h3>Stylish Collections</h3>
          <p>Browse trending items from electronics, fashion, home decor and more.</p>
        </div>
        <div className="home-intro-card">
          <h3>Fast Checkout</h3>
          <p>Secure payment, reliable delivery and instant cart updates for every order.</p>
        </div>
        <div className="home-intro-card">
          <h3>Trusted Store</h3>
          <p>Start shopping safely with our verified admin-backed product catalog.</p>
        </div>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div className="loading-placeholder">Loading featured products...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : products.length === 0 ? (
        <div className="error-message">No featured products are available yet.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
