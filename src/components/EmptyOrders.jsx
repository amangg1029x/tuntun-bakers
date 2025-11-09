import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, X, MapPin, Clock, Phone, CreditCard, Download, RotateCcw, MessageCircle, Star, Check, Truck, ChefHat, CheckCircle2, XCircle, PackageCheck, AlertCircle, Calendar, IndianRupee, ChevronDown, ChevronUp, Sparkles, ShoppingBag } from 'lucide-react';

const EmptyOrders = () => {
  return (
    <div className="text-center py-20 animate-fadeIn">
      <div className="mb-6 relative inline-block">
        <div className="text-9xl animate-bounce-slow">📦</div>
        <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">✨</div>
      </div>
      <h3 className="text-3xl font-bold text-amber-950 mb-4">No Orders Yet!</h3>
      <p className="text-lg text-amber-700 mb-8 max-w-md mx-auto">
        Start your delicious journey by ordering some freshly baked goodies from our collection.
      </p>
      <a
        href="/products"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Browse Products</span>
        <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
      </a>
    </div>
  );
};

export default EmptyOrders;