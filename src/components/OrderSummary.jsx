import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck, Package, Clock, Gift, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ subtotal, deliveryCharge, total, itemCount }) => {
  const isFreeDelivery = subtotal >= 499;
  const savings = isFreeDelivery && deliveryCharge > 0 ? deliveryCharge : 0;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-24 animate-slideInRight">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6" />
          Order Summary
        </h3>
      </div>

      {/* Summary Details */}
      <div className="p-6 space-y-4">
        {/* Item Count */}
        <div className="flex items-center justify-between text-amber-800">
          <span>Items in cart</span>
          <span className="font-bold">{itemCount}</span>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between text-amber-800">
          <span>Subtotal</span>
          <span className="font-bold text-lg">₹{subtotal}</span>
        </div>

        {/* Delivery Charge */}
        <div className="flex items-center justify-between text-amber-800">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Delivery Charge
          </span>
          {isFreeDelivery ? (
            <span className="font-bold text-green-600 flex items-center gap-1">
              <span className="line-through text-amber-400">₹{deliveryCharge}</span>
              FREE
            </span>
          ) : (
            <span className="font-bold">₹{deliveryCharge}</span>
          )}
        </div>

        {/* Free Delivery Progress */}
        {!isFreeDelivery && subtotal > 0 && (
          <div className="bg-amber-50 rounded-xl p-4 animate-pulse-gentle">
            <div className="flex items-center justify-between text-sm text-amber-800 mb-2">
              <span>Add ₹{499 - subtotal} more for free delivery!</span>
              <Truck className="w-4 h-4" />
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Savings Badge */}
        {isFreeDelivery && savings > 0 && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 flex items-center gap-2 animate-slideInUp">
            <Gift className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              You saved ₹{savings} on delivery!
            </span>
          </div>
        )}

        <div className="border-t-2 border-amber-200 pt-4">
          <div className="flex items-center justify-between text-amber-950">
            <span className="text-xl font-bold">Total Amount</span>
            <span className="text-3xl font-bold text-amber-900">₹{total}</span>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Estimated Delivery</p>
            <p className="text-sm text-blue-700">30-45 minutes from order confirmation</p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200">
        <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group">
          <Link to = "/checkout">
            <span>Proceed to Checkout</span>
          </Link>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
        <p className="text-center text-sm text-amber-700 mt-3">
          Safe & Secure Payment Options
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;