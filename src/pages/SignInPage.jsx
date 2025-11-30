import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { ShoppingBag, Heart, Award } from 'lucide-react';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden md:block">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">TB</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-amber-900">TunTun Bakers</h1>
                  <p className="text-amber-700">Fresh Every Day</p>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-amber-950 mb-4">
                Welcome Back!
              </h2>
              <p className="text-lg text-amber-800 mb-8">
                Login to access exclusive offers, track your orders, and enjoy a personalized shopping experience.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  { icon: ShoppingBag, text: 'Track your orders in real-time' },
                  { icon: Heart, text: 'Save your favorite products' },
                  { icon: Award, text: 'Earn loyalty points & rewards' }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-amber-700" />
                    </div>
                    <span className="text-amber-900 font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Decorative Element */}
              <div className="mt-12 relative">
                <div className="text-8xl text-center opacity-20">🥖🍰🥐</div>
              </div>
            </div>
          </div>

          {/* Right Side - Clerk Sign In Component */}
          <div className="flex items-center justify-center">
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-white shadow-2xl rounded-3xl',
                  headerTitle: 'text-2xl font-bold text-amber-950',
                  headerSubtitle: 'text-amber-700',
                  socialButtonsBlockButton: 'border-2 border-amber-200 hover:border-amber-400',
                  formButtonPrimary: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:shadow-lg',
                  formFieldInput: 'border-2 border-amber-200 focus:border-amber-500',
                  footerActionLink: 'text-amber-700 hover:text-amber-900',
                }
              }}
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              redirectUrl="/profile"
            />
          </div>
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;