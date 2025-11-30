import React from 'react';
import { Check, CreditCard, Banknote } from 'lucide-react';

const PaymentMethod = ({ method, isSelected, onSelect }) => {
  const iconMap = {
    razorpay: CreditCard,
    cod: Banknote,
    upi: CreditCard,
    card: CreditCard
  };

  const Icon = iconMap[method.id] || CreditCard;

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

        {method.id === 'razorpay' && (
          <div className="flex items-center gap-2 text-xs text-amber-600">
            <img 
              src="https://cdn.razorpay.com/static/assets/logo/payment.svg" 
              alt="Razorpay" 
              className="h-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;