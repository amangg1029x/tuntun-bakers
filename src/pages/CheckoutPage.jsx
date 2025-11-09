import React, { useState, useEffect } from 'react';
import { useCart } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check, CreditCard, Smartphone, Banknote, ChevronRight, ChevronLeft, Truck, Package, Clock, Edit2, Trash2, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import ProgressStepper from '../components/ProgressStepper';
import AddressCard from '../components/AddressCard';
import AddAddressModal from '../components/AddAddressModal';
import PaymentMethod from '../components/PaymentMethod';
import mockSavedAddresses from "../data/mockSavedAddresses.json"
import OrderSummarySidebar from '../components/OrderSummarySidebar';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState(mockSavedAddresses);
  const [selectedAddress, setSelectedAddress] = useState(mockSavedAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [sendUpdates, setSendUpdates] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = ['Address', 'Payment', 'Confirm'];

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'PhonePe, Google Pay, Paytm',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    }
  ];

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal >= 499 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleAddAddress = (address) => {
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => addr.id === address.id ? address : addr));
    } else {
      setAddresses(prev => [...prev, address]);
    }
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order placement
    setTimeout(() => {
      const orderData = {
        orderId: `TB-${Date.now()}`,
        address: selectedAddress,
        payment: selectedPayment,
        items: cart,
        total,
        savePayment: savePaymentMethod,
        sendUpdates
      };
      
      console.log('Order placed:', orderData);
      clearCart();
      navigate('/order-success', { state: { order: orderData }, replace: true });
    }, 2000);
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedAddress !== null;
    if (currentStep === 2) return selectedPayment !== null;
    return true;
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fadeInDown">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-2">Checkout</h1>
          <p className="text-lg text-amber-700">Complete your order in 3 easy steps</p>
        </div>

        {/* Progress Stepper */}
        <ProgressStepper currentStep={currentStep} steps={steps} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: ADDRESS */}
            {currentStep === 1 && (
              <div className="animate-slideInLeft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-amber-700" />
                    Delivery Address
                  </h2>
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressModal(true);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>

                <div className="grid gap-4">
                  {addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={selectedAddress?.id === address.id}
                      onSelect={() => setSelectedAddress(address)}
                      onEdit={(addr) => {
                        setEditingAddress(addr);
                        setShowAddressModal(true);
                      }}
                      onDelete={handleDeleteAddress}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {currentStep === 2 && (
              <div className="animate-slideInLeft">
                <h2 className="text-2xl font-bold text-amber-950 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-amber-700" />
                  Payment Method
                </h2>

                <div className="grid gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <PaymentMethod
                      key={method.id}
                      method={method}
                      isSelected={selectedPayment?.id === method.id}
                      onSelect={() => setSelectedPayment(method)}
                    />
                  ))}
                </div>

                {/* Payment Options */}
                <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={savePaymentMethod}
                      onChange={(e) => setSavePaymentMethod(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-amber-900 font-medium group-hover:text-amber-700">
                      Save this payment method for future orders
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={sendUpdates}
                      onChange={(e) => setSendUpdates(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-amber-900 font-medium group-hover:text-amber-700">
                      Send order updates via SMS & Email
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRM */}
            {currentStep === 3 && (
              <div className="animate-slideInLeft space-y-6">
                <h2 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  Review Your Order
                </h2>

                {/* Delivery Details */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-amber-950 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Delivering To
                    </h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-amber-700 hover:text-amber-900 font-semibold text-sm"
                    >
                      Change
                    </button>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="font-semibold text-amber-950 mb-2">{selectedAddress.name}</p>
                    <p className="text-sm text-amber-700">{selectedAddress.address}, {selectedAddress.landmark}</p>
                    <p className="text-sm text-amber-700">{selectedAddress.city} - {selectedAddress.pincode}</p>
                    <p className="text-sm text-amber-700 font-semibold mt-2">{selectedAddress.phone}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-amber-950 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Method
                    </h3>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-amber-700 hover:text-amber-900 font-semibold text-sm"
                    >
                      Change
                    </button>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedPayment.color}`}>
                      {selectedPayment.id === 'upi' ? (
                        <Smartphone className="w-6 h-6 text-white" />
                      ) : (
                        <Banknote className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-amber-950">{selectedPayment.name}</p>
                      <p className="text-sm text-amber-700">{selectedPayment.description}</p>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                  <p className="text-sm text-blue-900">
                    By placing this order, you agree to TunTun Bakers' Terms & Conditions and Privacy Policy.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-2 bg-amber-100 text-amber-900 px-6 py-3 rounded-xl font-semibold hover:bg-amber-200 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed()}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Place Order</span>
                      <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummarySidebar
              cart={cart}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              total={total}
            />
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
        }}
        onSave={handleAddAddress}
        editAddress={editingAddress}
      />

      <style jsx>{`
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
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(217, 119, 6, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;