import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check, CreditCard, Smartphone, Banknote, ChevronRight, ChevronLeft, Truck, Package, Clock, Edit2, Trash2, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const ProgressStepper = ({ currentStep, steps }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-amber-200 -z-10">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative bg-amber-50 px-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white scale-110 shadow-lg'
                    : isActive
                    ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white scale-125 shadow-xl animate-pulse-ring'
                    : 'bg-white border-2 border-amber-300 text-amber-600'
                }`}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
              </div>
              <span
                className={`mt-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-amber-900' : 'text-amber-600'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;