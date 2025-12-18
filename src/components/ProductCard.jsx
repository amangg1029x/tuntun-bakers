import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Search, SlidersHorizontal, X, ChevronDown, Plus, Minus, Sparkles, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Check if product is out of stock
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;
  const isLowStock = product.inStock && product.stockQuantity > 0 && product.stockQuantity <= 5;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    
    setIsAdding(true);
    try {
      console.log('Product:', product); // Debug log
      await onAddToCart(product, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Add to cart error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to add to cart';
      alert(`❌ ${errorMsg}`);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await onToggleFavorite(product._id);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
        isOutOfStock ? 'opacity-75' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm z-30 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl transform rotate-[-5deg]">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <span className="text-xl font-bold">Out of Stock</span>
            </div>
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.isNew && !isOutOfStock && (
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3" />
            New
          </span>
        )}
        {product.isTrending && !isOutOfStock && (
          <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            🔥 Trending
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Only {product.stockQuantity} left!
          </span>
        )}
      </div>

      {/* Favorite Button - Fixed for mobile */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 z-40 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 touch-manipulation"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-amber-600'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 aspect-square flex items-center justify-center overflow-hidden">
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered && !isOutOfStock ? 'scale-110' : 'scale-100'
            } ${
              isOutOfStock ? 'grayscale' : ''
            }`}
          />
        ) : (
          <div className={`text-8xl transition-all duration-500 ${
            isHovered && !isOutOfStock ? 'scale-125 rotate-12' : 'scale-100'
          } ${
            isOutOfStock ? 'grayscale' : ''
          }`}>
            {product.emoji}
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent transition-opacity duration-300 ${
          isHovered && !isOutOfStock ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span>⏱️ {product.prepTime}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.tags && product.tags.map((tag, idx) => (
                <span key={idx} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full flex-shrink-0 ml-2">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-amber-900">{product.rating}</span>
          </div>
        </div>

        <p className="text-amber-700 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="text-xs text-amber-600 mb-4">⭐ {product.reviews} reviews</div>

        {/* Stock Status */}
        {!isOutOfStock && (
          <div className="text-xs mb-3">
            {isLowStock ? (
              <span className="text-orange-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Hurry! Only {product.stockQuantity} left in stock
              </span>
            ) : (
              <span className="text-green-600 font-semibold">✓ In Stock ({product.stockQuantity} available)</span>
            )}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-900">
            ₹{product.price}
          </div>
          
          {isOutOfStock ? (
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2 opacity-60"
            >
              <span className="text-sm font-medium">Unavailable</span>
            </button>
          ) : isHovered ? (
            <div className="flex items-center gap-2 animate-fadeIn">
              <div className="flex items-center bg-amber-100 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-amber-200 rounded-l-lg transition-colors"
                  disabled={isAdding}
                >
                  <Minus className="w-4 h-4 text-amber-900" />
                </button>
                <span className="px-3 text-sm font-bold text-amber-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="p-1 hover:bg-amber-200 rounded-r-lg transition-colors"
                  disabled={isAdding}
                >
                  <Plus className="w-4 h-4 text-amber-900" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-2 rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;