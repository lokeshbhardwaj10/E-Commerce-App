import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Loader } from "../../components/Loader";
import * as orderApi from "../../api/orderApi";
import toast from "react-hot-toast";
import "./AdminPages.css";

const ManageOrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getAllOrders();
      setOrders(response.orders);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus, undefined);
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handlePaymentStatusChange = async (orderId, currentStatus) => {
    const newStatus = currentStatus === "paid" ? "pending" : "paid";
    try {
      await orderApi.updateOrderStatus(orderId, undefined, newStatus);
      toast.success("Payment status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="manage-orders">
      <h1>Manage Orders</h1>

      {orders.length > 0 ? (
        <div className="orders-list-admin">
          {orders.map((order) => (
            <div key={order._id} className="order-card-admin">
              <div className="order-header-admin">
                <div className="order-basics">
                  <h3>Order ID: {order._id.substring(0, 12)}...</h3>
                  <p>Customer: {order.userId.name} ({order.userId.email})</p>
                  <p>Amount: ₹{order.totalAmount}</p>
                </div>

                <div className="order-controls">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <button
                    onClick={() =>
                      handlePaymentStatusChange(order._id, order.paymentStatus)
                    }
                    className={`payment-btn ${order.paymentStatus}`}
                  >
                    {order.paymentStatus === "paid" ? "Paid ✓" : "Mark Paid"}
                  </button>

                  <button
                    onClick={() =>
                      setExpandedOrderId(
                        expandedOrderId === order._id ? null : order._id
                      )
                    }
                    className="expand-btn"
                  >
                    {expandedOrderId === order._id ? "▲" : "▼"}
                  </button>
                </div>
              </div>

              {expandedOrderId === order._id && (
                <div className="order-details-admin">
                  <div className="section">
                    <h4>Products</h4>
                    {order.products.map((product, idx) => (
                      <div key={idx} className="order-product-admin">
                        <span>{product.productId.name}</span>
                        <span>Qty: {product.quantity}</span>
                        <span>₹{product.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="section">
                    <h4>Shipping Address</h4>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                    <p>Pincode: {order.shippingAddress.pincode}</p>
                  </div>

                  <div className="section">
                    <h4>Order Date</h4>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export const ManageOrders = () => {
  return (
    <ProtectedRoute requireAdmin>
      <ManageOrdersContent />
    </ProtectedRoute>
  );
};
