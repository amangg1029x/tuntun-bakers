import React, { useState } from 'react';
import { X } from 'lucide-react';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change
    console.log('Password change:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-scaleIn">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-3xl flex items-center justify-between">
          <h3 className="text-2xl font-bold">Change Password</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-amber-100 text-amber-900 py-3 rounded-xl font-semibold hover:bg-amber-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;