import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowRight, Sparkles, ShoppingBag, Heart, Award } from 'lucide-react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(2);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log('Register:', formData);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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

          {/* Right Side - Register Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1, 2].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white scale-110 shadow-lg'
                      : 'bg-amber-100 text-amber-600'
                  }`}>
                    {step}
                  </div>
                  {step < 2 && (
                    <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
                      currentStep > step ? 'bg-amber-600' : 'bg-amber-200'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-amber-950 mb-2">
                {currentStep === 1 ? 'Personal Information' : 'Account Security'}
              </h2>
              <p className="text-amber-700">
                {currentStep === 1 ? 'Tell us about yourself' : 'Create your password'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {currentStep === 1 ? (
                <>
                  {/* Full Name */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Abhay Kuamr"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abhay@kuamr.com"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-amber-600" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address, building, apartment"
                        required
                        rows="2"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Password */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">Min. 8 characters with uppercase, lowercase & number</p>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start space-x-3 bg-amber-50 p-4 rounded-xl">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 mt-1 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    />
                    <label className="text-sm text-amber-800 cursor-pointer">
                      I agree to the{' '}
                      <a href="#" className="font-semibold text-amber-700 hover:text-amber-900">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-semibold text-amber-700 hover:text-amber-900">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-amber-100 text-amber-900 py-4 rounded-xl font-semibold text-lg hover:bg-amber-200 transition-all duration-300"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>{currentStep === 1 ? 'Continue' : 'Create Account'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-amber-800 mt-6">
                Already have an account?{' '}
                <a href="/login" className="font-semibold text-amber-700 hover:text-amber-900 transition-colors">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default RegisterPage;