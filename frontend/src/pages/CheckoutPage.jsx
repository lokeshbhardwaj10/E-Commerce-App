import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import * as orderApi from "../api/orderApi";
import toast from "react-hot-toast";
import "./CheckoutPage.css";

const CheckoutPageContent = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h1>Cart is Empty</h1>
        <p>Please add items to your cart before checking out</p>
        <button onClick={() => navigate("/")} className="back-to-home-btn">
          Back to Home
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: formData,
      };

      const response = await orderApi.createOrder(orderData);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = cartTotal > 500 ? 0 : 50;
  const totalWithShipping = cartTotal + shippingCost;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form-section">
          <h2>Shipping Address</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={user?.name} disabled />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user?.email} disabled />
            </div>

            <div className="form-group">
              <label>Street Address *</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="place-order-btn">
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <h2>Order Summary</h2>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="order-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="item-details">
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalWithShipping.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutPage = () => {
  return (
    <ProtectedRoute>
      <CheckoutPageContent />
    </ProtectedRoute>
  );
};
