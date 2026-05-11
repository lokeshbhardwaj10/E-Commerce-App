import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Loader } from "../components/Loader";
import * as orderApi from "../api/orderApi";
import toast from "react-hot-toast";
import "./ProfilePage.css";

const ProfilePageContent = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getMyOrders();
      setOrders(response.orders);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-pending";
      case "processing":
        return "badge-processing";
      case "shipped":
        return "badge-shipped";
      case "delivered":
        return "badge-delivered";
      default:
        return "";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="user-info">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user?.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Account Type:</span>
            <span className={`value role-${user?.role}`}>{user?.role.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="orders-section">
        <h2>My Orders</h2>

        {loading ? (
          <Loader />
        ) : orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div
                  className="order-header"
                  onClick={() =>
                    setExpandedOrderId(
                      expandedOrderId === order._id ? null : order._id
                    )
                  }
                >
                  <div className="order-info">
                    <p className="order-id">Order ID: {order._id.substring(0, 12)}...</p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="order-amount">
                    <p className="amount">₹{order.totalAmount}</p>
                  </div>

                  <div className="order-status">
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  <button className="expand-btn">
                    {expandedOrderId === order._id ? "▲" : "▼"}
                  </button>
                </div>

                {expandedOrderId === order._id && (
                  <div className="order-details">
                    <div className="details-section">
                      <h4>Items</h4>
                      {order.products.map((product, idx) => (
                        <div key={idx} className="order-product">
                          {product.productId.image && (
                            <img
                              src={product.productId.image}
                              alt={product.productId.name}
                              className="product-image"
                            />
                          )}
                          <div className="product-info">
                            <p className="product-name">{product.productId.name}</p>
                            <p className="product-qty">Qty: {product.quantity}</p>
                          </div>
                          <p className="product-price">₹{product.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="details-section">
                      <h4>Shipping Address</h4>
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                      <p>Pincode: {order.shippingAddress.pincode}</p>
                    </div>

                    <div className="details-section">
                      <h4>Order Status</h4>
                      <p>Status: <strong>{order.status}</strong></p>
                      <p>Payment: <strong>{order.paymentStatus}</strong></p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">You haven't placed any orders yet</p>
        )}
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
};
