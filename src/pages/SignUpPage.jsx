import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
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
          {/* Left Side - Features */}
          <div className="hidden md:block">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">TB</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-amber-900">TunTun Bakers</h1>
                  <p className="text-amber-700">Join Our Family</p>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-amber-950 mb-4">
                Create Your Account
              </h2>
              <p className="text-lg text-amber-800 mb-8">
                Sign up now and get access to exclusive deals, loyalty rewards, and personalized recommendations!
              </p>

              {/* Benefits with Animation */}
              <div className="space-y-6">
                {[
                  { 
                    icon: '🎁',
                    title: 'Welcome Bonus',
                    desc: 'Get 10% off on your first order'
                  },
                  { 
                    icon: '⭐',
                    title: 'Loyalty Points',
                    desc: 'Earn points with every purchase'
                  },
                  { 
                    icon: '🚚',
                    title: 'Free Delivery',
                    desc: 'On orders above ₹500'
                  },
                  { 
                    icon: '🎂',
                    title: 'Birthday Treats',
                    desc: 'Special surprises on your birthday'
                  }
                ].map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start space-x-4 group animate-fadeInLeft"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-amber-700">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Clerk Sign Up Component */}
          <div className="flex items-center justify-center">
            <SignUp
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
              path="/sign-up"
              signInUrl="/sign-in"
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
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;