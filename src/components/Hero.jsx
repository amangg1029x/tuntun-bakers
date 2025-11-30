import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInLeft">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="text-sm font-medium text-amber-900">
                Freshly Baked Since 1995
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-amber-950 leading-tight mb-4">
                Freshly Baked
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Goodness
                </span>
                <span className="block text-4xl md:text-5xl mt-2">
                  Every Day!
                </span>
              </h1>
              <p className="text-lg md:text-xl text-amber-800 leading-relaxed max-w-lg">
                Experience the warmth of traditional baking with our handcrafted breads, 
                pastries, and cakes made with love and the finest ingredients.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Order Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-amber-200">
                View Menu
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: '30+', label: 'Years Experience' },
                { number: '50+', label: 'Fresh Items Daily' },
                { number: '10k+', label: 'Happy Customers' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-900">
                    {stat.number}
                  </div>
                  <div className="text-sm text-amber-700 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="relative animate-fadeInRight">
            <div className="relative z-10">
              {/* Main Image Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Placeholder for bakery image */}
                    <div className="text-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-8xl">🥖</span>
                      </div>
                      <p className="text-amber-800 font-medium text-lg">
                        Fresh Breads & Pastries
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <div className="text-2xl font-bold text-amber-900">4.9</div>
                    <div className="text-xs text-amber-700">Rating</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-4 text-white animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  <span className="font-semibold">Open Now!</span>
                </div>
                <div className="text-xs mt-1 opacity-90">6 AM - 10 PM</div>
              </div>
            </div>

            {/* Background decoration circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 right-0 w-32 h-32 border-4 border-amber-300 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-orange-300 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;