import axios from 'axios';

// Base API URL with production fallback
const API_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://tuntun-bakers-backend.vercel.app/api');

console.log('🌐 API URL:', API_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add Clerk token to requests automatically
api.interceptors.request.use(
  async (config) => {
    // Get Clerk token from localStorage
    const token = localStorage.getItem('clerk-token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors - simplified without retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't redirect if we're on public pages or auth pages
    const publicPaths = ['/', '/products', '/about', '/contact', '/sign-in', '/sign-up'];
    const currentPath = window.location.pathname;
    const isPublicPage = publicPaths.some(path => currentPath === path || currentPath.startsWith(path));

    if (error.response?.status === 401 && !isPublicPage) {
      console.error('❌ Unauthorized request - redirecting to sign in');
      localStorage.removeItem('clerk-token');
      
      // Only redirect if not already on sign-in page
      if (!currentPath.includes('/sign-in')) {
        window.location.href = '/sign-in';
      }
    }

    return Promise.reject(error);
  }
);

// ========================================
// AUTH APIs
// ========================================
export const authAPI = {
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// ========================================
// USER APIs
// ========================================
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  getUserStats: () => api.get('/user/stats'),
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

// ========================================
// PAYMENT APIs (Razorpay)
// ========================================
export const paymentAPI = {
  createOrder: (data) => api.post('/payment/create-order', data),
  verify: (data) => api.post('/payment/verify', data),
  recordFailure: (data) => api.post('/payment/failure', data),
  getDetails: (paymentId) => api.get(`/payment/${paymentId}`),
  refund: (data) => api.post('/payment/refund', data), // Admin only
};

export default api;