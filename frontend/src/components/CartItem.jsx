import React from "react";
import { CartContext } from "../context/CartContext";
import "./CartItem.css";

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = React.useContext(CartContext);
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{product.name}</h3>
        <p className="cart-item-price">₹{product.price}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={() => updateQuantity(product._id, quantity - 1)}
          className="qty-btn"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            updateQuantity(product._id, Math.max(1, parseInt(e.target.value) || 1))
          }
          className="qty-input"
        />
        <button
          onClick={() => updateQuantity(product._id, quantity + 1)}
          className="qty-btn"
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <p>₹{(product.price * quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => removeFromCart(product._id)}
        className="remove-btn"
      >
        🗑️ Remove
      </button>
    </div>
  );
};
