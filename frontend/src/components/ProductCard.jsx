import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-badge">{product.category}</div>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p className="product-subtitle">{product.description.substring(0, 75)}...</p>
        </div>
        <div className="product-footer">
          <div>
            <span className="price">₹{product.price.toFixed(2)}</span>
            <span className="rating-pill">⭐ {product.ratings.toFixed(1)} ({product.numReviews})</span>
          </div>
          <Link to={`/product/${product._id}`} className="btn btn-small">View</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
