import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Check, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import serviceablePincodes from "../data/serviceablePincodes.json";

const AddAddressModal = ({ isOpen, onClose, onSave, editAddress }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Ghaziabad',
    pincode: '',
    isDefault: false
  });
  const [pincodeError, setPincodeError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editAddress) {
      setFormData({
        name: editAddress.name || '',
        phone: editAddress.phone || '',
        address: editAddress.address || '',
        landmark: editAddress.landmark || '',
        city: editAddress.city || 'Ghaziabad',
        pincode: editAddress.pincode || '',
        isDefault: editAddress.isDefault || false
      });
    } else {
      // Reset form when modal opens for new address
      setFormData({
        name: '',
        phone: '',
        address: '',
        landmark: '',
        city: 'Ghaziabad',
        pincode: '',
        isDefault: false
      });
      setPincodeError('');
    }
  }, [editAddress, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Check pincode validity
    if (name === 'pincode' && value.length === 6) {
      setIsChecking(true);
      setTimeout(() => {
        if (serviceablePincodes.includes(value)) {
          setPincodeError('');
        } else {
          setPincodeError('Sorry, we don\'t deliver to this pincode yet.');
        }
        setIsChecking(false);
      }, 500);
    } else if (name === 'pincode' && value.length < 6) {
      setPincodeError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (pincodeError) {
      alert('Please fix errors before saving');
      return;
    }

    setIsSaving(true);
    try {
      // Create address object without _id (backend will generate)
      const addressData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        landmark: formData.landmark,
        city: formData.city,
        pincode: formData.pincode,
        isDefault: formData.isDefault
      };

      // If editing, include the address ID
      if (editAddress && editAddress._id) {
        await onSave(editAddress._id, addressData);
      } else {
        await onSave(addressData);
      }

      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        landmark: '',
        city: 'Ghaziabad',
        pincode: '',
        isDefault: false
      });
      setPincodeError('');
      onClose();
    } catch (error) {
      console.error('Failed to save address:', error);
      alert(error.response?.data?.message || 'Failed to save address. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
          <h3 className="text-2xl font-bold">
            {editAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          <button 
            onClick={onClose} 
            disabled={isSaving}
            className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSaving}
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSaving}
              pattern="[+]?[0-9]{10,13}"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={isSaving}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="House no., Street name, Area"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-2">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              disabled={isSaving}
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Near City Mall"
            />
          </div>

          {/* City & Pincode */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                disabled={isSaving}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Ghaziabad"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                Pincode *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  disabled={isSaving}
                  pattern="[0-9]{6}"
                  maxLength="6"
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    pincodeError ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                  }`}
                  placeholder="201001"
                />
                {isChecking && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {pincodeError && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {pincodeError}
                </p>
              )}
            </div>
          </div>

          {/* Default Address */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              disabled={isSaving}
              className="w-5 h-5 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-amber-900 font-medium">Set as default address</span>
          </label>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 bg-amber-100 text-amber-900 py-3 rounded-xl font-semibold hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!!pincodeError || isSaving}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editAddress ? 'Update Address' : 'Save Address'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;