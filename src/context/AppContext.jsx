import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser as useClerkUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
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
  const { user: clerkUser, isLoaded: clerkLoaded } = useClerkUser();
  const { getToken, isSignedIn } = useClerkAuth();
  
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenReady, setTokenReady] = useState(false);

  // Get and store Clerk token
  useEffect(() => {
    const setupToken = async () => {
      if (clerkLoaded && isSignedIn) {
        try {
          // Get token WITHOUT specifying template
          const token = await getToken();
          if (token) {
            localStorage.setItem('clerk-token', token);
            setTokenReady(true);
            console.log('✅ Clerk token set');
          } else {
            console.error('❌ No token received from Clerk');
            setTokenReady(false);
          }
        } catch (error) {
          console.error('❌ Failed to get token:', error);
          setTokenReady(false);
        }
      } else if (clerkLoaded && !isSignedIn) {
        localStorage.removeItem('clerk-token');
        setTokenReady(false);
      }
    };

    setupToken();
  }, [clerkLoaded, isSignedIn, getToken]);

  // Sync user and load data only when token is ready
  useEffect(() => {
    const syncUser = async () => {
      if (!clerkLoaded) {
        console.log('⏳ Waiting for Clerk to load...');
        return;
      }

      if (isSignedIn && clerkUser && tokenReady) {
        console.log('🔄 Syncing user with backend...');
        try {
          // Fetch user from backend (will create if doesn't exist)
          const response = await authAPI.getMe();
          setUser(response.data.data);
          console.log('✅ User synced:', response.data.data.name);
          
          // Load cart and favorites ONLY after user is synced
          console.log('📦 Loading cart and favorites...');
          await Promise.all([
            loadCart(),
            loadFavorites()
          ]);
          console.log('✅ Cart and favorites loaded');
        } catch (error) {
          console.error('❌ User sync failed:', error);
          
          // If 401, try to refresh token once
          if (error.response?.status === 401) {
            console.log('🔄 Attempting token refresh...');
            try {
              const newToken = await getToken();
              if (newToken) {
                localStorage.setItem('clerk-token', newToken);
                console.log('✅ Token refreshed, retrying sync...');
                
                // Retry sync
                const response = await authAPI.getMe();
                setUser(response.data.data);
                await Promise.all([loadCart(), loadFavorites()]);
                console.log('✅ Retry successful');
              }
            } catch (retryError) {
              console.error('❌ Token refresh failed:', retryError);
            }
          }
        }
      } else if (!isSignedIn) {
        // User is not signed in - clear everything
        console.log('👤 User not signed in');
        setUser(null);
        setCart([]);
        setFavorites([]);
      }
      
      setLoading(false);
    };

    syncUser();
  }, [clerkLoaded, isSignedIn, clerkUser, tokenReady, getToken]);

  // ========================================
  // CART FUNCTIONS
  // ========================================
  const loadCart = async () => {
    if (!isSignedIn || !tokenReady) {
      console.log('⏭️ Skipping cart load (not authenticated)');
      return;
    }
    
    try {
      const response = await cartAPI.get();
      setCart(response.data.data.items || []);
    } catch (error) {
      console.error('Load cart failed:', error);
      if (error.response?.status !== 401) {
        console.error('Cart error details:', error.response?.data);
      }
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isSignedIn) {
      throw new Error('Please sign in to add items to cart');
    }

    try {
      const productId = product._id || product.id;
      
      if (!productId) {
        throw new Error('Product ID is missing');
      }

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
    if (!isSignedIn || !tokenReady) {
      console.log('⏭️ Skipping favorites load (not authenticated)');
      return;
    }
    
    try {
      const response = await favoriteAPI.getAll();
      const productIds = response.data.data.map(p => p._id);
      setFavorites(productIds);
    } catch (error) {
      console.error('Load favorites failed:', error);
      if (error.response?.status !== 401) {
        console.error('Favorites error details:', error.response?.data);
      }
    }
  };

  const toggleFavorite = async (productId) => {
    if (!isSignedIn) {
      throw new Error('Please sign in to manage favorites');
    }

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
  // USER FUNCTIONS (Updated for Clerk)
  // ========================================
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
    isAuthenticated: isSignedIn,
    loading,
    clerkUser,
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