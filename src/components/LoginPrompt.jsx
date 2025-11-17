import React from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Bell, Lock, LogOut, Edit2, Trash2, Plus, X, Check, ShoppingBag, Heart, Star, TrendingUp, Calendar, IndianRupee, Settings, ChevronRight, AlertCircle } from 'lucide-react';

const LoginPrompt = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center animate-scaleIn">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-amber-950 mb-4">Login Required</h2>
          <p className="text-lg text-amber-700 mb-8">
            Please login to view your profile and manage your account settings.
          </p>
          <div className="space-y-4">
            <a
              href="/login"
              className="block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Login Now
            </a>
            <a
              href="/register"
              className="block bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg transition-all duration-300"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;