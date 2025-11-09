import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, X, MapPin, Clock, Phone, CreditCard, Download, RotateCcw, MessageCircle, Star, Check, Truck, ChefHat, CheckCircle2, XCircle, PackageCheck, AlertCircle, Calendar, IndianRupee, ChevronDown, ChevronUp, Sparkles, ShoppingBag } from 'lucide-react';
import ordersData from "../data/ordersData.json"
import OrderCard from '../components/OrderCard';
import OrderDetailsModal from '../components/OrderDetailsModal';

const OrdersPage = () => {
  const [orders, setOrders] = useState(ordersData.orders);
  const [filteredOrders, setFilteredOrders] = useState(ordersData.orders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter orders
  useEffect(() => {
    let result = orders;

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredOrders(result);
  }, [orders, statusFilter, searchQuery]);

  const statuses = ['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const handleReorder = (order) => {
    console.log('Reorder:', order);
    // Add reorder logic
  };

  const handleCancel = (order) => {
    console.log('Cancel:', order);
    // Add cancel logic
  };

  const handleReview = (order) => {
    console.log('Review:', order);
    // Add review logic
  };

  // Calculate stats
  const stats = {
    total: orders.length,
    active: orders.filter(o => ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4 flex items-center gap-3">
            <Package className="w-10 h-10 text-amber-700" />
            My Orders
          </h1>
          <p className="text-lg text-amber-700">Track and manage all your orders in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.total, color: 'from-blue-500 to-blue-600', icon: Package },
            { label: 'Active', value: stats.active, color: 'from-purple-500 to-purple-600', icon: Clock },
            { label: 'Delivered', value: stats.delivered, color: 'from-green-500 to-green-600', icon: CheckCircle2 },
            { label: 'Cancelled', value: stats.cancelled, color: 'from-red-500 to-red-600', icon: XCircle }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-950 mb-1">{stat.value}</div>
              <div className="text-sm text-amber-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="text"
                placeholder="Search by order number or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                showFilters
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          <div className={`transition-all duration-500 overflow-hidden ${
            showFilters ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status, idx) => (
                <button
                  key={idx}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, idx) => (
              <div
                key={order.id}
                className="animate-slideInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <OrderCard
                  order={order}
                  onViewDetails={setSelectedOrder}
                  onReorder={handleReorder}
                  onCancel={handleCancel}
                  onReview={handleReview}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Support FAB */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group z-40">
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OrdersPage;