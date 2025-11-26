import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, cartAPI, favoriteAPI, userAPI } from '../services/api';

const CartContext = createContext();
const FavoritesContext = createContext();
const UserContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within AppProvider');
  return context;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within AppProvider');
  return context;
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data.data);
          setIsAuthenticated(true);
          
          // Load cart and favorites
          await loadCart();
          await loadFavorites();
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // ========================================
  // CART FUNCTIONS
  // ========================================
  const loadCart = async () => {
    try {
      const response = await cartAPI.get();
      setCart(response.data.data.items || []);
    } catch (error) {
      console.error('Load cart failed:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      // Extract product ID - handle both MongoDB object and plain ID
      const productId = product._id || product.id;
      
      if (!productId) {
        throw new Error('Product ID is missing');
      }

      console.log('Adding to cart:', { productId, quantity, product }); // Debug log
      
      const response = await cartAPI.add(productId, quantity);
      setCart(response.data.data.items || []);
      return response.data;
    } catch (error) {
      console.error('Add to cart failed:', error.response?.data || error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartAPI.remove(itemId);
      setCart(response.data.data.items || []);
    } catch (error) {
      console.error('Remove from cart failed:', error);
      throw error;
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    try {
      const response = await cartAPI.update(itemId, quantity);
      setCart(response.data.data.items || []);
    } catch (error) {
      console.error('Update cart failed:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setCart([]);
    } catch (error) {
      console.error('Clear cart failed:', error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // ========================================
  // FAVORITES FUNCTIONS
  // ========================================
  const loadFavorites = async () => {
    try {
      const response = await favoriteAPI.getAll();
      const productIds = response.data.data.map(p => p._id);
      setFavorites(productIds);
    } catch (error) {
      console.error('Load favorites failed:', error);
    }
  };

  const toggleFavorite = async (productId) => {
    try {
      const response = await favoriteAPI.toggle(productId);
      const productIds = response.data.data.map(p => p._id);
      setFavorites(productIds);
    } catch (error) {
      console.error('Toggle favorite failed:', error);
      throw error;
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  // ========================================
  // USER FUNCTIONS
  // ========================================
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      
      // Load cart and favorites after login
      await loadCart();
      await loadFavorites();
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      
      return response.data;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      setCart([]);
      setFavorites([]);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await userAPI.updateProfile(updatedData);
      setUser(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  };

  const updateUserPreferences = async (preferences) => {
    try {
      const response = await userAPI.updatePreferences(preferences);
      setUser(prev => ({
        ...prev,
        preferences: response.data.data
      }));
    } catch (error) {
      console.error('Update preferences failed:', error);
      throw error;
    }
  };

  const addAddress = async (address) => {
    try {
      const response = await userAPI.addAddress(address);
      setUser(prev => ({
        ...prev,
        addresses: response.data.data
      }));
    } catch (error) {
      console.error('Add address failed:', error);
      throw error;
    }
  };

  const updateAddress = async (addressId, updatedAddress) => {
    try {
      const response = await userAPI.updateAddress(addressId, updatedAddress);
      setUser(prev => ({
        ...prev,
        addresses: response.data.data
      }));
    } catch (error) {
      console.error('Update address failed:', error);
      throw error;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await userAPI.deleteAddress(addressId);
      setUser(prev => ({
        ...prev,
        addresses: response.data.data
      }));
    } catch (error) {
      console.error('Delete address failed:', error);
      throw error;
    }
  };

  const deletePaymentMethod = async (methodId) => {
    try {
      const response = await userAPI.deletePaymentMethod(methodId);
      setUser(prev => ({
        ...prev,
        savedPaymentMethods: response.data.data
      }));
    } catch (error) {
      console.error('Delete payment method failed:', error);
      throw error;
    }
  };

  const cartValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    loadCart
  };

  const favoritesValue = {
    favorites,
    toggleFavorite,
    isFavorite,
    loadFavorites
  };

  const userValue = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    updateUserPreferences,
    addAddress,
    updateAddress,
    deleteAddress,
    deletePaymentMethod
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-900 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <CartContext.Provider value={cartValue}>
      <FavoritesContext.Provider value={favoritesValue}>
        <UserContext.Provider value={userValue}>
          {children}
        </UserContext.Provider>
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
};

export default AppProvider;