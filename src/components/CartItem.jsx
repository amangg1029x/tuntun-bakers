import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck, Package, Clock, Gift, Tag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item._id);
    } catch (error) {
      setIsRemoving(false);
      alert('Failed to remove item. Please try again.');
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    try {
      await onUpdateQuantity(item._id, newQuantity);
    } catch (error) {
      setQuantity(item.quantity); // Revert on error
      alert('Failed to update quantity. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle product data from populated MongoDB document
  const product = item.product || {};
  const productName = product.name || 'Product';
  const productDescription = product.description || '';
  const productEmoji = product.emoji || '🍞';
  const productPrice = product.price || 0;

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 ${
        isRemoving ? 'opacity-0 translate-x-full scale-95' : 'opacity-100 translate-x-0 scale-100'
      } ${isUpdating ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-6">
        {/* Product Image */}
        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <span className="text-5xl animate-bounce-slow">{productEmoji}</span>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-amber-950 mb-1">{productName}</h3>
              <p className="text-sm text-amber-700 line-clamp-1">{productDescription}</p>
            </div>
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 group disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center bg-amber-100 rounded-xl overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isUpdating || quantity <= 1}
                className="p-3 hover:bg-amber-200 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4 text-amber-900" />
              </button>
              <div className="px-6 py-3 font-bold text-amber-950 min-w-[60px] text-center">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                className="p-3 hover:bg-amber-200 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 text-amber-900" />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-900">
                ₹{productPrice * quantity}
              </div>
              <div className="text-sm text-amber-700">
                ₹{productPrice} each
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CartItem;