import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Home, ShoppingBag, Download, Share2, Sparkles } from 'lucide-react';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(5);
  
  const order = location.state?.order;

  // Redirect if no order data
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  // Confetti timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto redirect countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            >
              {['🎉', '🎊', '✨', '⭐', '💫', '🎂', '🍰', '🥐', '🍪', '🎈'][Math.floor(Math.random() * 10)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full relative z-10">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in shadow-2xl">
                <CheckCircle2 className="w-16 h-16 text-green-600 animate-check-draw" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Order Placed Successfully! 🎉
              </h1>
              <p className="text-green-100 text-lg">
                Your delicious treats are on the way!
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-6">
            {/* Order ID */}
            <div className="text-center pb-6 border-b border-gray-200">
              <p className="text-gray-600 mb-2">Order ID</p>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-xl">
                <Package className="w-5 h-5 text-amber-700" />
                <span className="text-2xl font-bold text-amber-900">{order.orderId}</span>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 mb-2">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      We'll start preparing your order right away
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      Estimated delivery: 30-45 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      You'll receive SMS updates on your order status
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      Track your order in real-time from Orders page
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
              <h3 className="font-bold text-amber-950 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="font-semibold text-amber-900 text-sm">{item.name}</p>
                        <p className="text-xs text-amber-700">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-amber-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-amber-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-amber-950">
                  <span>Total Paid</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <Package className="w-5 h-5" />
                <span>Track Order</span>
              </button>
              <button
                onClick={() => navigate('/products')}
                className="flex items-center justify-center gap-2 bg-white text-amber-900 px-6 py-4 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg transition-all duration-300 group"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Continue Shopping</span>
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <button className="flex items-center gap-2 text-amber-700 hover:text-amber-900 px-4 py-2 rounded-lg hover:bg-amber-50 transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download Invoice</span>
              </button>
              <button className="flex items-center gap-2 text-amber-700 hover:text-amber-900 px-4 py-2 rounded-lg hover:bg-amber-50 transition-all">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share Order</span>
              </button>
            </div>

            {/* Auto Redirect Notice */}
            <div className="text-center pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-900 transition-colors group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">
                  Redirecting to home in {countdown}s... Click to go now
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8 animate-fadeInUp">
          <p className="text-gray-600 text-lg">
            Thank you for choosing{' '}
            <span className="font-bold text-amber-900">TunTun Bakers</span>! 🥖
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes check-draw {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-check-draw {
          stroke-dasharray: 100;
          animation: check-draw 0.8s ease-out 0.3s forwards;
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;