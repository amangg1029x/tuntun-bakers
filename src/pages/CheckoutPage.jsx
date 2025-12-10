import React, { useState, useEffect } from 'react';
import { useCart, useUser } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check, CreditCard, Smartphone, Banknote, ChevronRight, ChevronLeft, Truck, Package, Clock, Edit2, Trash2, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import ProgressStepper from '../components/ProgressStepper';
import AddressCard from '../components/AddressCard';
import AddAddressModal from '../components/AddAddressModal';
import PaymentMethod from '../components/PaymentMethod';
import OrderSummarySidebar from '../components/OrderSummarySidebar';
import { orderAPI } from '../services/api';
import { useRazorpay } from '../hooks/useRazorpay';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  const { user, addAddress, updateAddress, deleteAddress } = useUser();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [sendUpdates, setSendUpdates] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { initializePayment, isLoaded: razorpayLoaded } = useRazorpay();

  const steps = ['Address', 'Payment', 'Confirm'];

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Online Payment',
      description: 'Credit/Debit Card, UPI, NetBanking',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      icon: CreditCard
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      icon: Banknote
    }
  ];

  const subtotal = getCartTotal();
  const freeDeliveryThreshold = 499;
  const deliveryCharge = 0;
  const actualDeliveryCharge = subtotal >= freeDeliveryThreshold ? 0 : deliveryCharge;
  const total = subtotal + actualDeliveryCharge;
  const itemCount = getCartCount();

  // Load user addresses and set default
  useEffect(() => {
    if (user && user.addresses) {
      const defaultAddr = user.addresses.find(addr => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (user.addresses.length > 0) {
        setSelectedAddress(user.addresses[0]);
      }
      setLoading(false);
    } else if (user) {
      setLoading(false);
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !loading) {
      navigate('/cart');
    }
  }, [cart, loading, navigate]);

  const handleAddAddress = async (addressIdOrData, addressData) => {
    try {
      if (typeof addressIdOrData === 'string') {
        // Editing existing address
        await updateAddress(addressIdOrData, addressData);
      } else {
        // Adding new address
        await addAddress(addressIdOrData);
      }
    } catch (error) {
      console.error('Failed to save address:', error);
      throw error;
    } finally {
      setEditingAddress(null);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      await deleteAddress(id);
      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete address');
    }
  };

  // Fixed handlePlaceOrder function for CheckoutPage.jsx
// Replace the existing handlePlaceOrder function (around line 244)

const handlePlaceOrder = async () => {
  if (!selectedAddress || !selectedPayment) {
    alert('Please select delivery address and payment method');
    return;
  }

  setIsProcessing(true);

  try {
    // Prepare order data
    const orderData = {
      items: cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      deliveryAddress: {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        address: selectedAddress.address,
        landmark: selectedAddress.landmark || '',
        city: selectedAddress.city,
        pincode: selectedAddress.pincode
      },
      paymentMethod: selectedPayment.id,
      subtotal,
      deliveryCharge: actualDeliveryCharge,
      totalAmount: total,
      notes: ''
    };

    // ============================================
    // PAYMENT METHOD: CASH ON DELIVERY (COD)
    // ============================================
    if (selectedPayment.id === 'cod') {
      console.log('Processing COD order...');
      
      // For COD: Create order immediately
      const response = await orderAPI.create(orderData);
      const createdOrder = response.data.data;
      console.log('COD Order created:', createdOrder);

      // Clear cart
      await clearCart();

      // Navigate to success page
      navigate('/order-success', { 
        state: { 
          order: createdOrder
        } 
      });
      
      return; // Exit function here for COD
    }

    // ============================================
    // PAYMENT METHOD: RAZORPAY (ONLINE PAYMENT)
    // ============================================
    if (selectedPayment.id === 'razorpay') {
      console.log('Processing Razorpay payment...');

      // Check if Razorpay SDK is loaded
      if (!razorpayLoaded) {
        throw new Error('Payment gateway not loaded. Please refresh and try again.');
      }

      // For Razorpay: DO NOT create order yet
      // First initiate payment, create order only after success
      
      initializePayment({
        amount: total,
        //orderId: `TEMP_${Date.now()}`, // Temporary ID for Razorpay order creation
        onSuccess: async (paymentDetails) => {
          console.log('✅ Payment successful:', paymentDetails);
          
          try {
            // NOW create the order in database with payment details
            const orderDataWithPayment = {
              ...orderData,
              paymentStatus: 'Paid', // Mark as paid
              razorpayOrderId: paymentDetails.razorpayOrderId,
              razorpayPaymentId: paymentDetails.razorpayPaymentId,
              razorpaySignature: paymentDetails.razorpaySignature
            };

            console.log('Creating order after successful payment...');
            const response = await orderAPI.create(orderDataWithPayment);
            const createdOrder = response.data.data;
            console.log('Order created:', createdOrder);
            
            // Clear cart
            await clearCart();
            
            // Navigate to success page
            navigate('/order-success', { 
              state: { 
                order: createdOrder,
                paymentDetails
              } 
            });
          } catch (orderError) {
            console.error('❌ Failed to create order after payment:', orderError);
            
            // Payment succeeded but order creation failed
            // This is a critical error - payment was taken but no order
            alert('Payment successful but order creation failed. Please contact support with payment ID: ' + paymentDetails.razorpayPaymentId);
            
            // You might want to log this to your error tracking service
            setIsProcessing(false);
          }
        },
        
        onFailure: (error) => {
          console.error('❌ Payment failed:', error);
          setIsProcessing(false);

          // Show error message
          toast.error(
            error?.error?.description || 'Payment failed. Please try again.'
          );

          // Stay on checkout page - DO NOT create order
          // User can try payment again
        }
      });
      
      // Note: Don't set isProcessing to false here
      // It will be handled in success/failure callbacks
      return;
    }

    // ============================================
    // UNKNOWN PAYMENT METHOD
    // ============================================
    throw new Error('Invalid payment method selected');

  } catch (error) {
    console.error('❌ Order placement failed:', error);
    alert(error.response?.data?.message || error.message || 'Failed to place order. Please try again.');
    setIsProcessing(false);
  }
};

  const canProceed = () => {
    if (currentStep === 1) return selectedAddress !== null;
    if (currentStep === 2) return selectedPayment !== null;
    return true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-900 font-semibold">Loading checkout...</p>
        </div>
      </div>
    );
  }

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

                {!user?.addresses || user.addresses.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                    <MapPin className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-amber-950 mb-2">No Addresses Saved</h4>
                    <p className="text-amber-700 mb-6">Add your delivery address to continue</p>
                    <button
                      onClick={() => {
                        setEditingAddress(null);
                        setShowAddressModal(true);
                      }}
                      className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {user.addresses.map((address) => (
                      <AddressCard
                        key={address._id}
                        address={address}
                        isSelected={selectedAddress?._id === address._id}
                        onSelect={() => setSelectedAddress(address)}
                        onEdit={(addr) => {
                          setEditingAddress(addr);
                          setShowAddressModal(true);
                        }}
                        onDelete={handleDeleteAddress}
                      />
                    ))}
                  </div>
                )}
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
                    <p className="font-semibold text-amber-950 mb-2">{selectedAddress?.name}</p>
                    <p className="text-sm text-amber-700">{selectedAddress?.address}{selectedAddress?.landmark ? `, ${selectedAddress.landmark}` : ''}</p>
                    <p className="text-sm text-amber-700">{selectedAddress?.city} - {selectedAddress?.pincode}</p>
                    <p className="text-sm text-amber-700 font-semibold mt-2">{selectedAddress?.phone}</p>
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
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedPayment?.color}`}>
                      {selectedPayment?.id === 'upi' ? (
                        <Smartphone className="w-6 h-6 text-white" />
                      ) : (
                        <Banknote className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-amber-950">{selectedPayment?.name}</p>
                      <p className="text-sm text-amber-700">{selectedPayment?.description}</p>
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

      <style>{`
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
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;