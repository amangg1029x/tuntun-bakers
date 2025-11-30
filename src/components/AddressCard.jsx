import React from 'react';
import { MapPin, Check, Edit2, Trash2 } from 'lucide-react';

const AddressCard = ({ address, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-4 ring-amber-500 shadow-2xl scale-105'
          : 'shadow-lg hover:shadow-xl hover:scale-102'
      }`}
    >
      {/* Selection Indicator */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'border-amber-600 bg-amber-600'
                : 'border-amber-300 bg-white'
            }`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </div>
          <h4 className="font-bold text-amber-950">{address.name}</h4>
          {address.isDefault && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
              Default
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(address);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit address"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address._id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete address"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-2 text-amber-700">
        <p className="flex items-start gap-2">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
          <span>
            {address.address}
            {address.landmark && `, ${address.landmark}`}
          </span>
        </p>
        <p className="pl-6">{address.city} - {address.pincode}</p>
        <p className="pl-6 font-semibold">{address.phone}</p>
      </div>
    </div>
  );
};

export default AddressCard;