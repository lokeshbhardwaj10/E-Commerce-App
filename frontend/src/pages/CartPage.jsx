import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../components/CartItem";
import "./CartPage.css";

export const CartPage = () => {
  const { cartItems, clearCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const shippingCost = cartTotal > 500 ? 0 : 50;
  const totalWithShipping = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Add some items to get started!</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>

          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span className="summary-value">₹{cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>
              Shipping
              {cartTotal > 500 && <span className="free-shipping"> (Free)</span>}
            </span>
            <span className="summary-value">₹{shippingCost.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span className="summary-value">₹{totalWithShipping.toFixed(2)}</span>
          </div>

          <div className="order-summary-footer">
            <Link to="/" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
            <button
              onClick={() => navigate("/checkout")}
              className="proceed-checkout-btn"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
