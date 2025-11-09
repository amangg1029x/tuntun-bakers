import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, X, MapPin, Clock, Phone, CreditCard, Download, RotateCcw, MessageCircle, Star, Check, Truck, ChefHat, CheckCircle2, XCircle, PackageCheck, AlertCircle, Calendar, IndianRupee, ChevronDown, ChevronUp, Sparkles, ShoppingBag } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderTimeline from './OrderTimeline';

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-amber-100">Order #{order.orderNumber}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="text-center">
            <OrderStatusBadge status={order.status} />
            {order.estimatedDelivery && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
              <p className="text-amber-700 mt-3">
                Estimated Delivery: <span className="font-bold">{order.estimatedDelivery}</span>
              </p>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
            <h3 className="font-bold text-amber-950 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Order Timeline
            </h3>
            <OrderTimeline timeline={order.timeline} />
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-amber-950 mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{item.emoji}</span>
                    <div>
                      <p className="font-semibold text-amber-900">{item.name}</p>
                      <p className="text-sm text-amber-700">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-amber-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Delivery Address
              </h4>
              <p className="font-semibold text-blue-900 mb-1">{order.deliveryAddress.name}</p>
              <p className="text-sm text-blue-800">{order.deliveryAddress.address}</p>
              <p className="text-sm text-blue-800 mt-2">{order.deliveryAddress.phone}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Info
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-800">Method</span>
                  <span className="font-semibold text-green-900">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-800">Status</span>
                  <span className="font-semibold text-green-900">{order.paymentStatus}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-green-200">
                  <span className="font-semibold text-green-900">Total</span>
                  <span className="font-bold text-lg text-green-900">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;