import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import adminAPI from '../../services/adminAPI';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await adminAPI.getDashboard(token);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-600">vs last period</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your bakery's performance</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${stats?.overview.totalRevenue?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Total Orders"
          value={stats?.overview.totalOrders || 0}
          icon={ShoppingBag}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Customers"
          value={stats?.overview.totalCustomers || 0}
          icon={Users}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Total Products"
          value={stats?.overview.totalProducts || 0}
          icon={Package}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
      </div>

      {/* Period Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Today</h3>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{stats?.today.revenue?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.today.orders || 0}</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">This Week</h3>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{stats?.week.revenue?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.week.orders || 0}</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">This Month</h3>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{stats?.month.revenue?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.month.orders || 0}</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-gray-900">Pending</span>
              </div>
              <span className="text-2xl font-bold text-amber-600">{stats?.orders.pending || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">Completed</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{stats?.orders.completed || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-900">Cancelled</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{stats?.orders.cancelled || 0}</span>
            </div>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Inventory Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Low Stock</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">{stats?.inventory.lowStock || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border-2 border-red-200">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-900">Out of Stock</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{stats?.inventory.outOfStock || 0}</span>
            </div>
            <button
              onClick={() => navigate('/admin/products')}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Manage Inventory
            </button>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
        <div className="space-y-3">
          {stats?.topProducts?.length > 0 ? (
            stats.topProducts.map((product, index) => (
              <div key={product._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="text-3xl">{product.emoji}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.totalSold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{product.revenue?.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No sales data available</p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-amber-700 hover:text-amber-900 font-semibold text-sm flex items-center gap-1"
          >
            View All
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Payment</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-sm">{order.user?.name || 'N/A'}</td>
                    <td className="py-3 px-4 font-semibold text-sm">₹{order.totalAmount?.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">No recent orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;