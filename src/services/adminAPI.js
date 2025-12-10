import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const adminAPI = {
  // Dashboard
  getDashboard: async (token) => {
    const response = await axios.get(`${API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Customers
  getCustomers: async (token, { page = 1, limit = 20, search = '' } = {}) => {
    const response = await axios.get(`${API_URL}/admin/customers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit, search }
    });
    return response.data;
  },

  getCustomerDetails: async (token, customerId) => {
    const response = await axios.get(`${API_URL}/admin/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Image Upload
  uploadImage: async (token, imageData) => {
    const response = await axios.post(
      `${API_URL}/admin/upload`,
      { image: imageData },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  deleteImage: async (token, publicId) => {
    const response = await axios.delete(
      `${API_URL}/admin/upload/${publicId.replace(/\//g, '_')}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Products
  createProduct: async (token, productData) => {
    const response = await axios.post(`${API_URL}/admin/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProduct: async (token, productId, productData) => {
    const response = await axios.put(`${API_URL}/admin/products/${productId}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteProduct: async (token, productId) => {
    const response = await axios.delete(`${API_URL}/admin/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProductStock: async (token, productId, stockData) => {
    const response = await axios.put(`${API_URL}/admin/products/${productId}/stock`, stockData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Orders
  getOrders: async (token) => {
    const response = await axios.get(`${API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateOrderStatus: async (token, orderId, status) => {
    const response = await axios.put(
      `${API_URL}/admin/orders/${orderId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Analytics
  getRevenueAnalytics: async (token, period = 'month') => {
    const response = await axios.get(`${API_URL}/admin/analytics/revenue`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { period }
    });
    return response.data;
  }
};

export default adminAPI;