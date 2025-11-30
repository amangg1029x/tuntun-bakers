import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check, CreditCard, Smartphone, Banknote, ChevronRight, ChevronLeft, Truck, Package, Clock, Edit2, Trash2, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const OrderSummarySidebar = ({ cart, subtotal, deliveryCharge, total }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Summary
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Items */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-amber-900 text-sm">{item.name}</p>
                <p className="text-xs text-amber-700">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-amber-900">₹{item.product.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-amber-200 pt-4 space-y-3">
          <div className="flex justify-between text-amber-800">
            <span>Subtotal</span>
            <span className="font-bold">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-amber-800">
            <span>Delivery</span>
            <span className="font-bold">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between text-amber-950 text-xl font-bold pt-3 border-t border-amber-200">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900 text-sm">Estimated Delivery</p>
            <p className="text-xs text-blue-700">30-45 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummarySidebar;