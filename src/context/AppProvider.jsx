import React, { createContext, useContext, useState, useEffect } from 'react';

// ========================================
// 1. CREATE CONTEXTS
// ========================================
const CartContext = createContext();
const FavoritesContext = createContext();
const UserContext = createContext();

// ========================================
// 2. CUSTOM HOOKS
// ========================================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within AppProvider');
  }
  return context;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within AppProvider');
  }
  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within AppProvider');
  }
  return context;
};

// Mock user data (will come from backend after login)
const mockUserData = {
  id: 1,
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: null,
  joinedDate: '2023-06-15',
  addresses: [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      address: "123 Bakery Street",
      landmark: "Near City Mall",
      city: "Ghaziabad",
      pincode: "201001",
      isDefault: true
    },
    {
      id: 2,
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      address: "456 Park Avenue",
      landmark: "Behind Metro Station",
      city: "Ghaziabad",
      pincode: "201002",
      isDefault: false
    }
  ],
  savedPaymentMethods: [
    {
      id: 1,
      type: 'upi',
      details: 'rahul@paytm',
      isDefault: true
    }
  ],
  preferences: {
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    promotionalEmails: false
  },
  stats: {
    totalOrders: 24,
    totalSpent: 12450,
    favoriteItems: 8,
    reviewsGiven: 12
  }
};

// ========================================
// 3. APP PROVIDER COMPONENT
// ========================================
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tuntun-cart');
    const savedFavorites = localStorage.getItem('tuntun-favorites');
    const savedUser = localStorage.getItem('tuntun-user');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('tuntun-cart', JSON.stringify(cart));
  }, [cart]);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('tuntun-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('tuntun-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tuntun-user');
    }
  }, [user]);

  // ========================================
  // CART FUNCTIONS
  // ========================================
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    console.log(`Added ${quantity}x ${product.name} to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // ========================================
  // FAVORITES FUNCTIONS
  // ========================================
  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const addToFavorites = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev : [...prev, productId]
    );
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  // ========================================
  // USER FUNCTIONS
  // ========================================
  const login = (userData) => {
    // In real app, this would call API
    setUser(userData || mockUserData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearCart();
    localStorage.removeItem('tuntun-user');
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const updateUserPreferences = (preferences) => {
    setUser(prev => ({ ...prev, preferences: { ...prev.preferences, ...preferences } }));
  };

  const addAddress = (address) => {
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, { ...address, id: Date.now() }]
    }));
  };

  const updateAddress = (addressId, updatedAddress) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => 
        addr.id === addressId ? { ...addr, ...updatedAddress } : addr
      )
    }));
  };

  const deleteAddress = (addressId) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== addressId)
    }));
  };

  const addPaymentMethod = (method) => {
    setUser(prev => ({
      ...prev,
      savedPaymentMethods: [...prev.savedPaymentMethods, { ...method, id: Date.now() }]
    }));
  };

  const deletePaymentMethod = (methodId) => {
    setUser(prev => ({
      ...prev,
      savedPaymentMethods: prev.savedPaymentMethods.filter(m => m.id !== methodId)
    }));
  };

  // ========================================
  // CONTEXT VALUES
  // ========================================
  const cartValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart
  };

  const favoritesValue = {
    favorites,
    toggleFavorite,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites
  };

  const userValue = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    updateUserPreferences,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    deletePaymentMethod
  };

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