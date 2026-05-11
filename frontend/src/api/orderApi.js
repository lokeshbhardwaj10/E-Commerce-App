import axiosInstance from "./axios";

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await axiosInstance.get("/orders/myorders");
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

export const updateOrderStatus = async (orderId, status, paymentStatus) => {
  const response = await axiosInstance.put(`/orders/${orderId}/status`, {
    status,
    paymentStatus,
  });
  return response.data;
};
