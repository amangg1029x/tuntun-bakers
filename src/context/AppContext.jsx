import React, { createContext, useContext, useState, useEffect } from 'react';

// ========================================
// 1. CREATE CONTEXTS
// ========================================
const CartContext = createContext();
const FavoritesContext = createContext();

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

// ========================================
// 3. APP PROVIDER COMPONENT
// ========================================
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tuntun-cart');
    const savedFavorites = localStorage.getItem('tuntun-favorites');
    
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
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('tuntun-cart', JSON.stringify(cart));
  }, [cart]);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('tuntun-favorites', JSON.stringify(favorites));
  }, [favorites]);

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
    
    // Show toast notification (optional)
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

  return (
    <CartContext.Provider value={cartValue}>
      <FavoritesContext.Provider value={favoritesValue}>
        {children}
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
};

export default AppProvider;