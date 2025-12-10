import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  DollarSign,
  Clock,
  MapPin,
  Phone,
  Mail,
  Save,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    delivery: {
      charge: 40,
      freeAbove: 500,
      radius: 10
    },
    business: {
      name: 'TunTun Bakers',
      email: 'contact@tuntunbakers.com',
      phone: '+91 98765 43210',
      address: '123 Baker Street, Mumbai, Maharashtra 400001'
    },
    hours: {
      monday: { open: '08:00', close: '20:00', closed: false },
      tuesday: { open: '08:00', close: '20:00', closed: false },
      wednesday: { open: '08:00', close: '20:00', closed: false },
      thursday: { open: '08:00', close: '20:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '21:00', closed: false },
      sunday: { open: '09:00', close: '18:00', closed: false }
    },
    payment: {
      codEnabled: true,
      onlineEnabled: true,
      razorpayKey: 'rzp_test_***********'
    },
    notifications: {
      emailOnNewOrder: true,
      smsOnNewOrder: false,
      lowStockAlert: true,
      stockThreshold: 5
    }
  });

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    toast.success('Settings saved successfully!');
    console.log('Saving settings:', settings);
  };

  const updateDeliverySetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      delivery: { ...prev.delivery, [key]: value }
    }));
  };

  const updateBusinessSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      business: { ...prev.business, [key]: value }
    }));
  };

  const updateHoursSetting = (day, key, value) => {
    setSettings(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [key]: value }
      }
    }));
  };

  const updatePaymentSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      payment: { ...prev.payment, [key]: value }
    }));
  };

  const updateNotificationSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your bakery settings and preferences</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Delivery Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Delivery Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Charge (₹)</label>
            <input
              type="number"
              value={settings.delivery.charge}
              onChange={(e) => updateDeliverySetting('charge', Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Free Delivery Above (₹)</label>
            <input
              type="number"
              value={settings.delivery.freeAbove}
              onChange={(e) => updateDeliverySetting('freeAbove', Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Radius (km)</label>
            <input
              type="number"
              value={settings.delivery.radius}
              onChange={(e) => updateDeliverySetting('radius', Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Delivery Information</p>
            <p className="text-xs text-amber-700 mt-1">
              Current: ₹{settings.delivery.charge} delivery charge, FREE above ₹{settings.delivery.freeAbove}
            </p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={settings.business.name}
              onChange={(e) => updateBusinessSetting('name', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={settings.business.email}
              onChange={(e) => updateBusinessSetting('email', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone
            </label>
            <input
              type="tel"
              value={settings.business.phone}
              onChange={(e) => updateBusinessSetting('phone', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              value={settings.business.address}
              onChange={(e) => updateBusinessSetting('address', e.target.value)}
              rows="2"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Business Hours</h2>
        </div>
        <div className="space-y-3">
          {Object.keys(settings.hours).map((day) => (
            <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-24">
                <p className="font-semibold text-gray-900 capitalize">{day}</p>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.hours[day].closed}
                  onChange={(e) => updateHoursSetting(day, 'closed', e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span className="text-sm text-gray-700">Closed</span>
              </label>
              {!settings.hours[day].closed && (
                <>
                  <input
                    type="time"
                    value={settings.hours[day].open}
                    onChange={(e) => updateHoursSetting(day, 'open', e.target.value)}
                    className="px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={settings.hours[day].close}
                    onChange={(e) => updateHoursSetting(day, 'close', e.target.value)}
                    className="px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={settings.payment.codEnabled}
              onChange={(e) => updatePaymentSetting('codEnabled', e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Cash on Delivery (COD)</p>
              <p className="text-sm text-gray-600">Accept cash payments on delivery</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={settings.payment.onlineEnabled}
              onChange={(e) => updatePaymentSetting('onlineEnabled', e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Online Payment (Razorpay)</p>
              <p className="text-sm text-gray-600">Accept payments via UPI, Cards, Net Banking</p>
            </div>
          </label>
          {settings.payment.onlineEnabled && (
            <div className="ml-8 mt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Razorpay Key ID</label>
              <input
                type="text"
                value={settings.payment.razorpayKey}
                onChange={(e) => updatePaymentSetting('razorpayKey', e.target.value)}
                placeholder="rzp_test_***********"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={settings.notifications.emailOnNewOrder}
              onChange={(e) => updateNotificationSetting('emailOnNewOrder', e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
            <div>
              <p className="font-semibold text-gray-900">Email on New Order</p>
              <p className="text-sm text-gray-600">Receive email notification for new orders</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={settings.notifications.smsOnNewOrder}
              onChange={(e) => updateNotificationSetting('smsOnNewOrder', e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
            <div>
              <p className="font-semibold text-gray-900">SMS on New Order</p>
              <p className="text-sm text-gray-600">Receive SMS notification for new orders</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={settings.notifications.lowStockAlert}
              onChange={(e) => updateNotificationSetting('lowStockAlert', e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Low Stock Alerts</p>
              <p className="text-sm text-gray-600">Get notified when products are running low</p>
            </div>
          </label>
          {settings.notifications.lowStockAlert && (
            <div className="ml-8 mt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Alert Threshold</label>
              <input
                type="number"
                value={settings.notifications.stockThreshold}
                onChange={(e) => updateNotificationSetting('stockThreshold', Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Alert when stock falls below this quantity</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Save className="w-5 h-5" />
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;