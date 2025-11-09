import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, X, MapPin, Clock, Phone, CreditCard, Download, RotateCcw, MessageCircle, Star, Check, Truck, ChefHat, CheckCircle2, XCircle, PackageCheck, AlertCircle, Calendar, IndianRupee, ChevronDown, ChevronUp, Sparkles, ShoppingBag } from 'lucide-react';

const OrderTimeline = ({ timeline }) => {
  return (
    <div className="relative">
      {timeline.map((step, index) => (
        <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
          {/* Timeline dot and line */}
          <div className="relative flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              step.completed 
                ? 'bg-gradient-to-br from-green-500 to-green-600 scale-110 shadow-lg' 
                : 'bg-gray-200'
            }`}>
              {step.completed ? (
                <Check className="w-5 h-5 text-white animate-fadeIn" />
              ) : (
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              )}
            </div>
            {index < timeline.length - 1 && (
              <div className={`w-1 h-12 mt-2 transition-all duration-500 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>

          {/* Timeline content */}
          <div className="flex-1 pb-8">
            <h4 className={`font-bold ${step.completed ? 'text-amber-900' : 'text-gray-500'}`}>
              {step.status}
            </h4>
            <p className="text-sm text-amber-700">{step.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;