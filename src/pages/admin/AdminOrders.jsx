import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import adminAPI from '../../services/adminAPI';
import {
  Search,
  Filter,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Truck,
  X,
  ChevronDown
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminOrders = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, paymentFilter, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await adminAPI.getOrders(token);
      setOrders(response.data || []);
      setFilteredOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(order => order.paymentStatus === paymentFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      const token = await getToken();
      await adminAPI.updateOrderStatus(token, orderId, newStatus);
      toast.success('Order status updated successfully!');
      fetchOrders();
      setShowOrderModal(false);
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Preparing':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Out for Delivery':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Preparing':
        return <Package className="w-4 h-4" />;
      case 'Out for Delivery':
        return <Truck className="w-4 h-4" />;
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    const [newStatus, setNewStatus] = useState(order.status);

    const statuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Order Details</h2>
                <p className="text-amber-100">Order #{order.orderNumber}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-amber-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{order.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{order.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{order.deliveryAddress?.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Delivery Address</h3>
              <p className="text-gray-900">{order.deliveryAddress?.name}</p>
              <p className="text-gray-700">{order.deliveryAddress?.address}</p>
              {order.deliveryAddress?.landmark && <p className="text-gray-700">Landmark: {order.deliveryAddress.landmark}</p>}
              <p className="text-gray-700">{order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}</p>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div key={item._id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji || '🍞'}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charge</span>
                  <span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge?.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{order.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">Payment</h3>
                <p className="text-sm text-gray-600 mb-1">Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">Current Status</h3>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>
            </div>

            {/* Update Status */}
            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3">Update Order Status</h3>
                <div className="flex gap-3">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(order._id, newStatus)}
                    disabled={updating || newStatus === order.status}
                    className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            )}

            {/* Notes */}
            {order.notes && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">Order Notes</h3>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
        <p className="text-gray-600">View and manage all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'Delivered').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-1">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{orders.filter(o => o.status === 'Cancelled').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Items</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Payment</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm font-semibold">{order.orderNumber}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{order.user?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{order.user?.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm">{order.items?.length || 0} items</td>
                    <td className="py-4 px-6 font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                        className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold">No orders found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setShowOrderModal(false)} />
      )}
    </div>
  );
};

export default AdminOrders;