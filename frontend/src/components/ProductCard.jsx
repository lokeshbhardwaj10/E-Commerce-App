import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

export const ProductCard = ({ product, onAddToCart }) => {
  const { stock, rating, numReviews } = product;
  const isOutOfStock = stock === 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">
          {product.description.substring(0, 60)}...
        </p>

        <div className="product-rating">
          <span className="rating-stars">⭐ {rating}</span>
          <span className="num-reviews">({numReviews} reviews)</span>
        </div>

        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <button
            onClick={() => onAddToCart(product, 1)}
            disabled={isOutOfStock}
            className={`add-to-cart-btn ${isOutOfStock ? "disabled" : ""}`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
