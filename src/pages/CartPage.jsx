import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/AppContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck, Package, Clock, Gift, Tag, X } from 'lucide-react';
import EmptyCart from '../components/EmptyCart';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, getCartCount, loadCart } = useCart();
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  const subtotal = getCartTotal();
  const deliveryCharge = 40;
  const freeDeliveryThreshold = 499;
  const actualDeliveryCharge = subtotal >= freeDeliveryThreshold ? 0 : deliveryCharge;
  const total = subtotal + actualDeliveryCharge;
  const itemCount = getCartCount();

  // Load cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await loadCart();
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Show confetti when free delivery is achieved
  useEffect(() => {
    if (subtotal >= freeDeliveryThreshold && cart.length > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [subtotal, cart.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-900 font-semibold">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-24 pb-16">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fadeInDown">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            Shopping Cart
          </h1>
          <p className="text-lg text-amber-700">
            {cart.length > 0 
              ? `You have ${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`
              : 'Your cart is waiting to be filled with delicious treats!'
            }
          </p>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className="animate-slideInLeft"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CartItem
                    item={item}
                    onUpdateQuantity={updateCartQuantity}
                    onRemove={removeFromCart}
                  />
                </div>
              ))}

              {/* Continue Shopping Button */}
              <div className="mt-8">
                
                <a href="/products"
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors group"
                >
                  <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
                  <span>Continue Shopping</span>
                </a>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                deliveryCharge={deliveryCharge}
                total={total}
                itemCount={itemCount}
              />
            </div>
          </div>
        )}

        {/* Trust Badges */}
        {cart.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fadeInUp">
            {[
              { icon: '🔒', title: 'Secure Payment', desc: '100% safe & encrypted' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Quick doorstep delivery' },
              { icon: '✅', title: 'Fresh Guarantee', desc: 'Baked fresh daily' }
            ].map((badge, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h4 className="font-bold text-amber-950 mb-1">{badge.title}</h4>
                <p className="text-sm text-amber-700">{badge.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Mobile Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t-4 border-amber-500 p-4 shadow-2xl z-40 animate-slideInUp">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-amber-700">Total Amount</p>
              <p className="text-2xl font-bold text-amber-950">₹{total}</p>
            </div>
            
            <a href="/checkout"
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          {actualDeliveryCharge === 0 && subtotal >= freeDeliveryThreshold && (
            <p className="text-xs text-green-600 font-semibold text-center flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Free Delivery Applied!
            </p>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
        .animate-fadeInUp {
          animation: slideInUp 0.6s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default CartPage;