import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Loader } from "../components/Loader";
import * as productApi from "../api/productApi";
import toast from "react-hot-toast";
import "./ProductPage.css";

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProductById(id);
      setProduct(response.product);
    } catch (error) {
      toast.error("Failed to fetch product");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error("Insufficient stock");
      return;
    }
    addToCart(product, quantity);
    toast.success("Added to cart!");
    setQuantity(1);
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-page">
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back to Home
      </button>

      <div className="product-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-main-image" />
          {isOutOfStock && <div className="out-of-stock-banner">Out of Stock</div>}
        </div>

        <div className="product-details-section">
          <h1>{product.name}</h1>

          <div className="product-meta">
            <span className="rating">⭐ {product.rating}</span>
            <span className="reviews">({product.numReviews} reviews)</span>
            <span className="stock-status">
              Stock: <strong>{product.stock} units</strong>
            </span>
          </div>

          <div className="product-price-section">
            <h2 className="product-price">₹{product.price}</h2>
          </div>

          <div className="product-description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-info-section">
            <div className="info-item">
              <span className="label">Category:</span>
              <span className="value">{product.category}</span>
            </div>
          </div>

          {!isOutOfStock && (
            <div className="purchase-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))
                    }
                    className="qty-input"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <button onClick={handleAddToCart} className="add-to-cart-main-btn">
                🛒 Add to Cart
              </button>
            </div>
          )}

          {isOutOfStock && (
            <div className="out-of-stock-message">
              <p>This product is currently out of stock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
