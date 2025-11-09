import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck, Package, Clock, Gift, Tag, X } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="text-center py-20 animate-fadeIn">
      <div className="mb-8 relative inline-block">
        <div className="text-9xl animate-bounce-slow">🛒</div>
        <div className="absolute -top-6 -right-6 text-5xl animate-spin-slow">💫</div>
        <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">🍞</div>
      </div>
      <h2 className="text-4xl font-bold text-amber-950 mb-4">Your Cart is Empty!</h2>
      <p className="text-lg text-amber-700 mb-8 max-w-md mx-auto">
        Looks like you haven't added any delicious treats yet. Let's fix that!
      </p>
      <a
        href="/products"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <ShoppingBag className="w-6 h-6" />
        <span>Browse Products</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </a>

      {/* Decorative Elements */}
      <div className="mt-12 flex justify-center gap-8 text-6xl opacity-50">
        <span className="animate-float">🥐</span>
        <span className="animate-float animation-delay-1000">🎂</span>
        <span className="animate-float animation-delay-2000">🍪</span>
      </div>
    </div>
  );
};

export default EmptyCart;