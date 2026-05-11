import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Loader } from "../../components/Loader";
import * as productApi from "../../api/productApi";
import * as orderApi from "../../api/orderApi";
import toast from "react-hot-toast";
import "./AdminPages.css";

const AdminDashboardContent = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productApi.getAllProducts({ limit: 1000 }),
        orderApi.getAllOrders(),
      ]);

      setStats({
        totalProducts: productsRes.totalCount || 0,
        totalOrders: ordersRes.count || 0,
        recentOrders: (ordersRes.orders || []).slice(0, 10),
      });
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
        </div>
      </div>

      <div className="recent-orders-section">
        <h2>Recent Orders</h2>
        {stats.recentOrders.length > 0 ? (
          <div className="orders-table">
            <div className="table-header">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Date</div>
            </div>
            {stats.recentOrders.map((order) => (
              <div key={order._id} className="table-row">
                <div>{order._id.substring(0, 8)}...</div>
                <div>{order.userId.name}</div>
                <div>₹{order.totalAmount}</div>
                <div>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
                <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent orders</p>
        )}
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
};
