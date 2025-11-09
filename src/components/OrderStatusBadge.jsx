import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, X, MapPin, Clock, Phone, CreditCard, Download, RotateCcw, MessageCircle, Star, Check, Truck, ChefHat, CheckCircle2, XCircle, PackageCheck, AlertCircle, Calendar, IndianRupee, ChevronDown, ChevronUp, Sparkles, ShoppingBag } from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    "Pending": {
      color: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      icon: Clock,
      pulse: true
    },
    "Confirmed": {
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-800",
      icon: CheckCircle2,
      pulse: false
    },
    "Preparing": {
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      text: "text-purple-800",
      icon: ChefHat,
      pulse: true
    },
    "Out for Delivery": {
      color: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50",
      text: "text-indigo-800",
      icon: Truck,
      pulse: true
    },
    "Delivered": {
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      text: "text-green-800",
      icon: PackageCheck,
      pulse: false
    },
    "Cancelled": {
      color: "from-red-500 to-red-600",
      bg: "bg-red-50",
      text: "text-red-800",
      icon: XCircle,
      pulse: false
    }
  };

  const config = statusConfig[status] || statusConfig["Pending"];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} font-semibold`}>
      <Icon className={`w-4 h-4 ${config.pulse ? 'animate-pulse' : ''}`} />
      <span>{status}</span>
    </div>
  );
};

export default OrderStatusBadge;