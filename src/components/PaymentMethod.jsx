import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check, CreditCard, Smartphone, Banknote, ChevronRight, ChevronLeft, Truck, Package, Clock, Edit2, Trash2, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const PaymentMethod = ({ method, isSelected, onSelect }) => {
  const paymentIcons = {
    'upi': Smartphone,
    'cod': Banknote
  };

  const Icon = paymentIcons[method.id];

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-4 ring-amber-500 shadow-2xl scale-105'
          : 'shadow-lg hover:shadow-xl hover:scale-102'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected ? 'border-amber-600 bg-amber-600' : 'border-amber-300 bg-white'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${method.color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-amber-950">{method.name}</h4>
          <p className="text-sm text-amber-700">{method.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;