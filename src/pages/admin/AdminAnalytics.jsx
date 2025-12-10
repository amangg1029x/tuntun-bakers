import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import adminAPI from '../../services/adminAPI';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Download
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminAnalytics = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [analytics, setAnalytics] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
    fetchDashboardStats();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await adminAPI.getRevenueAnalytics(token, period);
      setAnalytics(response);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const token = await getToken();
      const response = await adminAPI.getDashboard(token);
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${amount?.toFixed(2) || '0.00'}`;
  };

  const SimpleBarChart = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-center text-gray-500 py-8">No data available</p>;

    const maxRevenue = Math.max(...data.map(d => d.revenue || 0));

    return (
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-24 text-sm text-gray-600 truncate">{item._id}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500 flex items-center justify-end px-3"
                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
              >
                <span className="text-white text-xs font-semibold">{formatCurrency(item.revenue)}</span>
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600 text-right">{item.orders} orders</div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Detailed insights into your bakery's performance</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Time Period:</span>
          <div className="flex gap-2">
            {['day', 'week', 'month', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  period === p
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(analytics?.data?.reduce((sum, item) => sum + (item.revenue || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">For selected period</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Orders</p>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.data?.reduce((sum, item) => sum + (item.orders || 0), 0) || 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">For selected period</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Order Value</p>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(
              analytics?.data?.reduce((sum, item) => sum + (item.avgOrderValue || 0), 0) /
              (analytics?.data?.length || 1)
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">Average per order</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Peak Day</p>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {analytics?.data?.reduce((max, item) => item.revenue > (max?.revenue || 0) ? item : max, {})?._id || 'N/A'}
          </p>
          <p className="text-xs text-gray-500 mt-1">Highest revenue</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-bold text-gray-900">Revenue Breakdown</h2>
        </div>
        <SimpleBarChart data={analytics?.data || []} />
      </div>

      {/* Last 7 Days Revenue */}
      {dashboardStats?.revenueChart && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Last 7 Days Performance</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dashboardStats.revenueChart.map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-2">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(day.revenue)}</p>
                <p className="text-xs text-gray-600 mt-1">{day.orders} orders</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Methods Breakdown */}
      {dashboardStats?.paymentStats && dashboardStats.paymentStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
            </div>
            <div className="space-y-3">
              {dashboardStats.paymentStats.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {payment._id === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                    </p>
                    <p className="text-sm text-gray-600">{payment.count} orders</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(payment.revenue)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          {dashboardStats?.topProducts && dashboardStats.topProducts.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-bold text-gray-900">Top Selling Products</h2>
              </div>
              <div className="space-y-3">
                {dashboardStats.topProducts.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="text-2xl">{product.emoji}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.totalSold} units sold</p>
                    </div>
                    <p className="font-bold text-green-600">{formatCurrency(product.revenue)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
          <p className="text-sm font-semibold text-green-700 mb-2">Completed Orders</p>
          <p className="text-3xl font-bold text-green-900">{dashboardStats?.orders?.completed || 0}</p>
          <p className="text-xs text-green-600 mt-1">Successfully delivered</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border-2 border-amber-200">
          <p className="text-sm font-semibold text-amber-700 mb-2">Pending Orders</p>
          <p className="text-3xl font-bold text-amber-900">{dashboardStats?.orders?.pending || 0}</p>
          <p className="text-xs text-amber-600 mt-1">Awaiting processing</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
          <p className="text-sm font-semibold text-red-700 mb-2">Cancelled Orders</p>
          <p className="text-3xl font-bold text-red-900">{dashboardStats?.orders?.cancelled || 0}</p>
          <p className="text-xs text-red-600 mt-1">Customer cancellations</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;