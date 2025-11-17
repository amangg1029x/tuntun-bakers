import React, { useState, useEffect } from 'react';
import { useUser, useFavorites } from '../context/AppContext';
import productsData from '../data/productData.json';
import Avatar from '../components/Avatar';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import LoginPrompt from '../components/LoginPrompt';
import { User, Mail, Phone, MapPin, CreditCard, Bell, Lock, LogOut, Edit2, Trash2, Plus, Check, ShoppingBag, Heart, Star, Calendar, IndianRupee, ChevronRight, AlertCircle } from 'lucide-react';

const ProfilePage = () => {
  const { user, isAuthenticated, login, logout, updateUser, updateUserPreferences, deleteAddress, deletePaymentMethod } = useUser();
  const { favorites } = useFavorites();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Auto-login for testing (remove this when you have real login)
  useEffect(() => {
    if (!isAuthenticated) {
      login();
    }
  }, [isAuthenticated, login]);

  // Show login prompt if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginPrompt />;
  }

  const favoriteProducts = productsData.products.filter(p => favorites.includes(p.id));

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fadeInDown">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-2">My Profile</h1>
          <p className="text-lg text-amber-700">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Avatar name={user.name} size="xlarge" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                <p className="text-amber-100 text-sm">{user.email}</p>
                <p className="text-amber-200 text-xs mt-2">
                  Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Menu */}
              <nav className="p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                          : 'text-amber-900 hover:bg-amber-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-slideInRight">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Orders', value: user.stats.totalOrders, icon: ShoppingBag, color: 'from-blue-500 to-blue-600' },
                    { label: 'Total Spent', value: `₹${user.stats.totalSpent}`, icon: IndianRupee, color: 'from-green-500 to-green-600' },
                    { label: 'Favorites', value: user.stats.favoriteItems, icon: Heart, color: 'from-red-500 to-red-600' },
                    { label: 'Reviews', value: user.stats.reviewsGiven, icon: Star, color: 'from-yellow-500 to-yellow-600' }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-amber-950 mb-1">{stat.value}</div>
                        <div className="text-sm text-amber-700">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Personal Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                      <User className="w-6 h-6" />
                      Personal Information
                    </h3>
                    <button
                      onClick={() => setShowEditProfile(true)}
                      className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700 mb-1">Full Name</p>
                        <p className="font-semibold text-amber-950">{user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700 mb-1">Email Address</p>
                        <p className="font-semibold text-amber-950">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700 mb-1">Phone Number</p>
                        <p className="font-semibold text-amber-950">{user.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-700 mb-1">Member Since</p>
                        <p className="font-semibold text-amber-950">
                          {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-slideInRight">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Saved Addresses
                  </h3>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>

                <div className="grid gap-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-amber-950">{address.name}</h4>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-amber-700">
                        <p>{address.address}, {address.landmark}</p>
                        <p>{address.city} - {address.pincode}</p>
                        <p className="font-semibold">{address.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENT METHODS TAB */}
            {activeTab === 'payments' && (
              <div className="space-y-6 animate-slideInRight">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Saved Payment Methods
                  </h3>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>

                <div className="grid gap-4">
                  {user.savedPaymentMethods.map((method) => (
                    <div key={method.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-amber-950">{method.type.toUpperCase()}</p>
                            <p className="text-sm text-amber-700">{method.details}</p>
                            {method.isDefault && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => deletePaymentMethod(method.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === 'favorites' && (
              <div className="space-y-6 animate-slideInRight">
                <h3 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  My Favorite Products ({favoriteProducts.length})
                </h3>

                {favoriteProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                    <Heart className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-amber-950 mb-2">No Favorites Yet</h4>
                    <p className="text-amber-700 mb-6">Start adding products to your favorites!</p>
                    
                    <a  href="/products"
                      className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Browse Products
                    </a>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {favoriteProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                        <div className="bg-gradient-to-br from-amber-100 to-orange-100 aspect-video flex items-center justify-center">
                          <span className="text-8xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-bold text-amber-950">{product.name}</h4>
                            <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span className="text-sm font-bold text-amber-900">{product.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-amber-700 mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-amber-900">₹{product.price}</span>
                            <button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-slideInRight">
                <h3 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Notification Preferences
                </h3>

                <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Get updates about your orders' },
                    { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Receive special offers and promotions' }
                  ].map((pref) => (
                    <label key={pref.key} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors group">
                      <div>
                        <p className="font-semibold text-amber-950 group-hover:text-amber-800">{pref.label}</p>
                        <p className="text-sm text-amber-700">{pref.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={user.preferences[pref.key]}
                        onChange={(e) => updateUserPreferences({ [pref.key]: e.target.checked })}
                        className="w-5 h-5 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-slideInRight">
                <h3 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Security Settings
                </h3>

                {/* Change Password */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-amber-950 mb-2">Password</h4>
                      <p className="text-sm text-amber-700">••••••••••••</p>
                      <p className="text-xs text-amber-600 mt-1">Last changed 2 months ago</p>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Change
                    </button>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-amber-950 mb-4">Account Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-xl text-red-700 font-semibold transition-colors group">
                      <span>Delete Account</span>
                      <AlertCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Session Info */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Your account is secure</h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-blue-600" />
                          Strong password enabled
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-blue-600" />
                          Email verified
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-blue-600" />
                          Phone verified
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={user}
        onSave={updateUser}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;