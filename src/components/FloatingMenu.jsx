import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Search, SlidersHorizontal, X, ChevronDown, Plus, Minus, Sparkles, TrendingUp, Clock, Award } from 'lucide-react';

const FloatingMenu = ({ categories, selectedCategory, onCategorySelect, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryIcons = {
    "All": "🏪",
    "Breads": "🍞",
    "Cakes": "🎂",
    "Pastries": "🥐",
    "Cookies": "🍪",
    "Specials": "⭐"
  };

  return (
    <div className="fixed bottom-8 -right-25 z-50 pointer-events-none">
      {/* Category Menu */}
      <div className={`mb-4 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 -translate-x-30' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl shadow-2xl p-4 min-w-[200px]">
          <div className="text-xs font-bold text-amber-900 mb-3 px-2">Quick Navigate</div>
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => {
                onCategorySelect(category);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-1 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                  : 'hover:bg-amber-50 text-amber-900'
              }`}
            >
              <span className="text-2xl">{categoryIcons[category]}</span>
              <span className="font-medium">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <X className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
        </div>
        
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </div>
        )}
        
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
};

export default FloatingMenu;