import axios from 'axios';

export const register = (payload) => {
  return api.post('/auth/register', payload);
};


// Base API URL
const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('tuntun-user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// AUTH APIs
// ========================================
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// ========================================
// USER APIs
// ========================================
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  
  // Addresses
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (data) => api.post('/user/addresses', data),
  updateAddress: (addressId, data) => api.put(`/user/addresses/${addressId}`, data),
  deleteAddress: (addressId) => api.delete(`/user/addresses/${addressId}`),
  
  // Payment Methods
  getPaymentMethods: () => api.get('/user/payment-methods'),
  addPaymentMethod: (data) => api.post('/user/payment-methods', data),
  deletePaymentMethod: (methodId) => api.delete(`/user/payment-methods/${methodId}`),
  
  // Preferences
  updatePreferences: (data) => api.put('/user/preferences', data),
  changePassword: (data) => api.put('/user/change-password', data),
};

// ========================================
// PRODUCT APIs
// ========================================
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  search: (query) => api.get(`/products/search?q=${query}`),
  create: (data) => api.post('/products', data), // Admin only
  update: (id, data) => api.put(`/products/${id}`, data), // Admin only
  delete: (id) => api.delete(`/products/${id}`), // Admin only
};

// ========================================
// CART APIs
// ========================================
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId, quantity) => api.post('/cart/add', { productId, quantity }),
  update: (itemId, quantity) => api.put(`/cart/update/${itemId}`, { quantity }),
  remove: (itemId) => api.delete(`/cart/remove/${itemId}`),
  clear: () => api.delete('/cart/clear'),
};

// ========================================
// ORDER APIs
// ========================================
export const orderAPI = {
  create: (data) => api.post('/orders/create', data),
  getAll: () => api.get('/orders'),
  getOne: (id) => api.get(`/orders/${id}`),
  cancel: (id, reason) => api.put(`/orders/${id}/cancel`, { reason }),
  addReview: (id, data) => api.post(`/orders/${id}/review`, data),
  
  // Admin only
  getAllOrders: () => api.get('/orders/admin/all'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// ========================================
// FAVORITES APIs
// ========================================
export const favoriteAPI = {
  getAll: () => api.get('/favorites'),
  add: (productId) => api.post(`/favorites/add/${productId}`),
  remove: (productId) => api.delete(`/favorites/remove/${productId}`),
  toggle: (productId) => api.post(`/favorites/toggle/${productId}`),
  clear: () => api.delete('/favorites/clear'),
};

export default api;