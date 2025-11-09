import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, X, MapPin, Clock, Phone, CreditCard, Download, RotateCcw, MessageCircle, Star, Check, Truck, ChefHat, CheckCircle2, XCircle, PackageCheck, AlertCircle, Calendar, IndianRupee, ChevronDown, ChevronUp, Sparkles, ShoppingBag } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

const OrderCard = ({ order, onViewDetails, onReorder, onCancel, onReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-amber-700" />
              <h3 className="text-lg font-bold text-amber-950">Order #{order.orderNumber}</h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-amber-700">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {order.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {order.time}
              </span>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Items Preview */}
        <div className="flex items-center gap-2 mb-4">
          {order.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="text-3xl transform hover:scale-125 transition-transform duration-300">
              {item.emoji}
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="text-sm text-amber-700 font-medium">
              +{order.items.length - 3} more
            </span>
          )}
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-900">
            ₹{order.totalAmount}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Show Less' : 'Show Details'}
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <div className={`transition-all duration-500 overflow-hidden ${
        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 space-y-6">
          {/* Items List */}
          <div>
            <h4 className="font-bold text-amber-950 mb-3">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-medium text-amber-900">{item.name}</p>
                      <p className="text-sm text-amber-700">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-amber-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className="font-bold text-amber-950 mb-3">Delivery Address</h4>
            <div className="bg-amber-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-amber-900">{order.deliveryAddress.name}</p>
              <p className="text-sm text-amber-700 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {order.deliveryAddress.address}
              </p>
              <p className="text-sm text-amber-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {order.deliveryAddress.phone}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h4 className="font-bold text-amber-950 mb-3">Payment Details</h4>
            <div className="bg-amber-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-700">Method</span>
                <span className="font-semibold text-amber-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-700">Status</span>
                <span className={`font-semibold ${
                  order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onViewDetails(order)}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Package className="w-4 h-4" />
            Track Order
          </button>
          
          {order.canReorder && (
            <button
              onClick={() => onReorder(order)}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white text-amber-900 px-4 py-2.5 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              Reorder
            </button>
          )}
          
          {order.canCancel && (
            <button
              onClick={() => onCancel(order)}
              className="flex items-center justify-center gap-2 bg-red-50 text-red-700 px-4 py-2.5 rounded-xl font-semibold border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all duration-300"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          )}
          
          {order.canReview && order.rating === 0 && (
            <button
              onClick={() => onReview(order)}
              className="flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2.5 rounded-xl font-semibold border-2 border-yellow-300 hover:border-yellow-500 hover:shadow-lg transition-all duration-300"
            >
              <Star className="w-4 h-4" />
              Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;