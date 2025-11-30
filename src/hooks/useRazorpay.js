import { useState, useEffect } from 'react';
import { useUser } from '../context/AppContext';

/**
 * Custom hook to handle Razorpay payments
 */
export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useUser();

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setIsLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          setIsLoaded(false);
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  /**
   * Initialize Razorpay payment
   * @param {Object} options - Payment options
   * @param {number} options.amount - Amount in INR
   * @param {string} options.orderId - Your order ID from backend
   * @param {Function} options.onSuccess - Success callback
   * @param {Function} options.onFailure - Failure callback
   */
  const initializePayment = async ({
    amount,
    orderId,
    onSuccess,
    onFailure
  }) => {
    if (!isLoaded) {
      console.error('Razorpay SDK not loaded');
      onFailure?.({ error: 'Payment SDK not loaded' });
      return;
    }

    try {
      // Create Razorpay order on backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/create-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('clerk-token')}`
          },
          body: JSON.stringify({
            amount,
            orderId,
            currency: 'INR'
          })
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create payment order');
      }

      const { id: razorpayOrderId, keyId } = data.data;

      // Razorpay options
      const options = {
        key: keyId,
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'TunTun Bakers',
        description: `Order #${orderId}`,
        image: '/logo.png', // Add your logo
        order_id: razorpayOrderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: {
          color: '#D97706' // Amber-600
        },
        handler: async function (response) {
          // Payment successful - verify on backend
          try {
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/payment/verify`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('clerk-token')}`
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId
                })
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              onSuccess?.({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onFailure?.({ error: error.message });
          }
        },
        modal: {
          ondismiss: function () {
            console.log('Payment cancelled by user');
            onFailure?.({ error: 'Payment cancelled' });
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', async function (response) {
        console.error('Payment failed:', response.error);
        
        // Record failure on backend
        try {
          await fetch(
            `${import.meta.env.VITE_API_URL}/payment/failure`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('clerk-token')}`
              },
              body: JSON.stringify({
                orderId,
                error: response.error
              })
            }
          );
        } catch (error) {
          console.error('Failed to record payment failure:', error);
        }

        onFailure?.(response.error);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      onFailure?.({ error: error.message });
    }
  };

  return {
    isLoaded,
    initializePayment
  };
};

export default useRazorpay;